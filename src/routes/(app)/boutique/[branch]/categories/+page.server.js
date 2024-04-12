import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { shop } = await parent();
	const branch = shop.branches.find(
		(branch) => branch.slug.fr.current === params.branch,
	);

	if (branch.cats?.length == 0)
		throw redirect(307, `/boutique/${params.branch}`);

	return { branch };
}
