export async function load({ params, parent }) {
	const { shop } = await parent();

	let match = null;

	shop.branches.forEach((branch) => {
		branch.products.forEach((product) => {
			if (product.slug.fr?.current === params.slug) {
				match = product;
			}
		});
	});

	if (match) {
		return {
			match,
		};
	}
}
