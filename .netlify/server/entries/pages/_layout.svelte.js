import { c as create_ssr_component, s as subscribe, e as escape, b as each, v as validate_component, a as set_store_value, d as add_attribute } from "../../chunks/ssr.js";
import { p as page, n as navigating } from "../../chunks/stores.js";
import { c as cart, l as lang } from "../../chunks/store.js";
import { L as Link } from "../../chunks/Link.js";
const Cart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $$unsubscribe_navigating;
  let $cart, $$unsubscribe_cart;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let visible = false;
  let cartLen = 0;
  function updateCartLen() {
    let len = 0;
    if (!$cart?.items)
      return;
    [...$cart.items].forEach((item) => {
      len += item.quantity;
    });
    cartLen = len;
  }
  updateVisibility();
  function updateVisibility() {
    if (cartLen > 0) {
      visible = true;
      const pathname = $page.url.pathname;
      if (pathname === "/boutique/panier" || pathname === "/en/shop/cart" || pathname === "/boutique/validation" || pathname === "/en/shop/checkout") {
        visible = false;
      } else {
        visible = true;
      }
    } else {
      visible = false;
    }
  }
  {
    updateCartLen();
  }
  {
    updateVisibility();
  }
  $$unsubscribe_page();
  $$unsubscribe_navigating();
  $$unsubscribe_cart();
  $$unsubscribe_lang();
  return `<div class="fixed bottom-3 right-3 z-[200] lg:bottom-6 lg:right-8"><div style="backdrop-filter: blur(10px);" class="${"rounded bg-accent/80 shadow " + escape(
    visible ? "" : "pointer-events-none translate-x-full opacity-0",
    true
  ) + " transition duration-500 ease-in-out"}"><a href="${"/" + escape($lang == "fr" ? "boutique/panier" : "en/shop/cart", true)}" class="group text-white"><div class="flex"><div class="flex rounded fill-white px-3 py-2.5 text-xl decoration-white/40 underline-offset-4 group-hover:underline"><div>${escape($lang == "fr" ? "Voir le panier" : "See cart")}</div></div> <div class="m-1 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-black/50 text-white"><div class="text-sm">${escape(cartLen)}</div></div></div></a></div></div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  $$unsubscribe_lang();
  return `<footer class="flex w-full items-center justify-center bg-fixed bg-center px-3.5 py-36 font-light text-white" style="background-image: url(https://cdn.sanity.io/images/m60p6rsb/production/4014b7b21b17f10084323c96dd0c4b1e9596cc9a-2000x1378.jpg)"><div class="flex max-w-[460px] flex-col"><div class="mb-8 w-full"><div class="mb-2 text-2xl">${escape($lang == "fr" ? `Inscrivez-vous pour rester à l'affut des nouveautés` : `Sign up to stay up to date`)}</div> <input type="text" class="w-full rounded bg-white/40 p-2 px-3 text-xl text-black placeholder-black/70" placeholder="email"></div> <div class="border-white-20 w-fit border-b text-base">© ${escape(year)} Marisol Sarrazin</div> <div class="mt-3 text-base" data-svelte-h="svelte-tyl4yj">Toutes les illustrations de ce site sont protégées par le droit d’auteur.
			Toute reproduction ou utilisation sans permission est strictement
			interdite. Le droit d’auteur et le droit de reproduction ne sont pas
			transférés avec la vente d’œuvres d’art.</div></div></footer>`;
});
const links = [
  {
    fr: {
      name: "Portfolio",
      href: "/portfolio"
    },
    en: {
      name: "Portfolio",
      href: "/portfolio"
    }
  },
  {
    fr: {
      name: "Livres",
      href: "/livres"
    },
    en: {
      name: "Books",
      href: "/books"
    }
  },
  {
    fr: {
      name: "Animations",
      href: "/animations"
    },
    en: {
      name: "Workshop",
      href: "/workshop"
    }
  },
  {
    fr: {
      name: "À propos",
      href: "/a-propos"
    },
    en: {
      name: "About",
      href: "/about"
    }
  },
  {
    fr: {
      name: "Boutique",
      href: "/boutique"
    },
    en: {
      name: "Shop",
      href: "/shop"
    }
  },
  {
    fr: {
      name: "Contact",
      href: "/contact"
    },
    en: {
      name: "Contact",
      href: "/contact"
    }
  }
];
const HeaderLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { activeLinkIndex, data } = $$props;
  const maped = links.map((link, i) => {
    if (link.fr.href == "/portfolio") {
      link.children = data.portfolio.children.map((branch) => {
        return {
          fr: {
            href: `/portfolio/#${branch.slug.fr.current}`,
            name: branch.name.fr
          },
          en: {
            href: `/en/portfolio/#${branch.slug.en.current}`,
            name: branch.name.en
          }
        };
      });
    }
    if (link.fr.href == "/boutique") {
      link.children = data.shop.branches.map((branch) => {
        return {
          fr: {
            href: `/boutique#${branch.slug.fr.current}`,
            name: branch.name.fr
          },
          en: {
            href: `/en/shop#${branch.slug.en.current}`,
            name: branch.name.en
          }
        };
      });
    }
    return link;
  });
  if ($$props.activeLinkIndex === void 0 && $$bindings.activeLinkIndex && activeLinkIndex !== void 0)
    $$bindings.activeLinkIndex(activeLinkIndex);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_lang();
  return `<div class="flex flex-col gap-1 whitespace-nowrap text-2xl lg:flex-row lg:gap-5 lg:text-xl">${each(maped, (link, i) => {
    return `<div class="group relative py-1">${validate_component(Link, "Link").$$render(
      $$result,
      {
        active: activeLinkIndex == i,
        class: "z-10 flex items-center gap-1",
        href: ($lang == "en" ? "/en" : "") + link[$lang].href
      },
      {},
      {
        default: () => {
          return `${escape(link[$lang].name)} ${link.children?.length > 0 ? `<div class="mt-1 hidden lg:inline" data-svelte-h="svelte-1ywsiqo"><svg class="h-6 w-6 -rotate-180 fill-none transition duration-300 ease-in-out group-hover:-rotate-90" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="stroke-black/30" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6"></path></svg> </div>` : ``} `;
        }
      }
    )} ${link.children?.length > 0 ? `<div style="backdrop-filter: blur(10px);" class="shadow-b pointer-events-none absolute top-[100%] hidden translate-y-[-10px] flex-col gap-1 rounded-md bg-white/80 px-2.5 pb-2 opacity-0 transition-all duration-500 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 lg:flex lg:pt-2.5">${each(link.children, (child, i2) => {
      return `${validate_component(Link, "Link").$$render($$result, { href: child[$lang].href }, {}, {
        default: () => {
          return `${escape(child[$lang].name)}`;
        }
      })}`;
    })} </div>` : ``} </div>`;
  })}</div>`;
});
const Lang = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fr_href;
  let en_href;
  let $page, $$unsubscribe_page;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { activeLinkIndex } = $$props;
  if ($$props.activeLinkIndex === void 0 && $$bindings.activeLinkIndex && activeLinkIndex !== void 0)
    $$bindings.activeLinkIndex(activeLinkIndex);
  set_store_value(
    lang,
    $lang = $page.url.pathname.includes("/en/") || $page.url.pathname == "/en" ? "en" : "fr",
    $lang
  );
  fr_href = activeLinkIndex == -1 ? "/" : $lang == "en" ? links[activeLinkIndex]?.fr?.href : $page.url.pathname.replace("/en", "");
  en_href = activeLinkIndex == -1 ? "" : $lang == "fr" ? links[activeLinkIndex]?.en?.href : $page.url.pathname.replace("/en", "");
  $$unsubscribe_page();
  $$unsubscribe_lang();
  return `<div class="flex gap-6 text-2xl lg:text-xl">${validate_component(Link, "Link").$$render($$result, { href: fr_href, active: $lang == "fr" }, {}, {
    default: () => {
      return `Fr`;
    }
  })} ${validate_component(Link, "Link").$$render(
    $$result,
    {
      href: "/en" + en_href,
      active: $lang == "en"
    },
    {},
    {
      default: () => {
        return `En`;
      }
    }
  )}</div>`;
});
const Toggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { menuOpen } = $$props;
  if ($$props.menuOpen === void 0 && $$bindings.menuOpen && menuOpen !== void 0)
    $$bindings.menuOpen(menuOpen);
  return `<div class="${"relative flex h-5 w-7 flex-col items-end justify-between [&>div]:bg-accent " + escape(menuOpen ? "translate-x-[-3px] translate-y-[-2px]" : "", true) + " transition duration-500 ease-in-out"}"><div class="${"h-[2px] w-full rounded " + escape(menuOpen ? "-rotate-45 scale-x-[1.3] " : "", true) + " origin-top-right transition-all duration-500 ease-in-out"}"></div> <div class="${"h-[2px] w-full rounded " + escape(menuOpen ? "translate-x-full opacity-0" : "", true) + " transition-all duration-500 ease-in-out"}"></div> <div class="${"h-[2px] rounded " + escape(
    menuOpen ? "translate-y-[7px] rotate-45 scale-x-[1.3]" : "scale-x-[0.8]",
    true
  ) + " w-full origin-bottom-right transition-all duration-500 ease-in-out"}"></div></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let big;
  let activeLinkIndex;
  let $navigating, $$unsubscribe_navigating;
  let $page, $$unsubscribe_page;
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  let { data } = $$props;
  let dom = {};
  let topPage = true;
  let menuOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if ($navigating) {
      menuOpen = false;
    }
  }
  big = topPage;
  activeLinkIndex = links.findIndex((link) => link.fr.href == $page.url.pathname || link.en.href == $page.url.pathname.replace("/en", ""));
  $$unsubscribe_navigating();
  $$unsubscribe_page();
  $$unsubscribe_lang();
  return `<div class="${"pointer-events-none fixed inset-0 z-10 bg-black/70 " + escape(menuOpen ? "" : "opacity-0 delay-100", true) + " transition-all duration-500 ease-in-out"}"></div> <header style="backdrop-filter: blur(6px)" class="${"fixed left-0 top-0 z-[200] w-full " + escape(big ? "h-[160px]" : "h-[54px] shadow lg:h-[60px]", true) + " " + escape(
    menuOpen ? "!h-[100%] bg-white/80 " : "",
    true
  ) + " pointer-events-none transition-all duration-500 ease-in-out"}"${add_attribute("this", dom.header, 0)}><div class="${"flex h-[100lvh] w-full flex-col gap-6 font-light lg:h-[auto] lg:flex-row lg:gap-1 " + escape(big ? "" : "lg:translate-y-[-10px]", true) + " " + escape(menuOpen ? "" : "", true) + " transition duration-500 ease-in-out"}"><div class="relative z-10 z-20 flex w-full justify-between px-3.5 md:pl-8 xl:pl-16 2xl:pl-28"><div class="group pointer-events-auto flex w-full justify-between lg:w-[auto] lg:justify-start"><a${add_attribute("href", $lang == "fr" ? "/" : "/en", 0)} class="flex flex-col gap-1 whitespace-nowrap pt-3 lg:gap-2 lg:pt-5"><div style="" class="${"text-2xl text-accent lg:text-3xl " + escape(big ? "" : "scale-y-[2]-", true) + " origin-top transition duration-500 ease-in-out"}">Marisol Sarrazin</div> <div class="${"text- text-sm text-stone-400 lg:text-base " + escape(big ? "" : "scale-[0] opacity-0", true) + " origin-top-left transition duration-500 ease-in-out"}">ART / DESIGN</div></a> <a${add_attribute("href", $lang == "fr" ? "/" : "/en", 0)} class="${"relative mr-2 w-[80px] select-none transition duration-500 ease-in-out lg:mr-0 2xl:w-[100px] " + escape(
    big ? "" : "-translate-y-[120%] rotate-[-20deg] scale-[0.7] opacity-0",
    true
  )}"><img src="/girafe2.png" class="absolute w-full origin-top-right object-cover transition duration-300 ease-in-out group-hover:lg:translate-y-[-3%] group-hover:lg:rotate-[-5deg] group-hover:lg:scale-[1.1]" alt="Welcome"></a></div> <div class="${"lg:hidden " + escape(big ? "" : "scale-y-[2]-", true) + " origin-top transition duration-500 ease-in-out"}"><button class="pointer-events-auto p-1 focus:outline-none">${validate_component(Toggle, "Toggle").$$render($$result, { menuOpen }, {}, {})}</button></div></div> <div class="${"bg-white/90- pointer-events-none ml-6 flex h-full flex-col items-start justify-start gap-8 px-3.5 pt-4 md:gap-2 md:pr-8 lg:ml-0 lg:h-[auto] lg:items-end lg:bg-transparent xl:pr-16 2xl:pr-28 " + escape(
    menuOpen ? "" : "translate-y-[-50px] opacity-0 lg:translate-y-0 lg:opacity-100",
    true
  ) + " transition duration-500 ease-in-out"}"><div class="${"lg:pointer-events-auto " + escape(big ? "" : "lg:scale-[0] lg:opacity-0", true) + " " + escape(menuOpen ? "pointer-events-auto" : "", true) + " order-[2] origin-top-right transition duration-500 ease-in-out lg:order-[unset]"}">${validate_component(Lang, "Lang").$$render($$result, { activeLinkIndex }, {}, {})}</div> <div class="${"lg:pointer-events-auto " + escape(
    big ? "" : "opacity-0 lg:translate-y-[-42px] lg:opacity-100",
    true
  ) + " " + escape(menuOpen ? "pointer-events-auto" : "", true) + " mt-24 origin-bottom transition duration-500 ease-in-out lg:mt-0"}">${validate_component(HeaderLinks, "HeaderLinks").$$render($$result, { activeLinkIndex, data }, {}, {})}</div> <div class="${"lg:pointer-events-auto " + escape(big ? "" : "lg:scale-[0] lg:opacity-0", true) + " " + escape(menuOpen ? "pointer-events-auto" : "", true) + " order-[3] origin-top-right transition duration-500 ease-in-out"}"><a class="mt-2" href="https://www.instagram.com/marisolsarrazin/" target="_blank" data-svelte-h="svelte-1z09xer"><img class="h-[26px] w-[26px]" src="/instagram.png"></a></div></div></div></header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  let { data } = $$props;
  if (data.cart)
    set_store_value(cart, $cart = data.cart, $cart);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_cart();
  return `<div class="app tracking-[0.01rem] text-stone-700">${validate_component(Header, "Header").$$render($$result, { data }, {}, {})} ${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})} <main class="mx-3.5 mb-44 mt-44 min-h-[100lvh] font-light md:mx-8 lg:mt-44 xl:mx-16 2xl:mx-28 min-[2000px]:mx-auto min-[2000px]:max-w-[2000px]">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
