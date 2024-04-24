<script>
	import { lang, lang_href } from '$lib/store';

	$lang_href = {
		fr: '/boutique/rabais',
		en: '/shop/discounts',
	};

	$: rabais = $lang == 'fr' ? 'de rabais sur' : 'discount on';
	$: print = $lang == 'fr' ? 'impression sur papier cartonné' : 'print on cardstock';
</script>

<div class="m-auto max-w-[520px] pt-16 text-lg">
	<div class="mb-1.5 text-4xl">
		{$lang == 'fr' ? 'Rabais en cours' : 'Discounts'}
	</div>
	<div class="text-lg">
		{$lang == 'fr'
			? "Acheter plusieurs produits vous permet d'économiser! Le rabais le plus avantageux s'applique automatiquement au panier."
			: 'Buying multiple products allows you to save! The most advantageous discount is automatically applied to the cart.'}
	</div>

	<div class="mt-28 w-full">
		<div class="flex w-full items-center justify-center">
			<div class="size-32 rotate-[-10deg] rounded bg-sky-400/30"></div>

			<div
				class="size-32 -translate-x-16 rotate-[-20deg] rounded bg-teal-400/30"
			></div>
		</div>
		<div class="mt-8">
			{#if $lang == 'fr'}
				À l'achat d'un <a href="/boutique/livres">livre</a>, vous bénéficiez d'un
				rabais de <strong>10%</strong> sur une
				<a href="/boutique/impression-sur-papier-cartonne"
					>impression sur papier cartonné</a
				>.
			{:else}
			When purchasing a <a href="/en/shop/books">book</a>, you receive a 
			<strong>10%</strong> discount on a 
			<a href="/en/shop/print-on-cardstock">print on cardstock</a>.
			{/if}
		</div>
	</div>

	<div class="mt-28">
		<div class="flex w-full items-center justify-center">
			<div class="size-32 rotate-[-10deg] rounded bg-teal-400/30"></div>

			<div
				class="size-32 -translate-x-16 rotate-[-20deg] rounded bg-teal-400/30"
			></div>
		</div>
		<div class="mt-8">
			{#if $lang == 'fr'}
			Achetez <a href="/boutique/impression-sur-papier-cartonne"
				> 2 impressions sur papier cartonné
			</a>et bénéficiez d'un rabais de <strong>20%</strong>.
			{:else}
				Purchase <a href="/en/shop/print-on-cardstock">2 prints on 
					cardstock</a> and receive a <strong>20%</strong> discount.
			{/if}
		</div>
	</div>

	<div class="mt-28">
		<div class="flex w-full items-center justify-center">
			<div class="size-24 rotate-[10deg] rounded bg-teal-400/30"></div>

			<div
				class="size-24 -translate-x-8 translate-y-6 rotate-[0deg] rounded bg-teal-400/30"
			></div>
			<div
				class="size-24 -translate-x-16 rotate-[-10deg] rounded bg-teal-400/30"
			></div>
			<div class="-translate-x-8 text-4xl">+</div>
		</div>
		<div class="mt-10">
			{#if $lang == 'fr'}
			Achetez <a href="/boutique/impression-sur-papier-cartonne"
				>3 impressions sur papier cartonnée ou plus
			</a>et bénéficiez d'un rabais de <strong>30%</strong>.
			{:else}
				Purchase <a href="/en/shop/print-on-cardstock">3 prints on 
				cardstock</a> or more and receive a <strong>30%</strong> discount.
			{/if}
		</div>
	</div>
</div>

<style>
	a {
		font-weight: 600;
	}
	a:hover {
		text-decoration: underline;
		text-decoration-color: rgba(0, 0, 0, 0.26);
		@apply underline-offset-2;
	}
	strong {
		font-weight: 600;
	}
</style>
