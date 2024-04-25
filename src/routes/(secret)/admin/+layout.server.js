import { redirect } from '@sveltejs/kit';

export async function load({ url, cookies }) {
	const admin = cookies.get('admin');
	console.log('admin', admin);
	if (!admin != 'true' && url.pathname !== '/admin/sign-in') {
		//throw redirect(307, '/admin/sign-in');
	}
}
