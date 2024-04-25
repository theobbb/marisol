import { Cart } from '$lib/server/models/Cart.js';
import smtpTransport from 'nodemailer-smtp-transport';
import { EMAIL_HOST, EMAIL_PASSWORD } from '$env/static/private';
import nodemailer from 'nodemailer';

export async function load({ cookies, url }) {
	console.log('res');

	const transporter = nodemailer.createTransport(
		smtpTransport({
			name: 'hostgator',
			host: EMAIL_HOST,
			port: '465',
			secure: true, // true for 465, false for other ports
			auth: {
				user: EMAIL_HOST,
				pass: EMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false, // do not fail on invalid certs
			},
		}),
	);
	const res = await transporter.sendMail({
		from: 'info@marisolsarrazin.com', // sender address
		to: 'theobaillargeon@hotmail.com', // list of receivers
		subject: 'ff', // Subject line
		html: 'hello', // html body
	});
	console.log(res);
	return;

	const cart_id = url.searchParams.get('cart_id');

	const status = url.searchParams.get('redirect_status');
	if (status != 'succeeded') return;
	if (!cart_id) return;

	const cookiesCartId = cookies.get('cart_id');

	if (cookiesCartId != cart_id) return;

	const cart = await Cart.findById(cart_id);
	if (!cart || cart.status == 'complete') return;

	const stripe_id = url.searchParams.get('payment_intent');

	cart.status = 'complete';
	cart.stripe_id = stripe_id;

	await cart.save();

	cookies.delete('cart_id', { path: '/' });
}
