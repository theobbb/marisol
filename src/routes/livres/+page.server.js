import sanity from '$lib/server/sanity';

export async function load() {
	const data = await sanity.fetch(`*[_type == "books-page"][0] {
		content[]-> {
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
            },
            'images_en': {...images_en, 'asset': images_en.asset->{...}},
			books[]->{
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
            },
			}
		}
	}`);

	if (!data) {
		return { status: 404 };
	}

	return data;
}
