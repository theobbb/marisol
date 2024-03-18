import { c as create_ssr_component, s as subscribe, e as escape, d as add_attribute, b as each, v as validate_component } from "../../../../chunks/ssr.js";
import { I as Img } from "../../../../chunks/Img.js";
import { c as cart, l as lang } from "../../../../chunks/store.js";
import { L as Link } from "../../../../chunks/Link.js";
import { f as formatPrice } from "../../../../chunks/formatPrice.js";
import { T as Total } from "../../../../chunks/Total.js";
const Quantity = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => value);
  let { variant } = $$props;
  let input = null;
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  $$unsubscribe_cart();
  return `<div class="${"flex rounded-sm border border-black/10 py-1 " + escape("", true)}"><button class="mt-[-3px] px-3" data-svelte-h="svelte-1jsikq3">-</button> <input type="text" class="w-12 border-x border-black/10 text-center"${add_attribute("value", variant.quantity, 0)}${add_attribute("this", input, 0)}> <button class="mt-[-3px] px-3" data-svelte-h="svelte-151tjsf">+</button></div>`;
});
const Promo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cart, $$unsubscribe_cart;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { formatPrice: formatPrice2 } = $$props;
  let codes = [];
  if ($$props.formatPrice === void 0 && $$bindings.formatPrice && formatPrice2 !== void 0)
    $$bindings.formatPrice(formatPrice2);
  $$unsubscribe_cart();
  $$unsubscribe_lang();
  return `<div><button>+ ${escape($lang == "fr" ? "Appliquer un code promo" : "Apply promo code")}</button> ${$cart.discounts?.length > 0 ? `<div>${each($cart.discounts, (discount) => {
    return `<div class="flex w-full justify-between py-3"><div class="rounded bg-black/10 px-2.5 py-1.5">${escape(discount.code)}</div> ${discount.rule.type === "percentage" ? `<div class="font-medium">${escape(discount.rule.value)}% off
						</div>` : `<div class="font-medium">${escape(formatPrice2(discount.amount))} </div>`} </div>`;
  })}</div>` : ``} <div class="flex flex-col gap-2.5">${each(codes, (code, i) => {
    return `<div class="flex w-full items-center justify-between gap-4"><input type="text" class="w-full rounded-sm border border-black/10 px-3 py-2"${add_attribute("placeholder", $lang == "fr" ? "Code promo" : "Promo code", 0)}${add_attribute("value", code, 0)}> <button>${escape($lang == "fr" ? "Appliquer" : "Apply")}</button> </div>`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cart, $$unsubscribe_cart;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_cart();
  $$unsubscribe_lang();
  return `<div class="mb-10"><div class="mt-2 flex items-center gap-2 text-base"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="opacity-40"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg> ${validate_component(Link, "Link").$$render(
    $$result,
    {
      class: "!p-0",
      href: $lang == "fr" ? "/boutique" : "/en/shop"
    },
    {},
    {
      default: () => {
        return `${escape($lang == "fr" ? "Retour à la boutique" : "Back to shop")}`;
      }
    }
  )}</div></div> ${$cart?.items?.length > 0 ? `<div class="flex justify-between"><div class="w-2/3 pr-20"><div class="mb-14 border-b border-black/10 pb-3 text-4xl">${escape($lang == "fr" ? "Votre panier" : "Your cart")}</div> <table class="w-full">${each($cart.items, (variant) => {
    return `<tr class="${"w-full gap-5 border-b border-black/10 pt-2 " + escape(variant.loading ? "pointer-events-none opacity-40" : "", true)}">${variant.product ? `<td class="h-[80px] w-[80px] py-4"><a href="${escape($lang == "fr" ? "/boutique" : "/en/shop", true) + "/" + escape(variant.product.slug[$lang]?.current || variant.product.slug.fr.current, true)}">${validate_component(Img, "Img").$$render(
      $$result,
      {
        class: "max-h-[80px] rounded-sm",
        src: variant.product.isBook ? variant.product.book.images[0].asset.url : variant.product.imgs[0]?.url
      },
      {},
      {}
    )}</a></td> <td class="px-6 text-xl lg:w-2/5"><a href="${escape($lang == "fr" ? "/boutique" : "/en/shop", true) + "/" + escape(variant.product.slug[$lang]?.current || variant.product.slug.fr.current, true)}">${escape(variant.product.name[$lang] || variant.product.name.fr)}</a> <div class="text-base opacity-60">${escape(variant.variant_name[$lang])} </div></td> <td class="pr-6 text-right">${escape(formatPrice(variant.price))}</td> <td class="w-20"><div>${validate_component(Quantity, "Quantity").$$render($$result, { variant }, {}, {})}</div></td> <td class="text-right">${escape(formatPrice(variant.price * variant.quantity))}</td> <td class="text-right"><button class="mt-[-5px] text-2xl" data-svelte-h="svelte-1h8r6bj">×</button> </td>` : ``} </tr>`;
  })}</table></div> <div class="w-[400px] text-base"><div class="mb-14 border-b pb-3 text-4xl" data-svelte-h="svelte-uvd0cv">Total</div> <div class="divide-y"><div class="flex w-full justify-between pb-8">${validate_component(Promo, "Promo").$$render($$result, { formatPrice }, {}, {})}</div> ${validate_component(Total, "Total").$$render($$result, {}, {}, {})}</div> <div class="mt-14"><a${add_attribute(
    "href",
    $lang == "fr" ? "/boutique/validation" : "/en/shop/checkout",
    0
  )} class="rounded bg-accent px-4 py-3 text-xl font-medium text-white">${escape($lang == "fr" ? "Valider la commande" : "Checkout")}</a></div></div></div>` : `<div class="flex w-full items-center justify-center"><div><div class="mb-2 text-4xl">${escape($lang == "fr" ? "Votre panier est vide" : "Your cart is empty")}</div> <div><a class="text-2xl"${add_attribute("href", $lang == "fr" ? "/boutique" : "/en/shop", 0)}>${escape($lang == "fr" ? "Retour à la boutique" : "Back to shop")}</a></div></div></div>`}`;
});
export {
  Page as default
};
