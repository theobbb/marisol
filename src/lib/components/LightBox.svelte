<script>
	import { onMount } from 'svelte';
	import Img from './Img.svelte';
	import { lang } from '$lib/store';
	import Link from './Link.svelte';

	export let data;

	$: images = [];

	let active = -1;

	let dom = {};

	onMount(() => {
		images = [...dom.imgs.querySelectorAll('img')];
		images.forEach((image, i) => {
			image.style.cursor = 'pointer';
			image.addEventListener('click', (e) => {
				active = i;
				console.log(active);
				document.documentElement.style.overflowY = 'hidden';

				dom.dialog.showModal();
			});
		});
	});

	let book = null;
	let serie = null;

	$: active, updateCaption();

	function updateCaption() {
		const img = images[active];

		if (!img) return;
		const book_ref = img.getAttribute('book');
		if (book_ref) {
			book = data.books.find((book) => book._id === book_ref);
			if (!book) return;
			serie = book.serie;
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowRight') {
			active = active === images.length - 1 ? 0 : active + 1;
		}
		if (e.key === 'ArrowLeft') {
			active = active === 0 ? images.length - 1 : active - 1;
		}
	}}
/>

<div bind:this={dom.imgs}>
	<slot />
</div>

<dialog bind:this={dom.dialog}>
	<div
		class="fixed bottom-3 left-3.5 right-3.5 top-2.5 text-white lg:bottom-4 lg:left-6 lg:right-6 lg:top-4"
	>
		<button
			class="absolute left-0 top-0 h-full w-full select-none"
			on:click={() => {
				dom.dialog.close();
				document.documentElement.style.overflowY = 'auto';
			}}
		/>

		<div class="absolute left-0 top-0 z-[100]">
			<div class="text-xl">{active + 1} / {images.length}</div>
		</div>
		<button
			class="absolute right-0 top-0 z-[200] text-white"
			on:click={() => {
				dom.dialog.close();
				document.documentElement.style.overflowY = 'auto';
			}}
		>
			<svg
				class="h-10 w-10"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					class="stroke-white/90 hover:fill-white/100"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				></path>
			</svg>
		</button>

		<div class="absolute left-0 top-0 h-full">
			<button
				class="flex h-full items-end xl:items-center"
				on:click={() => {
					active = active === 0 ? images.length - 1 : active - 1;
				}}
			>
				<svg
					class="h-10 w-10"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						class="stroke-white/90"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 18l-6-6 6-6"
					></path>
				</svg>
			</button>
		</div>
		<div class="absolute right-0 top-0 h-full">
			<button
				class="flex h-full items-end xl:items-center"
				on:click={() => {
					active = active === images.length - 1 ? 0 : active + 1;
				}}
			>
				<svg
					class="h-10 w-10"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						class="stroke-white/90"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 18l6-6-6-6"
					></path>
				</svg>
			</button>
		</div>

		<div
			class="pointer-events-none absolute bottom-0 left-0 flex w-full justify-center"
		>
			<div
				class="pointer-events-auto flex flex-col items-baseline gap-1 text-2xl text-lg md:flex-row md:gap-2"
			>
				{#if book}
					<div class="text-base opacity-40">
						{$lang == 'fr' ? 'Tiré du livre' : 'From the book'}:
					</div>
					<div class="">
						<Link
							on:click={() => {
								document.documentElement.style.overflowY = 'auto';
							}}
							href="{$lang == 'fr' ? '/livres' : '/en/books'}/{book.slug[$lang]
								?.current || book.slug.fr.current}"
							class="!px-0 decoration-white/40"
							>{book.name[$lang] || book.name.fr}</Link
						>
					</div>
					{#if serie}
						<div class="hidden md:inline">-</div>
						<div class="">
							<Link
								on:click={() => {
									document.documentElement.style.overflowY = 'auto';
								}}
								href="{$lang == 'fr' ? '/livres' : '/en/books'}#{serie.slug[
									$lang
								]?.current || serie.slug.fr.current}"
								class="!px-0 decoration-white/40">{serie.name[$lang]}</Link
							>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
	{#if active > -1}
		<div
			class="pointer-events-none relative z-[200] flex select-none justify-center"
		>
			<Img
				class="pointer-events-auto max-h-[calc(90lvh-50px)] max-w-[calc(96lvw-50px)] "
				src={images[active].src}
				alt={images[active].alt}
			/>
		</div>
	{/if}
</dialog>

<style>
</style>
