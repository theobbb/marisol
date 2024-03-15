export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [0,2];

export const dictionary = {
		"/": [3],
		"/a-propos": [~4],
		"/animations": [~5],
		"/boutique": [~6],
		"/contact": [~7],
		"/en": [8],
		"/en/about": [~9],
		"/en/books": [~10],
		"/en/contact": [~11],
		"/en/portfolio": [~12],
		"/en/shop": [~13],
		"/en/workshop": [~14],
		"/livres": [~15],
		"/livres/[slug]": [16],
		"/portfolio": [~17,[2]],
		"/portfolio/[branch]": [18,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';