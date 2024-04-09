<script>
	import Img from '$lib/components/Img.svelte';
	import { lang } from '$lib/store';

	export let data;

	$: serie = data.series.find((s) => s.books.some((b) => b._ref === data._id));
</script>

<div>
	{#if serie}
		<div class="mb-8 text-2xl lg:text-4xl">
			<span class="mr-1 opacity-60"
				>{$lang == 'fr' ? 'Autres livres de' : 'Other books from'}</span
			>
			<a
				data-sveltekit-replacestate
				href="{$lang == 'fr' ? '/livres' : '/en/books'}#{serie.slug[$lang]
					?.current || serie.slug.fr.current}"
				>{serie.name[$lang] || serie.name.fr}</a
			>
		</div>
		<div
			class=" relative h-[200px] overflow-x-auto overflow-y-hidden md:h-[200px]"
		>
			<div
				class="absolute left-0 top-0 flex h-full w-full"
				style="width: {200 * serie.books.length}px"
			>
				{#each serie.books as bookRef}
					{@const book = data.books.find((b) => b._id === bookRef._ref)}
					{#if book}
						<div
							class="mr-3.5 h-[100px] w-[100px] md:h-[200px] md:w-[200px] {book._id ==
							data._id
								? 'opacity-30'
								: ''}"
						>
							<a
								class="relative h-full w-full"
								href="{$lang == 'fr' ? '/livres' : '/en/books'}/{book.slug[
									$lang
								]?.current || book.slug.fr.current}"
							>
								<Img
									src={book.images[0].asset.url}
									class="rounded-sm"
									alt="{$lang == 'fr' ? 'Livre' : 'Book'} - {book.name[$lang] ||
										book.name.fr}"
								/>
							</a>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
