import { Ecole } from '$lib/server/models/Ecole.js';

export async function load({ params }) {
	const { id } = params;
	const res = await Ecole.findById(id);
	const ecole = JSON.parse(JSON.stringify(res));
	return {
		ecole,
	};
}
