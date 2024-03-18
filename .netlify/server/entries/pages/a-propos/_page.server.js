import { s as sanity } from "../../../chunks/sanity.js";
async function load() {
  const data = await sanity.fetch(`*[_type == "about-page"][0]{
        ...,
        atelier{
            ...,
            asset->{...}
        },
        imgs_atelier[]{
            ...,
            asset->{...}
        },
        imgs_dessin[]{
            ...,
            asset->{...}
        },
        bio{
            ...,
            img{
                ...,
                asset->{...}
            }
            
        }
        
    }`);
  return data;
}
export {
  load
};
