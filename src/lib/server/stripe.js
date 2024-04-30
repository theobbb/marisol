import { Stripe } from 'stripe';
import { STRIPE_API_KEY } from '$env/static/private';
import { dev } from '$app/environment';

let test = dev;
export default Stripe(
	test
		? 'sk_test_51OxX1nItENF0KQtorVpfebtAaKISXbuteyMlDJPFqcJM1mUFFk5sPW9PlkZd7UEjoWUmzyzielKDhLxtmUQ4QqTw00AhslbWxY'
		: STRIPE_API_KEY,
);
