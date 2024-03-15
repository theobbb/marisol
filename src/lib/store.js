import { writable } from 'svelte/store';

export const lang = writable('fr');

export const cart = writable(null);
