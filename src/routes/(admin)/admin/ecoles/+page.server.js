import { Ecole } from '$lib/server/models/Ecole';

export async function load() {
	const res = await Ecole.find();
	console.log(res);
	const ecoles = JSON.parse(JSON.stringify(res));
	return {
		ecoles: ecoles,
	};
}
