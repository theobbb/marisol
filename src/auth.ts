import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

import Google from '@auth/core/providers/google';

import { SvelteKitAuth } from '@auth/sveltekit';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],

	pages: {
		signIn: '/sign-in',
		signOut: '/sign-out',
		error: '/login'
		//verify: '/verify'
	},
	secret: AUTH_SECRET,
	trustHost: true
});
