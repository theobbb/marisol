import medusa from '$lib/server/medusa.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { cart_id, code } = await request.json();

	if (!cart_id || !code) {
		return new Response({ body: { message: 'Invalid request' }, status: 400 });
	}

	try {
		const { cart } = await medusa.carts.update(cart_id, {
			discounts: [
				{
					code,
				},
			],
		});
		console.log(cart);
		return json(cart);
	} catch (error) {
		console.log(error.message);
		return text(error.message);
	}
}
