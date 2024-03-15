import medusa from '$lib/server/medusa';
import sanity from '$lib/server/sanity.js';

export async function load() {
	const books = await sanity.fetch(`*[_type == "book"] {
        ...,
        images[]{
            ...,
                asset->{
                    _id,
                    ...,
                    'url': url + '?format=auto&fm=webp',
                    'w': metadata.dimensions.width,
                    'h': metadata.dimensions.height
                }
            }
            
    }`);

	const series = await sanity.fetch(`*[_type == "serie"]`);

	books.forEach((book) => {
		const serie = series.find((serie) =>
			serie.books.some((b) => b._ref === book._id),
		);
		if (serie)
			book.serie = { _id: serie._id, name: serie.name, slug: serie.slug };
	});

	const portfolio =
		await sanity.fetch(`*[_type == "portfolio-page" && _id == "pagePortfolio"][0]{
        ...,
        children[]->{
            ...,
            content[]{
                ...,
                img {
                        asset->{...}
                    },
              

            }
           
        }
            }`);

	/*
	const portfolioPage = await sanity.fetch(`*[_type == "portfolio-page"]{
        ...,
        content[]{
            ...,
            img {
                asset->{...}
            },
            book_ref->{
                ...,
            }

        }
    }`);
    const portfolioBranches = await sanity.fetch(`*[_type == "portfolio-branch"]{
        ...,
        content[]{
            ...,
            img {
                asset->{...}
            },
            book_ref->{
                ...,
            }

        }
    }`);
    const portfolioContent = await sanity.fetch(`*[_type == "portfolio-content"]{
        ...,
        img {
            asset->{...}
        },
        book_ref->{
            ...,
        }
    }`);*/
	/*
	const base = portfolioPage.find((item) => item._id.includes('pagePortfolio'));

	const portfolioTree = { ...base };

	findChildren(portfolioTree);

	function findChildren(node) {
		if (!node.children || !node.children.length) return;

		node.children.forEach((ref, index) => {
			const child = portfolioPage.find((item) => item._id === ref._ref);
			node.children[index] = child;
			findChildren(child);
		});
	}*/
	const { collections } = await medusa.collections.list();

	return { books, series, portfolio, collections };
}
