import { Ecole } from '$lib/server/models/Ecole.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const req = JSON.parse(JSON.stringify(Object.fromEntries(data)));

		if (req.culture_a_ecole === 'on') req.culture_a_ecole = true;
		else req.culture_a_ecole = false;

		try {
			await Ecole.create(req);
		} catch (err) {
			return { success: false };
		}
		console.log('success');
		throw redirect(302, '/formulaire_ecole/merci');
	},
};
