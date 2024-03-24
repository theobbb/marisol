import { Cart } from '$lib/server/models/Cart.js';
import stripe from '$lib/server/stripe.js';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
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

		let line_items = [];

		let amount = 0;
		items.forEach((item) => {
			const product = products.find((p) => p._id === item.product_id);
			const variant = product?.variants.find(
				(v) => v.variant._ref === item.variant_id,
			);

			amount += variant.price * item.quantity;
		});

		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: 'cad',
						product_data: {
							name: 'T-shirt',
						},
						unit_amount: 2000,
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: 'http://localhost:5173/boutique/success',
			cancel_url: 'http://localhost:5173/boutique/cancel',
		});

		throw redirect(303, session.url);
	},
};
