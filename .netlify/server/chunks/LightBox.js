import { c as create_ssr_component, s as subscribe, d as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import { l as lang } from "./store.js";
import { L as Link } from "./Link.js";
const LightBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  let active = -1;
  let dom = {};
  let book = null;
  let serie = null;
  function updateCaption() {
    const img = images[active];
    if (!img)
      return;
    const book_ref = img.getAttribute("book");
    if (book_ref) {
      book = data.books.find((book2) => book2._id === book_ref);
      if (!book)
        return;
      serie = book.serie;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  images = [];
  {
    updateCaption();
  }
  $$unsubscribe_lang();
  return ` <div${add_attribute("this", dom.imgs, 0)}>${slots.default ? slots.default({}) : ``}</div> <dialog${add_attribute("this", dom.dialog, 0)}><div class="fixed bottom-3 left-3.5 right-3.5 top-2.5 text-white lg:bottom-4 lg:left-6 lg:right-6 lg:top-4"><button class="absolute left-0 top-0 h-full w-full select-none"></button> <div class="absolute left-0 top-0 z-[100]"><div class="text-xl">${escape(active + 1)} / ${escape(images.length)}</div></div> <button class="absolute right-0 top-0 z-[200] text-white" data-svelte-h="svelte-1285k15"><svg class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="stroke-white/90 hover:fill-white/100" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <div class="absolute left-0 top-0 h-full"><button class="flex h-full items-end xl:items-center" data-svelte-h="svelte-dnv0ca"><svg class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="stroke-white/90" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6"></path></svg></button></div> <div class="absolute right-0 top-0 h-full"><button class="flex h-full items-end xl:items-center" data-svelte-h="svelte-l6dzhf"><svg class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="stroke-white/90" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"></path></svg></button></div> <div class="pointer-events-none absolute bottom-0 left-0 flex w-full justify-center"><div class="pointer-events-auto flex flex-col items-baseline gap-1 text-2xl text-lg md:flex-row md:gap-2">${book ? `<div class="text-base opacity-40">${escape($lang == "fr" ? "Tiré du livre" : "From the book")}:</div> <div class="">${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: ($lang == "fr" ? "/livres" : "/en/books") + "/" + (book.slug[$lang]?.current || book.slug.fr.current),
      class: "!px-0 decoration-white/40"
    },
    {},
    {
      default: () => {
        return `${escape(book.name[$lang] || book.name.fr)}`;
      }
    }
  )}</div> ${serie ? `<div class="hidden md:inline" data-svelte-h="svelte-ew7vh8">-</div> <div class="">${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: ($lang == "fr" ? "/livres" : "/en/books") + "#" + (serie.slug[$lang]?.current || serie.slug.fr.current),
      class: "!px-0 decoration-white/40"
    },
    {},
    {
      default: () => {
        return `${escape(serie.name[$lang])}`;
      }
    }
  )}</div>` : ``}` : ``}</div></div></div> ${``} </dialog>`;
});
export {
  LightBox as L
};
