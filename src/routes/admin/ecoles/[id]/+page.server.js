import { Ecole } from '$lib/server/models/Ecole';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const req = JSON.parse(JSON.stringify(Object.fromEntries(data)));
		console.log(req.culture_a_ecole);
		if (req.culture_a_ecole === 'on') req.culture_a_ecole = true;
		else req.culture_a_ecole = false;

		console.log(req.culture_a_ecole);

		const { _id, ...rest } = req;

		try {
			await Ecole.findByIdAndUpdate(_id, { ...rest });
		} catch (err) {
			return { success: false };
		}
		return { success: true };
	},
};
