import { c as create_ssr_component, s as subscribe, v as validate_component, e as escape, b as each } from "../../../../chunks/ssr.js";
import { I as Img } from "../../../../chunks/Img.js";
import { L as Link } from "../../../../chunks/Link.js";
import { c as cart, l as lang } from "../../../../chunks/store.js";
import { S as SanityTextBlock } from "../../../../chunks/SanityTextBlock.js";
import { f as formatPrice } from "../../../../chunks/formatPrice.js";
import { L as LightBox } from "../../../../chunks/LightBox.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let match;
  let $$unsubscribe_cart;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_cart = subscribe(cart, (value) => value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  console.log(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  match = data.match;
  $$unsubscribe_cart();
  $$unsubscribe_lang();
  return `<div class="mb-8">${validate_component(Link, "Link").$$render(
    $$result,
    {
      class: "flex items-center gap-2 !px-0 !py-0",
      href: $lang == "fr" ? "/boutique" : "/en/shop"
    },
    {},
    {
      default: () => {
        return `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="opacity-40"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg> <div>${escape($lang == "fr" ? "Retour à la boutique" : "Back to shop")}</div>`;
      }
    }
  )}</div> <div class="border-b pb-10"><div class="relative flex"><div class="relative lg:w-1/2"><div class="sticky top-36"><div class="text-4xl">${data.match.isBook ? `${validate_component(Link, "Link").$$render(
    $$result,
    {
      class: "!p-0",
      href: ($lang == "fr" ? "/livres" : "/en/books") + "/" + (data.match.book.slug[$lang]?.current || data.match.book.slug.fr.current)
    },
    {},
    {
      default: () => {
        return `${escape(data.match.name[$lang] || data.match.name.fr)}`;
      }
    }
  )}` : `${escape(data.match.name[$lang] || data.match.name.fr)}`}</div> <div class="mt-2">${validate_component(Link, "Link").$$render(
    $$result,
    {
      class: "!p-0",
      href: data.match.branch.slug[$lang]?.current || data.match.branch.slug.fr.current
    },
    {},
    {
      default: () => {
        return `${escape(data.match.branch.name[$lang] || data.match.branch.name.fr)}`;
      }
    }
  )}</div> <div class="mt-16"><div>${match.description?.fr ? `${validate_component(SanityTextBlock, "SanityTextBlock").$$render(
    $$result,
    {
      class: "",
      blocks: data.match.description[$lang] || data.match.description?.fr
    },
    {},
    {}
  )}` : ``}</div></div> <div class="${"mt-32 " + escape("", true)}">${each(data.match.variants, (variant) => {
    return `<div class="mb-12"><div class="text-lg"><div class="font-medium">${escape(formatPrice(variant.price))}</div> <div class="text-black/50">${escape(variant.variant.name[$lang] || variant.variant.name.fr)}</div> <button class="mt-2 rounded rounded-sm bg-accent px-3 py-1.5 text-lg font-medium text-white decoration-white/50 underline-offset-4 hover:underline">${escape($lang == "fr" ? "Ajouter au panier" : "Add to cart")} </button></div> </div>`;
  })}</div></div></div> <div class="lg:w-1/2">${validate_component(LightBox, "LightBox").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="mb-4">${validate_component(Img, "Img").$$render(
        $$result,
        {
          class: "rounded-sm",
          src: data.match.isBook ? data.match.book?.images[0].asset.url : data.match.imgs[0].url
        },
        {},
        {}
      )}</div> <div class="columns-2 gap-4">${each(
        data.match.isBook ? data.match.book?.images : data.match.imgs,
        (img, i) => {
          return `${i != 0 ? `<div class="mb-4">${validate_component(Img, "Img").$$render($$result, { class: "rounded-sm", src: img.asset.url }, {}, {})} </div>` : ``}`;
        }
      )}</div>`;
    }
  })}</div></div></div> <div class="flex w-full flex-col justify-between gap-8 lg:flex-row">${!data.match.isBook && data.match.book ? `<div class="mt-16"><div class="text-xl"><div class="pb mr-2 w-fit border-b opacity-60">${escape($lang == "fr" ? "Tiré du livre" : "From the book")}</div> <div class="mt-4"><a href="${escape($lang == "fr" ? "/livres" : "/en/books", true) + "/" + escape(data.match.book.slug[$lang].current, true)}"><div class="mb-2">${escape(data.match.book.name[$lang])}</div> <div class="w-[200px]">${validate_component(Img, "Img").$$render(
    $$result,
    {
      class: "rounded-sm",
      src: data.match.book.images[0].asset.url
    },
    {},
    {}
  )}</div></a></div></div></div>` : ``} <div class="w-[400px]">${validate_component(SanityTextBlock, "SanityTextBlock").$$render(
    $$result,
    {
      class: "mt-16",
      blocks: data.match.branch.description[$lang] || data.match.branch.description?.fr
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
