import { c as create_ssr_component, s as subscribe, e as escape } from "./ssr.js";
import { l as lang, c as cart } from "./store.js";
import { f as formatPrice } from "./formatPrice.js";
const Total = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_lang();
  $$unsubscribe_cart();
  return `<div class="divide-y"><div class="flex w-full justify-between py-3"><div>${escape($lang == "fr" ? "Sous-total" : "Subtotal")}</div> <div class="font-medium">${escape(formatPrice($cart.subtotal))}</div></div> <div class="flex w-full justify-between py-3"><div>${escape($lang == "fr" ? "Livraison" : "Shipping")}</div> <div class="font-medium">${escape(formatPrice(0))}</div></div> <div class="flex w-full justify-between py-3"><div data-svelte-h="svelte-zzga8n">Taxes</div> <div class="font-medium">${escape(formatPrice(0))}</div></div> <div class="flex w-full justify-between pt-3 text-xl font-medium"><div data-svelte-h="svelte-1cf7gfk">Total</div> <div class="">${escape(formatPrice($cart.subtotal))}</div></div></div>`;
});
export {
  Total as T
};
