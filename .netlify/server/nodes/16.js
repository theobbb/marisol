import * as server from '../entries/pages/en/contact/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/en/contact/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/en/contact/+page.server.js";
export const imports = ["_app/immutable/nodes/16.DHvbKgh0.js","_app/immutable/chunks/scheduler.tKAC6eQ8.js","_app/immutable/chunks/index.DWCAsQ0i.js","_app/immutable/nodes/11.B9NqjMEr.js","_app/immutable/chunks/store.Bc5lJXfq.js","_app/immutable/chunks/index.S6cUjvwG.js"];
export const stylesheets = [];
export const fonts = [];
