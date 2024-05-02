import { STRIPE_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import Stripe from 'stripe';

export async function load({ locals, url }) {
	const session = await locals.auth();
	console.log(session);
	if (!session?.user) {
		if (url.pathname === '/auth') return;
		throw redirect(303, '/auth');
	}
	const stripe = new Stripe(STRIPE_API_KEY);
	const paymentIntents = await stripe.paymentIntents.search({ query: 'status:"succeeded"' });

	const balance = await stripe.balance.retrieve();
	console.log(balance);

	return {
		paymentIntents,
		balance,
		stream: {}
	};
}
