import stripe from '$lib/server/stripe';

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
