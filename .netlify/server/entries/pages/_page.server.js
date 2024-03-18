import { s as sanity } from "../../chunks/sanity.js";
async function load() {
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
export {
  load
};
