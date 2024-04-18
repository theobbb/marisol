import { json, redirect } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { pass } = await request.json();

	if (pass === 'marisol-admin-123') {
		console.log('pass', pass);

		cookies.set('admin', true, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});
		throw redirect(307, '/admin');
	}
	return json({ success: false });
	//throw redirect(307, '/formulaire_ecole/merci');
}
