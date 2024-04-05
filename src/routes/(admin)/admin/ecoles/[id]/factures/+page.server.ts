import { Facture } from '$lib/server/models/Facture.js';

export async function load({ params }) {
	const { id } = params;
	const res = await Facture.find({ ecole: id });
	const facture = JSON.parse(JSON.stringify(res));
	return {
		facture,
	};
}
