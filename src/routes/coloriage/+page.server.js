import sanity from '$lib/server/sanity.js';

export async function load() {
	const data = await sanity.fetch(`*[_type == "colorings-page"][0]{
        ...,
        imgs[]{
            ...,
            asset->{...}
        }
        
    }`);

	console.log(data);

	return data;
}
