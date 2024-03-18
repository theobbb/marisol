import { c as create_ssr_component, s as subscribe } from "../../../chunks/ssr.js";
import { l as lang } from "../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `${$$result.head += `<!-- HEAD_svelte-j3abeq_START -->${$$result.title = `<title>Portfolio | Marisol Sarrazin</title>`, ""}<meta name="description" content=""><!-- HEAD_svelte-j3abeq_END -->`, ""} ${``}`;
});
export {
  Page as default
};
