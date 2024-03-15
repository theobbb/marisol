import { MEDUSA_BACKEND_URL } from '$env/static/private';
import Medusa from '@medusajs/medusa-js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
	const medusa = new Medusa(MEDUSA_BACKEND_URL);

	let cart = null;

	const cartId = cookies.get('cart_id');

	if (cartId && cartId !== 'undefined') {
		const retrieved = await medusa.carts.retrieve(cartId);
		cart = retrieved.cart;
	} else {
		const newCart = await medusa.carts.create();
		cart = newCart.cart;
		cookies.set('cart_id', cart.id, { path: '/', 'max-age': 60 * 60 * 24 * 7 });
	}

	if (cart) return new Response({ body: cart });
	else return new Response({ body: { message: 'No cart found' }, status: 404 });
}
