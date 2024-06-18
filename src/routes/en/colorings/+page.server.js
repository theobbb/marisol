import { load as shared } from '../../coloriages/+page.server.js';

export async function load() {
	return await shared();
}
