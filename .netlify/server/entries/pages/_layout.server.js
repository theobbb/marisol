import { a as MONGO_URI } from "../../chunks/private.js";
import { s as sanity } from "../../chunks/sanity.js";
import mongoose from "mongoose";
import { C as Cart } from "../../chunks/Cart.js";
async function load({ cookies }) {
  const books = await sanity.fetch(`*[_type == "book"] {
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
            }
            
    }`);
  const series = await sanity.fetch(`*[_type == "serie"]`);
  books.forEach((book) => {
    const serie = series.find(
      (serie2) => serie2.books.some((b) => b._ref === book._id)
    );
    if (serie)
      book.serie = { _id: serie._id, name: serie.name, slug: serie.slug };
  });
  const portfolio = await sanity.fetch(`*[_type == "portfolio-page" && _id == "pagePortfolio"][0]{
        ...,
        children[]->{
            ...,
            content[]{
                ...,
                img {
                        asset->{...}
                    },
              

            }
           
        }
            }`);
  const shop = await sanity.fetch(`*[_type == "shop-page"][0]{
        ...,
        branches[]->{
            ...,
			products[]->{
				...,
				variants[]{
					...,
					variant->{...}
				},
				'imgs': imgs[].asset->{
					...
				}
			},
			
           
        }
            }`);
  shop.branches.forEach((branch) => {
    const variants = [];
    branch.products.forEach((product) => {
      product.branch = {
        _id: branch._id,
        name: branch.name,
        slug: branch.slug,
        description: branch.description
      };
      product.variants.forEach((variant) => {
        if (!variants.some((v) => v._id === variant.variant._id))
          variants.push(variant.variant);
      });
      if (!product.book_ref)
        return;
      product.book = books.find((book) => book._id === product.book_ref?._ref);
    });
    branch.variants = variants;
  });
  await mongoose.connect(MONGO_URI);
  let cart = null;
  const cartId = cookies.get("cart_id");
  if (cartId && cartId !== "undefined") {
    const retrieved = await Cart.findById(cartId);
    if (retrieved) {
      cart = JSON.parse(JSON.stringify(retrieved));
    }
  }
  return {
    books,
    series,
    portfolio,
    cart,
    shop
    //, collections
  };
}
export {
  load
};
