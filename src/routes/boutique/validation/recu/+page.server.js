import { transporter } from '$lib/server/email.js';
import { Cart } from '$lib/server/models/Cart.js';
import stripe from '$lib/server/stripe.js';

export async function load({ cookies, url, fetch }) {
	/*
	console.log(transporter);

	const r = await stripe.
	const order = await stripe.paymentIntents.retrieve(
		'pi_3P9sPzItENF0KQto1Vdmx6Tl',
	);
	console.log(order);*/
	/*
	try {
		const res = await fetch('/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'info@marisolsarrazin.com',
				to: 'theobaillargeon@hotmail.com',
				subject: 'Test email',
				html: '<p>Test email</p>',
			}),
		});
		//console.log(res);
	} catch (err) {
		console.log(err);
	}*/

	//return { order };

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
