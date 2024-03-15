import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			strict: false
		}
	},
	ssr: {
		noExternal: ['gsap']
	},
	resolve: {
		alias: {
			// Replace $lib with your desired alias and point it to 'src/lib'
			$lib: '/src/lib',
			// You can add more custom aliases as needed
			$components: '/src/components'
		}
	}
});
