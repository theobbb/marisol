import sanity from '$lib/server/sanity';
export const prerender = false;
export async function load() {
	return sanity.fetch(`*[_type == "books-page"][0] {
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
}
