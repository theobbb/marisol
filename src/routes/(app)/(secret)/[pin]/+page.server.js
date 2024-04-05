import { Ecole } from '$lib/server/models/Ecole.js';

export async function load({ params }) {
	const pin = params.pin;
	if (pin.length !== 4) {
		return { status: 404 };
	}
	const ecole = await Ecole.findOne({ pin: Number(pin) });
	console.log(ecole);
	if (!ecole) {
		return { status: 404 };
	}
	return {
		ecole: JSON.parse(JSON.stringify(ecole)),
	};
}
