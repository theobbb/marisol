import { Ecole } from '$lib/server/models/Ecole';

export async function load() {
	const res = await Ecole.find();
	const ecoles = JSON.parse(JSON.stringify(res));
	return {
		ecoles: ecoles,
	};
}
