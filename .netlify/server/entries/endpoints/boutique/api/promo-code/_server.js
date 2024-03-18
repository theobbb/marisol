import Medusa from "@medusajs/medusa-js";
import { M as MEDUSA_BACKEND_URL } from "../../../../../chunks/private.js";
import { j as json, t as text } from "../../../../../chunks/index.js";
const medusa = new Medusa(MEDUSA_BACKEND_URL, {
  persistentCart: true
});
async function POST({ request }) {
  const { cart_id, code } = await request.json();
  if (!cart_id || !code) {
    return new Response({ body: { message: "Invalid request" }, status: 400 });
  }
  try {
    const { cart } = await medusa.carts.update(cart_id, {
      discounts: [
        {
          code
        }
      ]
    });
    console.log(cart);
    return json(cart);
  } catch (error) {
    console.log(error.message);
    return text(error.message);
  }
}
export {
  POST
};
