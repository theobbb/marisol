import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(307, `https://www.youtube.com/watch?v=dQw4w9WgXcQ`);
}
