import { MONGO_URI } from '$env/static/private';
import sanity from '$lib/server/sanity.js';
import mongoose from 'mongoose';
import { Cart } from '$lib/server/models/Cart';

export async function load({ cookies, locals }) {
	const books = await sanity.fetch(`*[_type == "book"] {
        ...,
        images[]{
            ...,
                asset->{
                    _id,
                    ...,
                    'url': url + '?format=auto&fm=webp',
                    'w': metadata.dimensions.width,
                    'h': metadata.dimensions.height
                }
            }
            
    }`);

	const series = await sanity.fetch(`*[_type == "serie"]`);

	books.forEach((book) => {
		const serie = series.find((serie) =>
			serie.books.some((b) => b._ref === book._id),
		);
		if (serie)
			book.serie = { _id: serie._id, name: serie.name, slug: serie.slug };
	});

	const portfolio =
		await sanity.fetch(`*[_type == "portfolio-page" && _id == "pagePortfolio"][0]{
        ...,
        children[]->{
            ...,
            content[]{
                ...,
                img {
                        asset->{...}
                    },
              

            }
           
        }
            }`);
	const shop = await sanity.fetch(`*[_type == "shop-page"][0]{
        ...,
        branches[]->{
            ...,
			products[]->{
				...,
				variants[]{
					...,
					variant->{...}
				},
				category->{...},
				'imgs': imgs[].asset->{
					...
				}
			},
        	}
        }`);

	shop.branches.forEach((branch) => {
		const cats = [];
		branch.products = branch.products.filter((product) => {
			if (!product.variants?.length) return true;
			let hasQuantity = false;

			product.variants = product.variants.filter((v) => {
				if (v.stock == null || v.stock > 0) {
					hasQuantity = true;
					return true;
				} else {
					return false;
				}
			});
			return hasQuantity;
		});
		branch.products.forEach((product) => {
			product.branch = {
				_id: branch._id,
				name: branch.name,
				slug: branch.slug,
				description: branch.description,
			};

			product.constr_slug = {
				fr: `/boutique/${
					product.category?.slug?.fr.current || product.branch.slug.fr.current
				}/${product.slug.fr?.current}`,
				en: `/en/shop/${product.category?.slug?.en.current || product.branch.slug.en.current}/${
					product.slug.en?.current || product.slug.fr.current
				}`,
			};

			if (product.book_ref) {
				product.book = books.find(
					(book) => book._id === product.book_ref?._ref,
				);
			}
			if (product.variants?.length) {
				product.variants.forEach((variant) => {
					if (variant.price) {
						if (!variant.variant) {
							variant.variant = {
								name: { fr: '', en: '' },
								_id: product._id,
							};
						}
					} else {
						if (variant?.variant?.variant_price) {
							variant.price = variant.variant.variant_price;
							return;
						}
						variant.variant = {
							name: { fr: '', en: '' },
							_id: product._id,
						};
						variant.price = product.category.category_price;
					}
				});
			} else {
				product.variants = [
					{
						variant: {
							name: { fr: '', en: '' },
							_id: product._id,
						},
						price: product.category.category_price,
					},
				];
			}
			if (product.category) {
				if (!cats.some((c) => c._id === product.category._id))
					cats.push(product.category);
			}
			/*
			const v = product.variants.map((v) => v.variant?._id);
			console.log(product.name.fr, ...v);*/
		});
		branch.cats = cats;
	});
	locals.test = 'ff';

	await mongoose.connect(MONGO_URI);

	let cart = null;
	const cartId = cookies.get('cart_id');

	if (cartId && cartId !== 'undefined') {
		const retrieved = await Cart.findById(cartId);

		if (retrieved) {
			cart = JSON.parse(JSON.stringify(retrieved));
		}
	}

	return {
		books,
		series,
		portfolio,
		cart,
		shop,
		//, collections
	};
}
