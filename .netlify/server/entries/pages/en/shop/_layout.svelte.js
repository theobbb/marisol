import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import Layout from "../../boutique/_layout.svelte.js";
const Layout_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Layout, "Layout").$$render($$result, { data }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export {
  Layout_1 as default
};
