import sanity from '$lib/server/sanity';

export async function load({ parent }) {
	const { books } = await parent();
	const home = await sanity.fetch(`*[_type == "home-page"][0]{
        ...,
        content[]{
            ...,
            img {
                ...,
                asset->{...}
            }
        }

    }`);

	home.content.forEach((item) => {
		if (!item.book_ref) return;
		item.book = books.find((book) => book._id === item.book_ref._ref);
	});

	return home;
}
