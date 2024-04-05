import mongoose from 'mongoose';
const ecoleSchema = new mongoose.Schema({
	pin: Number,
	ecole: String,
	groupe: String,
	tel: String,
	adresse: String,

	responsable_nom: String,
	responsable_email: String,
	responsable_email2: String,
	responsable_tel: String,

	secretaire: String,

	created_at: { type: Date, default: Date.now },
	updated_at: Date,

	horaire_debut: String,
	horaire_fin: String,

	n_classes_0: Number,
	n_eleves_0: Number,
	n_classes_1: Number,
	n_eleves_1: Number,
	n_classes_2: Number,
	n_eleves_2: Number,
	n_classes_3: Number,
	n_eleves_3: Number,
	n_classes_4: Number,
	n_eleves_4: Number,
	n_classes_5: Number,
	n_eleves_5: Number,
	n_classes_6: Number,
	n_eleves_6: Number,

	type_atelier: String,
	culture_a_ecole: Boolean,
	materiel_inclu: String,
	message: String,

	n_jours: Number,
	n_km: Number,
	n_aller_retour: Number,
	n_nuits: Number,
	n_repas: Number,
	materiel: String,
	extra: String,
	paye: { type: Boolean, default: false },
});

export const Ecole = mongoose.model('Ecole', ecoleSchema);
