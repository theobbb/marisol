<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { lang } from '$lib/store.js';
	import Book from './Book.svelte';

	export let data;
</script>

<div class="flex flex-col gap-28 lg:gap-36">
	{#each data.content as item, i}
		{#if item._type == 'book'}
			<Book data={item} />
		{:else if item._type == 'serie'}
			<div
				class="flex scroll-mt-24 flex-col lg:flex-row"
				id={item.slug[$lang].current}
			>
				<div class="relative mb-6 lg:mb-0 lg:w-1/4">
					<div
						class="sticky top-24 flex w-full flex-wrap items-center justify-between gap-4 pr-8 lg:w-[auto] lg:flex-col lg:items-start lg:justify-start"
					>
						<div class="mb-4 text-4xl lg:mb-12 lg:text-5xl">
							{item.name[$lang]}
						</div>
						<div class="">
							<Link
								href="#{item.slug[$lang].current}"
								button
								on:click={() =>
									(item.serieFullDisplay = !item.serieFullDisplay)}
								class="px-0 py-0 text-xl"
							>
								{$lang == 'fr'
									? item.serieFullDisplay
										? '- Réduire la série'
										: '+ Afficher la série'
									: item.serieFullDisplay
										? '- Reduce the serie'
										: '+ Show the serie'}
							</Link>
						</div>
					</div>
				</div>

				{#if item.serieFullDisplay}
					<div class="flex flex-col gap-36 lg:w-3/4">
						{#each item.books as book}
							<Book data={book} />
						{/each}
					</div>
				{:else}
					<div class="grid grid-cols-2 gap-3.5 lg:w-3/4 lg:grid-cols-3">
						{#each item.books as book}
							<div>
								<a
									class="relative"
									href="{$lang == 'fr' ? 'livres' : 'en/books'}/{book.slug[
										$lang
									].current}"
								>
									<Img
										src={book.images[0].asset.url}
										class="rounded-sm"
										alt="{$lang == 'fr' ? 'Livre' : 'Book'} - {book.name[
											$lang
										]}"
									/>
								</a>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
</div>
