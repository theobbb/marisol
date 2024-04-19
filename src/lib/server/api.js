import { API_URL } from '$env/static/private';

export const API = {
	get: (route, request) => req('get', route, request),
	delete: (route, request) => req('delete', route, request),
	post: (route, request) => req('post', route, request),
	put: (route, request) => req('put', route, request),
	patch: (route, request) => req('patch', route, request),
};

async function req(method, route, request = {}) {
	const url = API_URL + route;
	//console.log(method, url);
	try {
		const res = await fetch(url, {
			method,

			body: request,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		const data = await res.text();

		console.log('res', data);
		return data;
	} catch (err) {
		console.error(err);
	}
}
