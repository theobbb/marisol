import { c as create_ssr_component, s as subscribe, b as each, d as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { I as Img } from "../../../chunks/Img.js";
import { c as cart, l as lang } from "../../../chunks/store.js";
import { f as formatPrice } from "../../../chunks/formatPrice.js";
const AddToCart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => value);
  let { product, variant } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  $$unsubscribe_cart();
  return `<div><button class="opacity-30" data-svelte-h="svelte-1mtbnrs"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0zm18.31 6l-2.76 5z" fill="none" class=""></path><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></svg></button></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  let hiddenVariants = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `<div class="flex flex-col gap-44">${each(data?.shop?.branches, (branch) => {
    return `<div${add_attribute("id", branch.slug[$lang].current, 0)} class="scroll-mt-44"><div class="mb-12 flex w-full flex-col justify-between gap-4 border-b pb-2 lg:flex-row"><div class="text-4xl">${escape(branch.name[$lang] || branch.name.fr)}</div> <div class="flex flex-col items-end gap-4 text-xl lg:flex-row">${each(branch.variants, (variant) => {
      return `<div><button class="${"rounded px-3 py-1 decoration-black/20 underline-offset-4 hover:underline " + escape(variant.hidden ? "" : "bg-black/10", true)}">${escape(variant.name[$lang] || variant.name.fr)}</button> </div>`;
    })} </div></div> <div class="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-20">${each(branch.products, (product) => {
      return `${!product.variants?.some((v) => hiddenVariants.includes(v.variant._id)) ? `<div><a class="" href="${"/" + escape($lang == "fr" ? "boutique" : "en/shop", true) + "/" + escape(product.slug[$lang]?.current || product.slug.fr.current, true)}"><div>${validate_component(Img, "Img").$$render(
        $$result,
        {
          class: "rounded-sm",
          src: product.isBook ? product.book?.images[0].asset.url : product.imgs[0].url
        },
        {},
        {}
      )}</div> <div class="mt-4 border-b pb-1 text-2xl">${escape(product.name[$lang] || product.name.fr)} </div></a> <div class="mt-4 flex flex-col gap-2">${each(product.variants, (variant) => {
        return `<div class="flex w-full items-center justify-between gap-2"><div class="flex gap-2"><div class="w-14 font-medium">${escape(formatPrice(variant.price))}</div> <div class="text-black/50">${escape(variant.variant.name[$lang] || variant.variant.name.fr)} </div></div> <div>${validate_component(AddToCart, "AddToCart").$$render($$result, { product, variant }, {}, {})}</div> </div>`;
      })}</div> </div>` : ``}`;
    })}</div> </div>`;
  })}</div>`;
});
export {
  Page as default
};
