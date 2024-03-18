import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import Page from "../../livres/_page.svelte.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Page, "Page").$$render($$result, { data }, {}, {})}`;
});
export {
  Page_1 as default
};
