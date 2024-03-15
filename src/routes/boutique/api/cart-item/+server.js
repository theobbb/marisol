import medusa from '$lib/server/medusa';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { cart_id, variant_id, quantity } = await request.json();

	if (!cart_id || !variant_id || !quantity) {
		return new Response({ body: { message: 'Invalid request' }, status: 400 });
	}

	try {
		const { cart } = await medusa.carts.lineItems.create(cart_id, {
			variant_id,
			quantity,
		});
		return json(cart);
	} catch (error) {
		return new Response({ body: { message: 'No cart found' }, status: 200 });
	}
}
export async function PUT({ request }) {
	const { cart_id, id, quantity } = await request.json();

	if (!cart_id || !id || !quantity) {
		return new Response({ body: { message: 'Invalid request' }, status: 400 });
	}

	try {
		const { cart } = await medusa.carts.lineItems.update(cart_id, id, {
			quantity,
		});
		console.log(cart);
		return json(cart);
	} catch (err) {
		return error(400, 'No cart found');
	}
}
export async function DELETE({ request }) {
	const { cart_id, id } = await request.json();

	if (!cart_id || !id) {
		return new Response({ body: { message: 'Invalid request' }, status: 400 });
	}

	try {
		const { cart } = await medusa.carts.lineItems.delete(cart_id, id);
		return json(cart);
	} catch (error) {
		return new Response({ body: { message: 'No cart found' }, status: 200 });
	}
}
