<script>
	import { cart, lang } from '$lib/store';

	let active_i = 0;
</script>

<div class="m-auto mb-10 w-fit rounded py-2">
	<div class="leading-5">
		<span class="mr-1 inline-block align-text-bottom">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				class="fill-accent"
				viewBox="0 -960 960 960"
				width="24"
				><path
					d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
				/></svg
			>
		</span>
		<span class="inline-block">
			{#if $lang == 'fr'}
				À l'achat d'un <a href="/boutique/livres">livre</a>, vous bénéficiez
				d'un rabais de <strong>10%</strong> sur une
				<a href="/boutique/impression-sur-papier-cartonne"
					>impression sur papier cartonnée</a
				> !
			{:else}
				Buy a <a href="/en/shop/books">book</a> and get a <strong>10%</strong>
				discount on a <a href="/en/shop/print-on-cardboard">cardboard print</a>!
			{/if}
		</span>
	</div>

	<div class="mt-1">
		<a
			href="/{$lang == 'fr' ? 'boutique/rabais' : 'en/shop/discounts'}"
			class="others !p-0 font-normal decoration-black/40 underline-offset-4 opacity-60 hover:underline"
		>
			{$lang == 'fr'
				? 'Voir tous les rabais en cours'
				: 'See all current discounts'}
		</a>
	</div>
</div>

<style>
	a:not(.others) {
		@apply text-accent;
	}
	a:not(.others):hover {
		@apply underline decoration-accent underline-offset-4;
	}
</style>
