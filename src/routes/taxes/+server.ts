import { dev } from '$app/environment';
import { STRIPE_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

export async function POST({ request, fetch }) {
	const { start, end } = await request.json();

	const stripe = new Stripe(STRIPE_API_KEY);
	const payments = await stripe.paymentIntents.search({
		query: `status:'succeeded' AND created>${start} AND created<${end}`,
		limit: 100
	});

	if (payments.data.length === 0) return json({ empty: true });

	const cart_ids = payments.data.map((p) => p.metadata.cart_id);

	const url = `${dev ? 'http://localhost:5173' : 'https://marisolsarrazin.com'}/boutique/api/calculate-taxes`;

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ cart_ids })
	});
	const data = await res.json();

	return json({ ...data, empty: false, n_orders: payments.data.length });
}
