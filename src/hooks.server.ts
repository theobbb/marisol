import { sequence } from '@sveltejs/kit/hooks';
import { handle as auth } from './auth';
import { redirect } from '@sveltejs/kit';

const allowedEmails = [
	'theobaillargeon@hotmail.com',
	'tacbaillargeon@gmail.com',
	'baillargeonmarc@gmail.com'
];

export const handle: Handle = sequence(auth, async ({ event, resolve }) => {
	const session = await event.locals?.auth();

	const url = event.url.pathname;

	if (url.startsWith('/auth')) {
		if (session?.user) {
			throw redirect(307, '/user');
		}
		return await resolve(event);
	} else {
		if (!session?.user) {
			throw redirect(307, '/auth');
		}
	}
	if (!allowedEmails.includes(session?.user?.email)) {
		//await event.locals?.signOut();
		throw redirect(307, '/auth');
	}

	return resolve(event);
});
