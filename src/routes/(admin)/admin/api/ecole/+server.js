import { Ecole } from '$lib/server/models/Ecole.js';
import { json, text } from '@sveltejs/kit';

export async function PUT({ request }) {
	const { _id, ...rest } = await request.formData();

	await Ecole.findByIdAndUpdate(_id, { ...rest, updated_at: new Date() });
	return text('ok');
}
export async function DELETE({ request }) {
	const { _id } = await request.json();

	await Ecole.findByIdAndDelete(_id);

	return text('ok');
}

export async function POST({ request }) {
	const data = await request.formData();

	const req = JSON.parse(JSON.stringify(Object.fromEntries(data)));

	try {
		if (!req._id || req._id == 'undefined') {
			delete req._id;

			if (req.culture_a_ecole === 'on') req.culture_a_ecole = true;
			else req.culture_a_ecole = false;
			await Ecole.create(req);
		} else {
			const { _id, ...rest } = req;
			console.log(req);
			await Ecole.findByIdAndUpdate(_id, { ...rest, updated_at: new Date() });
		}
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
	return json({ success: true });
	//throw redirect(307, '/formulaire_ecole/merci');
}
