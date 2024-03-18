import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import Page from "../../contact/_page.svelte.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Page, "Page").$$render($$result, {}, {}, {})}`;
});
export {
  Page_1 as default
};
