import { STRIPE_API_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import Stripe from 'stripe';

const allowedEmails = [
	'theobaillargeon@hotmail.com',
	'tacbaillargeon@gmail.com',
	'baillargeonmarc@gmail.com'
];

export async function load() {
	/*
	const session = await locals.auth();

	if (!session?.user || !allowedEmails.includes(session?.user?.email)) {
		if (url.pathname === '/auth') return;
		throw redirect(303, '/auth');
	}
	if (url.pathname === '/auth') {
		throw redirect(303, '/');
	}*/

	const stripe = new Stripe(STRIPE_API_KEY);
	const paymentIntents = await stripe.paymentIntents.search({
		query: 'status:"succeeded"',
		limit: 100
	});

	const payouts = await stripe.payouts.list({
		limit: 100
	});
	const balance = await stripe.balance.retrieve();

	return {
		paymentIntents,
		balance,
		payouts,
		stream: {}
	};
}
