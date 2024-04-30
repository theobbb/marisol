import { transporter } from '$lib/server/email.js';
import { Cart } from '$lib/server/models/Cart.js';
import stripe from '$lib/server/stripe.js';
import { error } from '@sveltejs/kit';
import { render } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const stripe_id = url.searchParams.get('payment_intent');

	const order = await stripe.paymentIntents.retrieve(stripe_id);

	if (!order) error(400, 'Something went wrong');

	const payment_method = await stripe.paymentMethods.retrieve(
		order.payment_method,
	);

	const cart_id = url.searchParams.get('cart_id');

	const status = url.searchParams.get('redirect_status');
	if (status != 'succeeded') error(400, 'Something went wrong');
	if (!cart_id) error(400, 'Something went wrong');

	const cookiesCartId = cookies.get('cart_id');

	if (cookiesCartId != cart_id) return;

	const cart = await Cart.findById(cart_id);
	//if (!cart || cart.status == 'complete') return;

	cart.status = 'complete';
	cart.stripe_id = stripe_id;

	await cart.save();

	//cookies.delete('cart_id', { path: '/' });

	return {
		order,
		success_cart: JSON.parse(JSON.stringify(cart)),
		payment_method,
	};
}
