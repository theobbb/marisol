import mongoose from 'mongoose';
import { MONGO_URI } from '$env/static/private';

export function connectDB() {
	return mongoose.connect(MONGO_URI);
}
