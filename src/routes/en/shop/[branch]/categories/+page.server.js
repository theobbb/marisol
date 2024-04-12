import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { shop } = await parent();
	const branch = shop.branches.find(
		(branch) => branch.slug.en.current === params.branch,
	);

	if (branch.cats?.length == 0)
		throw redirect(307, `/en/shop/${params.branch}`);

	return { branch };
}
