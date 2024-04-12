export async function load({ params, parent }) {
	const { shop } = await parent();

	let match = null;

	shop.branches.forEach((branch) => {
		branch.products.forEach((product) => {
			const slug = product.slug?.en?.current || product.slug?.fr?.current;
			if (slug === params.slug) {
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
