import { createClient } from '@sanity/client';

export default createClient({
	projectId: 'm60p6rsb',
	dataset: 'production',
	apiVersion: '2024-03-19', // use a UTC date string
	token: '', // or leave blank for unauthenticated usage
	useCdn: false // `false` if you want to ensure fresh data
});
