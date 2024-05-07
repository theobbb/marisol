import { sequence } from '@sveltejs/kit/hooks';
import { handle as auth } from './auth';
import { error, redirect } from '@sveltejs/kit';

const allowedEmails = [
	'theobaillargeon@hotmail.com',
	'tacbaillargeon@gmail.com',
	'baillargeonmarc@gmail.com'
];

export const handle: Handle = sequence(auth, async ({ event, resolve }) => {
	if (!event.locals || !event.locals.auth) {
		error(500, 'Auth setup is missing in locals');
	}

	const session = await event.locals?.auth();

	const url = event.url.pathname;

	if (session?.user) {
		if (!allowedEmails.includes(session.user.email)) {
			if (url.startsWith('/auth')) {
				return resolve(event);
			}

			throw redirect(307, '/auth');
		}
	}

	if (url.startsWith('/auth')) {
		if (session?.user) {
			throw redirect(307, '/user');
		}

		return resolve(event);
	}

	// For non-auth paths, ensure user is authenticated
	if (!session?.user) {
		throw redirect(307, '/auth');
	}

	return resolve(event);
});
