

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/en/shop/checkout/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.hTVjsXKZ.js","_app/immutable/chunks/scheduler.tKAC6eQ8.js","_app/immutable/chunks/index.DWCAsQ0i.js"];
export const stylesheets = [];
export const fonts = [];
