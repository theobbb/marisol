import { Stripe } from 'stripe';
import { STRIPE_API_KEY } from '$env/static/private';

export default Stripe(STRIPE_API_KEY);
