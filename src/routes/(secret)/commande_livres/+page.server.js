import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	throw redirect(
		307,
		`https://ecoles.marisolsarrazin.com${url.pathname}${url.search}`,
	);
}
