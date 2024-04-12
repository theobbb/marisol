import { load as shared } from '../../livres/+page.server.js';

export async function load() {
	return await shared();
}
