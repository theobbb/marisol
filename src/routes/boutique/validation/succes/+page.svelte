<script>
	import { cart, lang, lang_href } from '$lib/store';
	import { onMount } from 'svelte';
	import Recu from './Recu.svelte';
	$cart = null;

	export let data;

	data.cart = null;

	$lang_href = {
		fr: '/boutique/validation/succes',
		en: '/shop/checkout/success',
	};
</script>

<div class="m-auto w-fit">
	<div class="flex items-center gap-4 pt-20">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="36"
			viewBox="0 0 24 24"
			width="36"
			class="fill-accent"
			><path d="M0 0h24v24H0z" class="fill-none" /><path
				d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
			/></svg
		>
		<div class="text-3xl">
			{$lang == 'fr'
				? 'Merci pour votre achat!'
				: 'Thank you for you purchase!'}
		</div>
	</div>
	<div>
		<div class="pt-3 text-lg">
			{$lang == 'fr'
				? 'Un courriel de confirmation incluant cette facture vous a été envoyé.'
				: 'A confirmation email has been sent to you.'}
		</div>
	</div>
</div>

<Recu {data} />
