import { Cart } from '$lib/server/models/Cart';
//d d
import { json } from '@sveltejs/kit';
// 666

export async function GET({ request }) {
	console.log(request);
	return json({ message: 'GET /boutique/api/cart' });
}

export async function POST({ cookies }) {
	try {
		const cart = new Cart();
		await cart.save();

		cookies.set('cart_id', cart.id, { path: '/', 'max-age': 60 * 60 * 24 * 7 });
		return json(cart);
	} catch (err) {
		console.error(err);
	}
}
