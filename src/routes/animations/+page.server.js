import sanity from '$lib/server/sanity.js';

export async function load() {
	const data = await sanity.fetch(`*[_type == "workshop-page"][0]{
        ...,
        featured[]{
            ...,
            asset->{...}
        },
        imgs[]{
            ...,
            asset->{...}


        }
    }`);

	return data;
}
