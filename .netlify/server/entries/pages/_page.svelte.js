import { c as create_ssr_component, v as validate_component, b as each } from "../../chunks/ssr.js";
import { I as Img } from "../../chunks/Img.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let active = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1ohndas_START -->${$$result.title = `<title>Accueil | Marisol Sarrazin</title>`, ""}<meta name="description" content=""><!-- HEAD_svelte-1ohndas_END -->`, ""} <div class="relative h-[60lvh]">${validate_component(Img, "Img").$$render(
    $$result,
    {
      src: data.content[active].img.asset.url,
      class: "h-full w-full rounded-sm object-cover"
    },
    {},
    {}
  )} <div class="flex gap-2">${each(data.content, (item, i) => {
    return `<button class="h-4 w-4 rounded-full bg-black/30 transition-colors hover:bg-black/50" data-svelte-h="svelte-14lasni"></button>`;
  })}</div></div>`;
});
export {
  Page as default
};
