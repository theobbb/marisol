import { c as create_ssr_component, s as subscribe, e as escape, b as each, v as validate_component } from "../../../../chunks/ssr.js";
import { I as Img } from "../../../../chunks/Img.js";
import { L as LightBox } from "../../../../chunks/LightBox.js";
import { S as SanityTextBlock } from "../../../../chunks/SanityTextBlock.js";
import { l as lang } from "../../../../chunks/store.js";
const SerieRelated = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let serie;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  serie = data.series.find((s) => s.books.some((b) => b._ref === data._id));
  $$unsubscribe_lang();
  return `<div>${serie ? `<div class="mb-8 text-2xl lg:text-4xl"><span class="mr-1 opacity-60">${escape($lang == "fr" ? "Autres livres de" : "Other books from")}</span> <a href="${escape($lang == "fr" ? "/livres" : "/en/books", true) + "#" + escape(serie.slug[$lang]?.current || serie.slug.fr.current, true)}">${escape(serie.name[$lang] || serie.name.fr)}</a></div> <div class="relative h-[100px] overflow-y-hidden overflow-x-scroll md:h-[200px]"><div class="absolute left-0 top-0 flex h-full w-full" style="${"width: " + escape(200 * serie.books.length, true) + "px"}">${each(serie.books, (bookRef) => {
    let book = data.books.find((b) => b._id === bookRef._ref);
    return ` ${book ? `<div class="${"mr-3.5 h-[100px] w-[100px] md:h-[200px] md:w-[200px] " + escape(book._id == data._id ? "opacity-30" : "", true)}"><a class="relative h-full w-full" href="${escape($lang == "fr" ? "/livres" : "/en/books", true) + "/" + escape(book.slug[$lang]?.current || book.slug.fr.current, true)}">${validate_component(Img, "Img").$$render(
      $$result,
      {
        src: book.images[0].asset.url,
        class: "rounded-sm",
        alt: ($lang == "fr" ? "Livre" : "Book") + " - " + (book.name[$lang] || book.name.fr)
      },
      {},
      {}
    )}</a> </div>` : ``}`;
  })}</div></div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data, slug } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  $$unsubscribe_lang();
  return ` <div>${validate_component(LightBox, "LightBox").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="mb-10 text-5xl">${escape(data.name[$lang] || data.name.fr)}</div> <div class="flex flex-col lg:flex-row"><div class="relative lg:w-1/4"><div class="sticky top-24">${validate_component(Img, "Img").$$render(
        $$result,
        {
          src: data.images[0].asset.url,
          class: " rounded-sm",
          alt: ($lang == "fr" ? "Livre" : "Book") + " - " + (data.name[$lang] || data.name.fr)
        },
        {},
        {}
      )}</div></div> <div class="flex w-full flex-col lg:ml-3.5"><div class="mb-8 mt-14 max-w-[700px] lg:ml-6">${validate_component(SanityTextBlock, "SanityTextBlock").$$render($$result, { blocks: data.text[$lang] || data.text.fr }, {}, {})}</div> <div class="mt-6 gap-3.5 lg:mt-0 lg:columns-[2]">${each(data.images, (image, i) => {
        return `${i != 0 ? `<div class="">${validate_component(Img, "Img").$$render(
          $$result,
          {
            lightbox: true,
            lazy: true,
            src: image.asset.url,
            class: "mb-3.5 rounded-sm",
            alt: ($lang == "fr" ? "Livre" : "Book") + " - " + (data.name[$lang] || data.name.fr)
          },
          {},
          {}
        )} </div>` : ``}`;
      })}</div></div></div> <div class="mt-24 max-w-[500px]">${validate_component(SanityTextBlock, "SanityTextBlock").$$render(
        $$result,
        {
          blocks: data.infos[$lang] || data.infos.fr,
          class: ""
        },
        {},
        {}
      )}</div>`;
    }
  })}</div> <div class="mt-36">${validate_component(SerieRelated, "SerieRelated").$$render($$result, { data }, {}, {})}</div>`;
});
export {
  Page as default
};
