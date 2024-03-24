import mongoose from 'mongoose';
const ecoleSchema = new mongoose.Schema({
	ecole: { type: mongoose.Schema.Types.ObjectId, ref: 'Ecole', required: true },
	no: { type: String, required: true },

	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export const Ecole = mongoose.model('Ecole', ecoleSchema);
