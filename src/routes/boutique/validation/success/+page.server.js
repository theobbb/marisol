import { Cart } from '$lib/server/models/Cart.js';

export async function load({ cookies, url }) {
	const cart_id = url.searchParams.get('cart_id');

	const status = url.searchParams.get('redirect_status');
	if (status != 'succeeded') return;
	if (!cart_id) return;

	const cookiesCartId = cookies.get('cart_id');

	if (cookiesCartId != cart_id) return;

	const cart = await Cart.findById(cart_id);
	if (!cart || cart.status == 'complete') return;

	const stripe_id = url.searchParams.get('payment_intent');

	cart.status = 'complete';
	cart.stripe_id = stripe_id;

	await cart.save();

	cookies.delete('cart_id', { path: '/' });
}
