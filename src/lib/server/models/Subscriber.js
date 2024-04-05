import mongoose from 'mongoose';
const subscriberSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	created_at: { type: Date, default: Date.now },
});

export const Subscriber =
	mongoose.models?.Subscriber || mongoose.model('Subscriber', subscriberSchema);
