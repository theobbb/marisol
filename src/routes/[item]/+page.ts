import { dev } from '$app/environment';

export const prerender = false;
export async function load({ parent, params }) {
	const data = await parent();

	data.item = data.paymentIntents.data.find((item) => item.id === params.item);

	const cart_id = data.item.metadata.cart_id;

	if (!cart_id) return data;

	data.cart = getCart(cart_id);

	return data;
}

async function getCart(id) {
	const url = dev ? 'http://localhost:5173' : 'https://marisolsarrazin.com';
	const res = await fetch(`${url}/boutique/api/cart/${id}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return res.json();
}
