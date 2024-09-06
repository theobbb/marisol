import { EMAIL_ADDRESS, EMAIL_HOST } from '$env/static/private';
import { transporter } from '$lib/server/email.js';

export const actions = {
	default: async ({ request }) => {
		// TODO log the user in

		const body = Object.fromEntries(await request.formData());

		console.log(body);

		try {
			await transporter.sendMail({
				from: body.name,
				to: EMAIL_ADDRESS,
				subject: `Contact Form site web: ${body.subject}`,
				text: body.message,
			});
		} catch (error) {
			console.error(error);
			return {
				error: true,
				status: 500,
			};
		}
		return {
			success: true,
		};
	},
};
