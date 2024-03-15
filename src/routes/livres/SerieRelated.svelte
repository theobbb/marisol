<script>
	import Img from '$lib/components/Img.svelte';
	import { lang } from '$lib/store';

	export let data;

	$: serie = data.series.find((s) => s.books.some((b) => b._ref === data._id));

	// s.books.some((b) => b._ref === data._id));
	$: console.log(serie);
</script>

<div>
	{#if serie}
		<div class="mb-8 text-4xl">
			{$lang == 'fr' ? 'Autres livres de' : 'Other books from'} :
			{serie.name[$lang]}
		</div>
		<div class="w-[full relative h-[200px] overflow-y-hidden overflow-x-scroll">
			<div
				class="absolute left-0 top-0 flex h-full w-full"
				style="width: {200 * serie.books.length}px"
			>
				{#each serie.books as bookRef}
					{@const book = data.books.find((b) => b._id === bookRef._ref)}
					{#if book}
						<div
							class="mr-3.5 h-[250px] w-[250px] {book._id == data._id
								? 'opacity-30'
								: ''}"
						>
							<a
								class="relative h-full w-full"
								href="{$lang == 'fr' ? '/livres' : '/en/books'}/{book.slug[
									$lang
								].current}"
							>
								<Img
									src={book.images[0].asset.url}
									class="rounded-sm"
									alt="{$lang == 'fr' ? 'Livre' : 'Book'} - {book.name[$lang]}"
								/>
							</a>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
