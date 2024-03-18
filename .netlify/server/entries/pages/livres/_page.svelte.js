import { c as create_ssr_component, s as subscribe, v as validate_component, e as escape, b as each, d as add_attribute } from "../../../chunks/ssr.js";
import { I as Img } from "../../../chunks/Img.js";
import { L as Link } from "../../../chunks/Link.js";
import { l as lang } from "../../../chunks/store.js";
import { S as SanityTextBlock } from "../../../chunks/SanityTextBlock.js";
const Book = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `<div class="relative flex w-full flex-col lg:flex-row"><div class="relative lg:w-1/2"><div class="top-24 flex flex-col lg:sticky lg:pr-24">${validate_component(Link, "Link").$$render(
    $$result,
    {
      class: "mb-3 !px-0 !py-0 text-4xl lg:text-5xl",
      href: ($lang == "fr" ? "/livres" : "/en/books") + "/" + (data.slug[$lang]?.current || data.slug.fr.current)
    },
    {},
    {
      default: () => {
        return `${escape(data.name[$lang] || data.name.fr)}`;
      }
    }
  )} <div class="mt-8 max-w-[600px] lg:mt-16">${validate_component(SanityTextBlock, "SanityTextBlock").$$render($$result, { blocks: data.text[$lang] }, {}, {})}</div> <div class="mb-12 mt-8">${validate_component(Link, "Link").$$render(
    $$result,
    {
      button: true,
      href: ($lang == "fr" ? "/livres" : "/en/books") + "/" + (data.slug[$lang]?.current || data.slug.fr.current),
      class: " text-xl"
    },
    {},
    {
      default: () => {
        return `${escape($lang == "fr" ? "Voir le livre" : "See the book")}`;
      }
    }
  )}</div></div></div> <div class="flex justify-end lg:w-1/2"><a href="${escape($lang == "fr" ? "/livres" : "/en/books", true) + "/" + escape(data.slug[$lang]?.current || data.slug.fr.current, true)}">${validate_component(Img, "Img").$$render(
    $$result,
    {
      src: data.images[0].asset.url,
      class: "max-h-[54vh] rounded-sm",
      alt: ($lang == "fr" ? "Livres" : "Books") + " - " + data.name[$lang]
    },
    {},
    {}
  )}</a></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `<div class="flex flex-col gap-28 lg:gap-36">${each(data.content, (item, i) => {
    return `${item._type == "book" ? `${validate_component(Book, "Book").$$render($$result, { data: item }, {}, {})}` : `${item._type == "serie" ? `<div class="flex scroll-mt-24 flex-col lg:flex-row"${add_attribute("id", item.slug[$lang]?.current || item.slug.fr.current, 0)}><div class="relative mb-6 lg:mb-0 lg:w-1/4"><div class="sticky top-24 flex w-full flex-wrap items-center justify-between gap-4 pr-8 lg:w-[auto] lg:flex-col lg:items-start lg:justify-start"><div class="mb-4 text-4xl lg:mb-12 lg:text-5xl">${escape(item.name[$lang] || item.name.fr)}</div> <div class="">${validate_component(Link, "Link").$$render(
      $$result,
      {
        href: "#" + (item.slug[$lang]?.current || item.slug.fr.current),
        button: true,
        class: "px-0 py-0 text-xl"
      },
      {},
      {
        default: () => {
          return `${escape($lang == "fr" ? item.serieFullDisplay ? "- Réduire la série" : "+ Afficher la série" : item.serieFullDisplay ? "- Reduce the serie" : "+ Show the serie")} `;
        }
      }
    )}</div> </div></div> ${item.serieFullDisplay ? `<div class="flex flex-col gap-36 lg:w-3/4">${each(item.books, (book) => {
      return `${validate_component(Book, "Book").$$render($$result, { data: book }, {}, {})}`;
    })} </div>` : `<div class="grid grid-cols-2 gap-3.5 lg:w-3/4 lg:grid-cols-3">${each(item.books, (book) => {
      return `<div><a class="relative" href="${escape($lang == "fr" ? "/livres" : "/en/books", true) + "/" + escape(book.slug[$lang]?.current || book.slug.fr.current, true)}">${validate_component(Img, "Img").$$render(
        $$result,
        {
          src: book.images[0].asset.url,
          class: "rounded-sm",
          alt: ($lang == "fr" ? "Livre" : "Book") + " - " + book.name[$lang]
        },
        {},
        {}
      )}</a> </div>`;
    })} </div>`} </div>` : ``}`}`;
  })}</div>`;
});
export {
  Page as default
};
