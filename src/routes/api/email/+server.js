import { transporter } from '$lib/server/email.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { from, to, subject, html } = await request.json();

	try {
		await transporter.sendMail({
			from, // sender address
			to, // list of receivers
			subject, // Subject line
			html, // html body
		});
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
	return json({ success: true });
	//throw redirect(307, '/formulaire_ecole/merci');
}
