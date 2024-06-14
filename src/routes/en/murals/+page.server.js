import { load as shared } from '../../murales/+page.server.js';

export async function load() {
	return await shared();
}
