import { EMAIL_HOST, EMAIL_PASSWORD } from '$env/static/private';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

export async function POST({ request }) {
	const { from, to, subject, html } = await request.json();

	const transporter = nodemailer.createTransport(
		smtpTransport({
			name: 'hostgator',
			host: EMAIL_HOST,
			port: '465',
			secure: true, // true for 465, false for other ports
			auth: {
				user: from,
				pass: EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false, // do not fail on invalid certs
			},
		}),
	);

	try {
		const res = await transporter.sendMail({
			from, // sender address
			to, // list of receivers
			subject, // Subject line
			html, // html body
		});
		console.log(res);
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
	return json({ success: true });
	//throw redirect(307, '/formulaire_ecole/merci');
}
