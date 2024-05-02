import stripe from '$lib/server/stripe';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const id = params.id;
	const payment_method = await stripe.paymentMethods.retrieve(id);

	return json(payment_method);
}
