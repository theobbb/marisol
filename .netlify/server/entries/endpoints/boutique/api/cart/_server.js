import { M as MEDUSA_BACKEND_URL } from "../../../../../chunks/private.js";
import { C as Cart } from "../../../../../chunks/Cart.js";
import Medusa from "@medusajs/medusa-js";
import { j as json } from "../../../../../chunks/index.js";
async function GET({ cookies }) {
  const medusa = new Medusa(MEDUSA_BACKEND_URL);
  let cart = null;
  const cartId = cookies.get("cart_id");
  if (cartId && cartId !== "undefined") {
    const retrieved = await medusa.carts.retrieve(cartId);
    cart = retrieved.cart;
  } else {
    const newCart = await medusa.carts.create();
    cart = newCart.cart;
    cookies.set("cart_id", cart.id, { path: "/", "max-age": 60 * 60 * 24 * 7 });
  }
  if (cart)
    return new Response({ body: cart });
  else
    return new Response({ body: { message: "No cart found" }, status: 404 });
}
async function POST({ cookies }) {
  try {
    const cart = new Cart();
    await cart.save();
    cookies.set("cart_id", cart.id, { path: "/", "max-age": 60 * 60 * 24 * 7 });
    console.log("res", cart);
    return json(cart);
  } catch (err) {
    console.error(err);
  }
}
export {
  GET,
  POST
};
