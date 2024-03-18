import { c as create_ssr_component, g as spread, h as escape_object, i as escape_attribute_value, e as escape, s as subscribe, v as validate_component, b as each, d as add_attribute } from "../../../chunks/ssr.js";
import { I as Img } from "../../../chunks/Img.js";
import { L as Link } from "../../../chunks/Link.js";
import { l as lang } from "../../../chunks/store.js";
import { L as LightBox } from "../../../chunks/LightBox.js";
import { S as SanityTextBlock } from "../../../chunks/SanityTextBlock.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href = "", active } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  return `<button${spread(
    [
      escape_object($$props),
      { href: escape_attribute_value(href) },
      {
        class: "rounded bg-black/10 px-2 py-0.5 font-light " + escape(active ? "bg-black/10 " : "", true) + " " + escape($$props.class, true)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>`;
});
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  let actives = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `<div class="mb-16 flex w-full flex-wrap items-end justify-between border-b border-black/10 pb-4 xl:mb-6">${slots.default ? slots.default({}) : ``} <div>${validate_component(Button, "Button").$$render($$result, { class: " text-xl" }, {}, {
    default: () => {
      return `${escape($lang == "fr" ? "+ Voir plus" : "+ See more")}`;
    }
  })}</div></div> ${`${validate_component(LightBox, "LightBox").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="relative flex items-center"><div class="absolute left-0 top-0 z-20 flex h-full items-start xl:-translate-x-full xl:items-center"><button class="translate-y-[calc(-100%-16px)] xl:translate-y-0 xl:pr-3 2xl:pr-6" data-svelte-h="svelte-17sgh8y"><svg class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="fill-none stroke-black/90" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6"></path></svg></button></div> <div class="relative flex h-[400px] w-full flex-col items-center justify-between gap-6 overflow-hidden lg:flex-row">${each(data, (img, i) => {
        let visible = actives.includes(i);
        return ` <div class="${"mb-4 flex h-full flex-col justify-center " + escape(visible ? "" : "hidden", true)}" style="${"order: " + escape(actives.indexOf(i), true)}">${validate_component(Img, "Img").$$render(
          $$result,
          {
            src: img.asset.url,
            class: "max-h-[400px] rounded-sm object-contain object-center"
          },
          {},
          {}
        )} </div>`;
      })}</div> <div class="absolute right-0 top-0 z-20 flex h-full items-start xl:translate-x-full xl:items-center"><button class="translate-y-[calc(-100%-16px)] xl:translate-y-0 xl:pl-3 2xl:pl-6" data-svelte-h="svelte-1s5vwvl"><svg class="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="fill-none stroke-black/90" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"></path></svg></button></div></div>`;
    }
  })}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  let bg_img = null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return ` <div class="${escape("opacity-0", true) + " transition duration-500"}"><div class="relative -mx-3.5 h-[30vh] w-[100vw] bg-fixed bg-[35%_0%] bg-no-repeat brightness-[1.1] saturate-[1.25] md:-mx-8 lg:h-[50vh] xl:-mx-16 2xl:-mx-28" style="${"background-image: url(" + escape(data.atelier.asset.url, true) + ")"}"${add_attribute("this", bg_img, 0)}></div></div> ${validate_component(Carousel, "Carousel").$$render($$result, { data: data.imgs_atelier }, {}, {
    default: () => {
      return `<div class="mt-12 text-3xl md:text-5xl">${escape($lang == "fr" ? "L’atelier" : "The workshop")}</div>`;
    }
  })} ${validate_component(Carousel, "Carousel").$$render($$result, { data: data.imgs_dessin }, {}, {
    default: () => {
      return `<div class="mt-16 text-3xl md:text-5xl">${escape($lang == "fr" ? "Le dessin" : "The drawing")}</div>`;
    }
  })} <div class="mt-20 flex w-full items-end justify-between border-b border-black/10 pb-4 text-3xl md:text-5xl"><div>${escape($lang == "fr" ? "Biographie" : "Biography")}</div> <div>${validate_component(Link, "Link").$$render(
    $$result,
    {
      button: true,
      href: "#bio",
      class: "mb-8 text-xl"
    },
    {},
    {
      default: () => {
        return `${escape(data.bioOpen ? $lang == "fr" ? "- Réduire" : "- Reduce" : $lang == "fr" ? "+ Voir plus" : "+ See more")}`;
      }
    }
  )}</div></div> <div id="bio" class="${"mt-6 flex w-full scroll-mt-48 flex-col justify-start gap-10 lg:mt-16 lg:flex-row lg:gap-24 " + escape(data.bioOpen ? "" : "h-[400px] overflow-hidden", true)}"><div${add_attribute(
    "class",
    data.bioOpen ? "" : "h-[180px] brightness-[1.3] contrast-[0.8] grayscale lg:h-[auto]",
    0
  )}>${validate_component(Img, "Img").$$render(
    $$result,
    {
      src: data.bio.img.asset.url,
      class: "max-h-full  max-w-full rounded-lg "
    },
    {},
    {}
  )}</div> <div class="relative">${validate_component(SanityTextBlock, "SanityTextBlock").$$render(
    $$result,
    {
      class: " [&_p]:max-w-[600px]",
      blocks: data.bio[$lang]
    },
    {},
    {}
  )} <div class="${"pointer-events-none absolute bottom-0 right-0 h-[100px] w-full bg-gradient-to-b from-transparent to-white " + escape(data.bioOpen ? "hidden" : "", true)}"></div></div></div> <div class="mb-16 mt-28 flex w-full flex-col justify-between border-b border-black/10 pb-4 text-3xl md:text-5xl lg:flex-row lg:items-end"><div>${escape($lang == "fr" ? "Prix et mentions" : "Awards and mentions")}</div> <div>${validate_component(Link, "Link").$$render(
    $$result,
    {
      button: true,
      href: "#mentions",
      class: "text-xl"
    },
    {},
    {
      default: () => {
        return `${escape(data.mentionsOpen ? $lang == "fr" ? "- Réduire" : "- Reduce" : $lang == "fr" ? "+ Voir plus" : "+ See more")}`;
      }
    }
  )}</div></div> <div id="mentions" class="${"relative grid scroll-mt-64 grid-cols-1 gap-16 overflow-hidden md:grid-cols-2 lg:gap-24 xl:grid-cols-3 [&_strong]:text-2xl [&_strong]:lg:text-3xl " + escape(data.mentionsOpen ? "" : "h-[180px]", true) + " transition-all duration-500 ease-in-out"}">${each(data.mentions, (mention) => {
    return `<div class="max-w-[400px]">${validate_component(SanityTextBlock, "SanityTextBlock").$$render($$result, { blocks: mention[$lang] }, {}, {})}</div>`;
  })} <div class="${"absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-b from-transparent to-white " + escape(data.mentionsOpen ? "hidden" : "", true)}"></div></div> <div class="mb-16 mt-28 flex w-full flex-col justify-between border-b border-black/10 pb-4 text-3xl md:text-5xl lg:flex-row lg:items-end"><div>${escape($lang == "fr" ? "Bibliographie" : "Bibliography")}</div> <div>${validate_component(Link, "Link").$$render(
    $$result,
    {
      button: true,
      href: "#mentions",
      class: "text-xl"
    },
    {},
    {
      default: () => {
        return `${escape(data.biblioOpen ? $lang == "fr" ? "- Réduire" : "- Reduce" : $lang == "fr" ? "+ Voir plus" : "+ See more")}`;
      }
    }
  )}</div></div> <div id="biblio" class="${"relative grid scroll-mt-64 grid-cols-1 gap-16 overflow-hidden md:grid-cols-2 lg:gap-24 xl:grid-cols-3 [&_strong]:text-2xl [&_strong]:lg:text-3xl " + escape(data.biblioOpen ? "" : "h-[180px]", true) + " transition-all duration-500 ease-in-out"}">${each(data.biblio, (item) => {
    return `<div class="max-w-[400px]">${validate_component(SanityTextBlock, "SanityTextBlock").$$render($$result, { blocks: item[$lang] }, {}, {})}</div>`;
  })} <div class="${"absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-b from-transparent to-white " + escape(data.biblioOpen ? "hidden" : "", true)}"></div></div>`;
});
export {
  Page as default
};
