import sanity from '$lib/server/sanity';

export async function load() {
	const data = await sanity.fetch(`*[_type == "book"]`);
	console.log(data);
}
