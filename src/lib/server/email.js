import smtpTransport from 'nodemailer-smtp-transport';
import { EMAIL_ADDRESS, EMAIL_HOST, EMAIL_PASSWORD } from '$env/static/private';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport(
	smtpTransport({
		name: 'hostgator',
		host: EMAIL_HOST,
		port: '465',
		secure: true, // true for 465, false for other ports
		auth: {
			user: EMAIL_ADDRESS,
			pass: EMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false, // do not fail on invalid certs
		},
	}),
);
