import Medusa from '@medusajs/medusa-js';
import { MEDUSA_BACKEND_URL } from '$env/static/private';
export default new Medusa(MEDUSA_BACKEND_URL, {
	persistentCart: true,
});
