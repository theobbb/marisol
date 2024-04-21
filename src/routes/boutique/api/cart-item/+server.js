import { Cart } from '$lib/server/models/Cart';
import sanity from '$lib/server/sanity.js';
import { json, text } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const { cart_id, variant_id, product_id } = await request.json();

	if (!cart_id || !variant_id || !product_id) {
		return text(400, 'Invalid request');
	}

	try {
		const cart = await Cart.findById(cart_id);
		if (!cart) {
			return text(404, 'No cart found');
		}
		const item = cart.items.find(
			(i) => i.variant_id === variant_id && i.product_id === product_id,
		);

		if (item) {
			item.quantity += 1;
		} else {
			const product = await sanity.fetch(
				`*[_type == "product" && _id == "${product_id}"][0] {
				..., 
				variants[]{
					...,
					variant->{...}
				},
				category->{...}
			}`,
			);

			let price = 0;
			if (!product.variants?.length) {
				console.log('product', product);
				price = product.category?.category_price;
			} else {
				let variant = null;
				if (product.variants.length > 1) {
					variant = product?.variants?.find(
						(v) => v?.variant?._id === variant_id,
					);
				} else {
					variant = product.variants[0];
				}

				price =
					variant?.price ||
					variant?.variant?.variant_price ||
					product.category?.category_price;

				if (!price) {
					return text(400, 'No price found');
				}
			}

			// .log('price', product);

			const item = {
				variant_id,
				product_id,
				quantity: 1,
				price,
				is_book: product.isBook,
			};
			cart.items.push(item);
		}

		await cart.save();

		return json(cart);
	} catch (error) {
		return new Response({ body: { message: 'No cart found' }, status: 400 });
	}
}
export async function PUT({ request }) {
	const { cart_id, item_id, quantity } = await request.json();

	if (!cart_id || !item_id) {
		error(400, 'Invalid request');
	}

	try {
		const cart = await Cart.findById(cart_id);
		if (!cart) {
			return text(404, 'No cart found');
		}
		const item = cart.items.find((i) => i._id.toString() === item_id);
		if (!item) {
			return text(404, 'No item found');
		}
		item.quantity = quantity;

		await cart.save();

		return json(cart);
	} catch (err) {
		return error(400, 'No cart found');
	}
}
export async function DELETE({ request }) {
	const { cart_id, item_id } = await request.json();

	if (!cart_id || !item_id) {
		return text(400, 'Invalid request');
	}

	try {
		const cart = await Cart.findById(cart_id);
		if (!cart) {
			return text(404, 'No cart found');
		}
		cart.items = cart.items.filter((i) => i._id.toString() !== item_id);
		await cart.save();
		return json(cart);
	} catch (error) {
		return text(400, 'No cart found');
	}
}
