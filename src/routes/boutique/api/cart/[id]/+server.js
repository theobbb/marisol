import { Cart } from '$lib/server/models/Cart';
//d d
import { json } from '@sveltejs/kit';
// 666

export async function GET({ params }) {
	const cart = await Cart.findById(params.id).lean();

	return json(cart);
}