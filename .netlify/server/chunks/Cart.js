import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  cart_id: String,
  items: [
    {
      product_id: String,
      quantity: Number,
      variant_id: String,
      subtotal: Number,
      total: Number
    }
  ],
  created_at: { type: Date, default: Date.now }
});
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export {
  Cart as C
};
