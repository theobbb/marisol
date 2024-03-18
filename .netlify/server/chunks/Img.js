import { c as create_ssr_component, j as compute_rest_props, g as spread, i as escape_attribute_value, h as escape_object, e as escape, d as add_attribute } from "./ssr.js";
const Img = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["src", "lazy", "alt"]);
  let { src, lazy = false, alt = "" } = $$props;
  let dom;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.lazy === void 0 && $$bindings.lazy && lazy !== void 0)
    $$bindings.lazy(lazy);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  return `<img${spread(
    [
      { src: escape_attribute_value(src) },
      { alt: escape_attribute_value(alt) },
      escape_object($$restProps),
      {
        class: escape("opacity-0", true) + " transition duration-500 " + escape($$props.class, true)
      }
    ],
    {}
  )}${add_attribute("this", dom, 0)}>`;
});
export {
  Img as I
};
