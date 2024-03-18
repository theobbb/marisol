import { c as create_ssr_component, e as escape } from "./ssr.js";
import { toHTML } from "@portabletext/to-html";
const SanityTextBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blocks } = $$props;
  if ($$props.blocks === void 0 && $$bindings.blocks && blocks !== void 0)
    $$bindings.blocks(blocks);
  return `${blocks ? `<div class="${"text-block space-y-12 text-lg leading-[1.64rem] md:text-xl md:leading-[1.66rem] [&_*]:text-2xl [&_*]:md:text-3xl [&_p]:!mt-2 [&_p]:text-lg [&_p]:md:text-lg " + escape($$props.class, true)}"><!-- HTML_TAG_START -->${toHTML(blocks)}<!-- HTML_TAG_END --></div>` : ``}`;
});
export {
  SanityTextBlock as S
};
