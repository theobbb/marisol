import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
	cart_id: String,
	items: [
		{
			product_id: String,
			quantity: Number,
			variant_id: String,
			price: Number,
			is_book: Boolean,
		},
	],

	subtotal: Number,
	taxes: [{ code: String, amount: Number }],
	shipping: Number,
	total: Number,
	created_at: { type: Date, default: Date.now },
	country: String,
	state: String,
});

export const Cart = mongoose.model('Cart', cartSchema);
