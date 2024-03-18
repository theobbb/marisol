import { c as create_ssr_component, s as subscribe, a as set_store_value } from "../../../chunks/ssr.js";
import { c as cart } from "../../../chunks/store.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  let { data } = $$props;
  let subtotal = 0;
  function populateCart() {
    subtotal = 0;
    const allProducts = data.shop.branches.flatMap((branch) => branch.products);
    $cart.items.forEach((item) => {
      const product = allProducts.find((product2) => product2._id === item.product_id);
      if (product) {
        item.variant_name = product.variants.find((variant) => variant.variant._id === item.variant_id).variant.name;
      }
      if (product.isBook) {
        product.book = data.books.find((book) => book._id === product.book_ref._ref);
      }
      item.product = product;
      if (!product)
        return;
      const variantData = product.variants.find((variant) => variant.variant._id === item.variant_id);
      if (!variantData)
        return;
      item.price = variantData.price;
      item.stock = variantData.stock;
      subtotal += item.price * item.quantity;
    });
    set_store_value(cart, $cart.subtotal = subtotal, $cart);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    populateCart();
  }
  $$unsubscribe_cart();
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
