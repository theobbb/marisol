import { load as shared } from '../../animations/+page.server.js';

export async function load() {
	return await shared();
}
