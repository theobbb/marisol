import { load as shared } from '../../../../boutique/validation/success/+page.server.js';

export async function load({ cookies, url }) {
	return await shared({ cookies, url });
}
