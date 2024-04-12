import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { shop } = await parent();
	let branch = shop.branches.find(
		(branch) => branch.slug.en.current === params.branch,
	);
	console.log(branch);
	if (!branch) {
		let cat = null;
		const branch_cat = shop.branches.find((branch) => {
			cat = branch.cats.find((cat) => cat.slug.en.current === params.branch);
			if (cat) return true;
		});
		if (branch_cat) {
			branch = branch_cat;
			branch.cat_display = true;
			branch.cat = cat;
			branch.products = branch.products.filter(
				(product) => product.category?._id === cat._id,
			);
		}
	} else {
		if (branch.cats?.length > 0)
			throw redirect(307, `/en/shop/${params.branch}/categories`);
	}

	return { branch };
}
