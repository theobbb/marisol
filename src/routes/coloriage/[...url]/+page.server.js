export const actions = {
	download: async ({ url }) => {
		const img_url = url.pathname.replace('/coloriage/', '');
		console.log(img_url);

		return { success: true };
	},
};
