import * as server from '../entries/pages/en/shop/_page.server.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/en/shop/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/en/shop/+page.server.js";
export const imports = ["_app/immutable/nodes/18.B34Z6y7X.js","_app/immutable/chunks/scheduler.tKAC6eQ8.js","_app/immutable/chunks/index.DWCAsQ0i.js","_app/immutable/nodes/7.Bpr055uH.js","_app/immutable/chunks/spread.4dapbekP.js","_app/immutable/chunks/Img.CxJK-_F4.js","_app/immutable/chunks/store.Bc5lJXfq.js","_app/immutable/chunks/index.S6cUjvwG.js","_app/immutable/chunks/formatPrice.DTr9dw3E.js"];
export const stylesheets = [];
export const fonts = [];
