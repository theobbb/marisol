import { c as create_ssr_component, g as spread, h as escape_object, i as escape_attribute_value, e as escape } from "./ssr.js";
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href = "", active, button = false } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  return `<a${spread(
    [
      escape_object($$props),
      { href: escape_attribute_value(href) },
      {
        class: "rounded px-2.5 py-1 font-light decoration-black/20 underline-offset-4 hover:underline " + escape(active ? "bg-black/[0.07] " : "", true) + " " + escape(button ? "bg-black/10" : "", true) + " " + escape($$props.class, true)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``} </a>`;
});
export {
  Link as L
};
