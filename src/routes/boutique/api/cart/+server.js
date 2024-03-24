import { Cart } from '$lib/server/models/Cart';

import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	try {
		const cart = new Cart();
		await cart.save();

		cookies.set('cart_id', cart.id, { path: '/', 'max-age': 60 * 60 * 24 * 7 });

		console.log('res', cart);
		return json(cart);
	} catch (err) {
		console.error(err);
	}
}
