import mongoose from 'mongoose';
const factureSchema = new mongoose.Schema({
	ecole: { type: mongoose.Schema.Types.ObjectId, ref: 'Ecole', required: true },
	adresse: String,
	ville: String,
	code_postal: String,
	telephone: String,
	email: String,
	contact: String,
	no: String,
	date: Date,
	client: String,
	client_adresse: String,
	client_ville: String,
	client_code_postal: String,
	client_telephone: String,
	responsable: String,
	rencontres: String,
	items: [
		{
			nom: String,
			quantite: Number,
			unite: Number,
			taux: Number,
			cout: Number,
		},
	],
	sub_total: Number,
	tps: Number,
	tvq: Number,
	total: Number,
	created_at: { type: Date, default: Date.now },
});

export const Facture = mongoose.model('Facture', factureSchema);
