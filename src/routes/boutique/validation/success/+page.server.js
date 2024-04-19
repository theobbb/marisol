import { Cart } from '$lib/server/models/Cart.js';

export async function load({ cookies }) {
	const cartId = cookies.get('cart_id');
	//console.log(cartId);
	if (cartId && cartId !== 'undefined') {
		console.log('cartId is not undefined');
		await Cart.findByIdAndDelete(cartId);
	}
	cookies.delete('cart_id', { path: '/' });
}
