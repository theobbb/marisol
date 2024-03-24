import { Cart } from '$lib/server/models/Cart.js';
import stripe from '$lib/server/stripe.js';
import { json } from 'stream/consumers';

export async function POST({ request }) {
	const { cart_id } = await request.json();

	const cart = await Cart.findById(cart_id);

	const items = cart.items;

	if (!items || items.length === 0) {
		return json({ subtotal: 0, total: 0 });
	}
	const taxes = await stripe.prices.list({
		lookup_keys: items.map((item) => item.variant_id),
	});
	console.log('cart_id', taxes);

	return json({ total: 1400 });
}
