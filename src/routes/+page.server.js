import sanity from '$lib/server/sanity';

export async function load() {
	const home = await sanity.fetch(`*[_type == "home-page"][0]{
        ...,
        content[]{
            ...,
            img {
                asset->{...}
            }
        }

    }`);

	return home;
}
