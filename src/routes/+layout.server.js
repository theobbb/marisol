import { MONGO_URI } from '$env/static/private';
import sanity from '$lib/server/sanity.js';
import mongoose from 'mongoose';
import { Cart } from '$lib/server/models/Cart';

export async function load({ cookies }) {
	mongoose.models = {};
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
		branch.products.forEach((product) => {
			product.branch = {
				_id: branch._id,
				name: branch.name,
				slug: branch.slug,
				description: branch.description,
			};

			/*
			product.c?.forEach((variant) => {
				if (!variant.variant) return;
				if (!cats.some((v) => v._id === variant.variant._id))
					cats.push(variant.variant);
			});*/

			if (!product.book_ref) return;
			product.book = books.find((book) => book._id === product.book_ref?._ref);

			if (product.category) {
				if (!cats.some((c) => c._id === product.category._id))
					cats.push(product.category);

				product.variants?.forEach((variant) => {
					console.log(variant);
					if (variant.price) return;

					if (variant?.variant?.variant_price) {
						variant.price = variant.variant.variant_price;
						return;
					}
					const price = cats.find(
						(c) => c._id === product.category._id,
					)?.category_price;
					console.log('variant', price);
					variant.price = price;
				});
			}
		});
		branch.cats = cats;
	});

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
