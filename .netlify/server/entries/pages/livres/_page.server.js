import { s as sanity } from "../../../chunks/sanity.js";
async function load() {
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
export {
  load
};
