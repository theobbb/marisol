import { Cart } from '$lib/server/models/Cart';
//d d
import { json } from '@sveltejs/kit';
<<<<<<< HEAD
// message de Marc

=======
// 666
>>>>>>> 0db2c7fe0cf747045878cd77801152a58929eea8
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
