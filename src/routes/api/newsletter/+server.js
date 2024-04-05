import { Subscriber } from '$lib/server/models/Subscriber.js';
import { json, text } from '@sveltejs/kit';

export async function POST({ request }) {
	const { email } = await request.json();

	try {
		const exists = await Subscriber.findOne({ email });
		console.log(exists);
		if (exists) {
			return json({ success: false, exists: true });
		}

		await Subscriber.create({ email });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
	return json({
		success: true,
	});
	//throw redirect(307, '/formulaire_ecole/merci');
}

export async function DELETE({ request }) {
	const { email } = await request.json();

	await Subscriber.findAndDelete({ email });

	return text('ok');
}
