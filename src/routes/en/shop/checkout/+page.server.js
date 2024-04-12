import { load as shared } from '../../../boutique/validation/+page.server.js';

export async function load({ cookies }) {
	return await shared({ cookies });
}
