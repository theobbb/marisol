import * as server from '../entries/pages/en/books/_page.server.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/en/books/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/en/books/+page.server.js";
export const imports = ["_app/immutable/nodes/14.LV228FBK.js","_app/immutable/chunks/scheduler.tKAC6eQ8.js","_app/immutable/chunks/index.DWCAsQ0i.js","_app/immutable/nodes/23.CDm9TZZj.js","_app/immutable/chunks/spread.4dapbekP.js","_app/immutable/chunks/Img.CxJK-_F4.js","_app/immutable/chunks/Link.BOa_4RdJ.js","_app/immutable/chunks/store.Bc5lJXfq.js","_app/immutable/chunks/index.S6cUjvwG.js","_app/immutable/chunks/SanityTextBlock.ov3OGx6g.js"];
export const stylesheets = [];
export const fonts = [];
