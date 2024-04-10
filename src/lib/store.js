import { writable } from 'svelte/store';

export const lang = writable('fr');

export const cart = writable(null);

export const lang_href = writable({ fr: '/', en: '/en' });
export const progress = writable();

export const invert = writable(false);
