import { r as redirect } from "../../../../../chunks/index.js";
async function load({ params, parent }) {
  const { shop } = await parent();
  let match = null;
  shop.branches.forEach((branch) => {
    branch.products.forEach((product) => {
      if (product.slug.fr.current === params.slug) {
        match = product;
      }
    });
  });
  if (match) {
    return {
      match
    };
  }
  console.log("match", match);
  throw redirect(307, "/en/shop");
}
export {
  load
};
