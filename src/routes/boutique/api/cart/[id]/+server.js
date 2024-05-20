import { Cart } from '$lib/server/models/Cart';
//d d
import { json } from '@sveltejs/kit';
// 666

export async function GET({ params }) {
	const cart = await Cart.findById(params.id).lean();

	return json(cart, {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	});
}
export async function PUT({ params, request }) {
	const body = await request.json();
	const cart = await Cart.findByIdAndUpdate(params.id, body, {
		new: true,
	}).lean();

	console.log(cart);

	return json(cart);
}
