import { Cart } from '$lib/server/models/Cart';
import sanity from '$lib/server/sanity.js';
import { json, text } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
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
				`*[_type == "product" && _id == "${product_id}"][0]`,
			);
			const price = product?.variants.find(
				(v) => v.variant._ref === variant_id,
			).price;

			const item = { variant_id, product_id, quantity: 1, price };
			cart.items.push(item);
		}

		await cart.save();

		return json(cart);
	} catch (error) {
		return new Response({ body: { message: 'No cart found' }, status: 200 });
	}
}
export async function PUT({ request }) {
	const { cart_id, item_id, quantity } = await request.json();

	if (!cart_id || !item_id || !quantity) {
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