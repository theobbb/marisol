import { Cart } from '$lib/server/models/Cart.js';
import { text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { cart_id, receipt } = await request.json();

	const cart = await Cart.findById(cart_id);
	if (!cart) {
		return text('failed');
	}

	cart.email_sent = true;
	cart.receipt = receipt;

	await cart.save();

	console.log(cart_id);
	return text('success');
}
