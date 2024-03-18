import { c as create_ssr_component, s as subscribe, e as escape, d as add_attribute } from "../../../chunks/ssr.js";
import { l as lang } from "../../../chunks/store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $lang, $$unsubscribe_lang;
  $$unsubscribe_lang = subscribe(lang, (value) => $lang = value);
  $$unsubscribe_lang();
  return `<div class="m-auto text-xl md:w-[500px]"><div class="mb-8"><div class="mb-3 text-3xl">${escape($lang == "fr" ? "Contactez Marisol" : "Contact Marisol")}</div> <div class="text-base text-stone-400">${escape($lang == "fr" ? `Pour toute question ou demande particulière, veuillez remplir ce formulaire.` : `For any question or special request, please fill out this form. `)}</div></div> <form class=""><div class="divide-y rounded-sm border"><div><input class="w-full px-3 py-3 outline-none" type="text"${add_attribute("placeholder", $lang == "fr" ? "Nom" : "Name", 0)}></div> <div><input class="w-full px-3 py-3 outline-none" type="email"${add_attribute("placeholder", $lang == "fr" ? "Adresse courriel" : "Email address", 0)}></div> <div><input class="w-full px-3 py-3 outline-none" type="text"${add_attribute("placeholder", $lang == "fr" ? "Objet" : "Object", 0)}></div> <div><textarea class="w-full px-3 py-3 outline-none"${add_attribute("placeholder", $lang == "fr" ? "Message" : "Message", 0)}></textarea></div></div> <div class="mt-6 flex w-full justify-end"><button class="rounded bg-accent px-3 py-2 font-medium tracking-wide text-white" type="submit">${escape($lang == "fr" ? "Envoyer" : "Send")}</button></div></form></div>`;
});
export {
  Page as default
};
