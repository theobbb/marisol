import { Cart } from '$lib/server/models/Cart.js';
import sanity from '$lib/server/sanity.js';
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

	const items = cart.items;

	const products = await sanity.fetch(`*[_type == "product"]`);

	let amount = 0;
	console.log(cart);

	cart.items.forEach((item) => {
		amount += item.quantity * item.price * 100;
	});
	console.log(amount);
	/*
	items.forEach((item) => {
		const product = products.find((p) => p._id === item.product_id);
		const variant = product?.variants.find(
			(v) => v.variant._ref === item.variant_id,
		);

		amount += variant.price * item.quantity * 100;
	});*/

	const taxRate = await stripe.taxRates.create({
		display_name: 'TPS',
		description: 'TPS Qc',
		percentage: 5,
		jurisdiction: 'QC',
		inclusive: false,
	});

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'cad',
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
