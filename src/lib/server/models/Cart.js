import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
	cart_id: String,
	items: [
		{
			name: String,
			product_id: String,
			quantity: Number,
			variant_id: String,
			price: Number,
			is_book: Boolean,
			discount: Number,
			url: String,
			image: String,
		},
	],
	status: String,
	stripe_id: String,
	discount: Number,
	subtotal: Number,
	taxes: [{ code: String, amount: Number }],
	shipping: Number,
	total: Number,
	created_at: { type: Date, default: Date.now },
	country: String,
	state: String,
	email_sent: { type: Boolean, default: false },
	receipt: String,
	message: String,
});

export const Cart = mongoose.models?.Cart || mongoose.model('Cart', cartSchema);
