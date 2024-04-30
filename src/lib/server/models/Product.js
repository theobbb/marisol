import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
	object: String,
	default_price: Number,
	images: [String],
	metadata: Object,
	name: String,
	shipping: Object,
	url: String,
});

export const Product =
	mongoose.models?.Product || mongoose.model('Product', productSchema);
