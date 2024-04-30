import { load as shared } from '../../../../boutique/validation/succes/+page.server.js';

export async function load({ cookies, url }) {
	return await shared({ cookies, url });
}
