/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderColor: {
				DEFAULT: 'rgba(255,255,255, 0.12)'
			}
		}
	},
	plugins: []
};
