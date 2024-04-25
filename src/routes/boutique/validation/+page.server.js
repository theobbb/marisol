import { Cart } from '$lib/server/models/Cart.js';
import stripe from '$lib/server/stripe.js';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	let cart = null;
	const cartId = cookies.get('cart_id');

	if (cartId && cartId !== 'undefined') {
		const retrieved = await Cart.findById(cartId);

		if (retrieved) {
			cart = JSON.parse(JSON.stringify(retrieved));
		}
	} else {
		return error(404, 'No cart found');
	}

	let amount = 0;
	//console.log(cart);

	cart.items.forEach((item) => {
		amount += item.quantity * item.price * 100;
	});

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'cad',
		metadata: {
			cart_id: cartId,
		},
	});

	const shippingRates = await stripe.shippingRates.list({
		limit: 3,
	});
	console.log('shippingRates', shippingRates);

	return {
		checkout: {
			ID: paymentIntent.id,
			secret: paymentIntent.client_secret,
			total: amount,
		},
	};
}
