import * as universal from '../entries/pages/boutique/_slug_/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/boutique/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/boutique/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/10.Cd01kwVA.js","_app/immutable/chunks/index.g5YcAAdQ.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/_page.jxFNgIaA.js","_app/immutable/chunks/scheduler.tKAC6eQ8.js","_app/immutable/chunks/index.DWCAsQ0i.js","_app/immutable/chunks/spread.4dapbekP.js","_app/immutable/chunks/Img.CxJK-_F4.js","_app/immutable/chunks/Link.BOa_4RdJ.js","_app/immutable/chunks/store.Bc5lJXfq.js","_app/immutable/chunks/index.S6cUjvwG.js","_app/immutable/chunks/SanityTextBlock.ov3OGx6g.js","_app/immutable/chunks/formatPrice.DTr9dw3E.js","_app/immutable/chunks/LightBox.CrdG0x71.js"];
export const stylesheets = [];
export const fonts = [];
