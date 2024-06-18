import sanity from '$lib/server/sanity.js';

export async function load() {
	const data =
		await sanity.fetch(`*[_type == "murals-page" && _id == "pageMurales"][0]{
        ...,
        murals[]{
            ...,
            imgs[]{
                ...,
                asset->{...}
            },
            videos[]{
                ...,
                asset->{...}
            }
        }
    }`);

	return data;
}
