import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
	cart_id: String,
	items: [
		{
			product_id: String,
			quantity: Number,
			variant_id: String,
			price: Number,
		},
	],

	subtotal: Number,
	total: Number,
	created_at: { type: Date, default: Date.now },
});

export const Cart = mongoose.models?.Cart || mongoose.model('Cart', cartSchema);
