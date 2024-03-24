import mongoose from 'mongoose';
import { MONGO_URI } from '$env/static/private';

export async function connectDB() {
	return mongoose.connect(MONGO_URI, {
		serverSelectionTimeoutMS: 5000,
	});
}
