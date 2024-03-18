import { c as create_ssr_component, s as subscribe, v as validate_component, b as each } from "../../../chunks/ssr.js";
import { I as Img } from "../../../chunks/Img.js";
import { L as LightBox } from "../../../chunks/LightBox.js";
import { S as SanityTextBlock } from "../../../chunks/SanityTextBlock.js";
import { l as lang } from "../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  console.log(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `<div class="mb-24 flex w-full flex-col justify-between gap-6 md:flex-row md:gap-20"><div class="flex flex-col md:w-1/2"><div class="max-w-[700px]">${validate_component(SanityTextBlock, "SanityTextBlock").$$render($$result, { blocks: data.text1[$lang] }, {}, {})}</div> <div class="mt-8 self-end">${validate_component(Img, "Img").$$render(
    $$result,
    {
      src: data.featured[0].asset.url,
      class: "max-h-[50lvh] rounded-sm"
    },
    {},
    {}
  )}</div></div> <div class="flex flex-col md:w-1/2"><div class="md:self-end">${validate_component(Img, "Img").$$render(
    $$result,
    {
      src: data.featured[1].asset.url,
      class: "rounded-sm"
    },
    {},
    {}
  )}</div> <div class="mt-8 max-w-[700px]">${validate_component(SanityTextBlock, "SanityTextBlock").$$render($$result, { blocks: data.text2[$lang] }, {}, {})}</div></div></div> ${validate_component(LightBox, "LightBox").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="columns-[2] gap-4 md:columns-[3] xl:columns-[4]">${each(data.imgs, (img) => {
        return `<div class="grid-item mb-4">${validate_component(Img, "Img").$$render(
          $$result,
          {
            lazy: true,
            src: img.asset.url,
            class: "rounded-sm"
          },
          {},
          {}
        )} </div>`;
      })}</div>`;
    }
  })}`;
});
export {
  Page as default
};
