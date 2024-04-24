import { Cart } from '$lib/server/models/Cart';
//d d
import { json } from '@sveltejs/kit';
// 666
export async function POST({ cookies, request }) {
	const { cart_id, stripe_id } = await request.json();
	try {
		const cart = await Cart.findById(cart_id);
		cart.status = 'complete';
		cart.stripe_id = stripe_id;
		await cart.save();

		cookies.delete('cart_id', { path: '/' });
		return json(cart);
	} catch (err) {
		console.error(err);
	}
}
