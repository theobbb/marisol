import { s as sanity } from "../../../chunks/sanity.js";
async function load() {
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
export {
  load
};
