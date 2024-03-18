import * as universal from '../entries/pages/portfolio/_page.js';

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/portfolio/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/portfolio/+page.js";
export const imports = ["_app/immutable/nodes/25.tzS7sOkL.js","_app/immutable/chunks/_page.tL0hNnGN.js","_app/immutable/chunks/scheduler.tKAC6eQ8.js","_app/immutable/chunks/index.DWCAsQ0i.js","_app/immutable/chunks/spread.4dapbekP.js","_app/immutable/chunks/store.Bc5lJXfq.js","_app/immutable/chunks/index.S6cUjvwG.js","_app/immutable/chunks/Link.BOa_4RdJ.js","_app/immutable/chunks/Img.CxJK-_F4.js","_app/immutable/chunks/LightBox.CrdG0x71.js"];
export const stylesheets = [];
export const fonts = [];
