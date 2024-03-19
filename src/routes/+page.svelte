<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { lang } from '$lib/store';
	import { onMount } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let data;

	let active = 0;
	let timeout;

	onMount(() => {
		loop();
		return () => {
			if (timeout) clearInterval(timeout);
		};
	});

	function loop() {
		if (timeout) clearInterval(timeout);

		timeout = setTimeout(() => {
			active = active === data.content.length - 1 ? 0 : active + 1;
			loop();
		}, 4000);
	}
</script>

<svelte:head>
	<title>Accueil | Marisol Sarrazin</title>
	<meta name="description" content="" />
</svelte:head>

<div
	class="relative -mx-3.5 h-[calc(100lvh-220px)] w-[100vw]
md:-mx-8
xl:-mx-16 2xl:-mx-28"
>
	<div class="relative flex h-full w-full select-none overflow-hidden">
		{#each data.content as img, i}
			<div
				bind:this={img.node}
				class="absolute left-0 top-0 h-full w-full {i == active
					? 'scale-[1]'
					: 'scale-[2] opacity-0'} transition duration-[3s] ease-in-out"
			>
				<Img
					src={img.img.asset.url}
					style="object-position: {Math.round(
						img.img.hotspot?.x * 100,
					)}% {Math.round(img.img.hotspot?.y * 100)}%;"
					class="pointer-events-none h-full w-full object-cover"
				/>
			</div>
		{/each}
		<div
			class="absolute left-0 top-0 h-[20%] w-full bg-gradient-to-t from-transparent to-white"
		/>
		<div
			class="absolute bottom-0 left-0 h-[15%] w-full bg-gradient-to-b from-transparent to-white md:h-[20%]"
		/>
	</div>
</div>
<div class="flex w-full justify-between">
	<div class="relative flex flex-1 gap-1 md:gap-1.5">
		{#each data.content as item, i}
			<button
				class="h-3 w-3 rounded-full transition-colors hover:bg-black/50 {active ==
				i
					? 'bg-black/50'
					: 'bg-black/20'}"
				on:click={() => {
					active = i;
					loop();
				}}
			>
			</button>
		{/each}
	</div>
	<div class="relative hidden w-full items-center justify-center lg:flex">
		{#each data.content as item, i}
			{@const book = item.book}
			{#if book}
				<div
					class="absolute overflow-hidden {active == i
						? ''
						: 'pointer-events-none'}"
				>
					<div
						class=" left-0 flex flex-col items-baseline gap-1 text-2xl text-lg md:flex-row md:gap-2 {i ==
						active
							? ''
							: 'translate-y-full opacity-0'}
transition duration-[2000ms] ease-in-out"
					>
						<div class="text-base opacity-40">
							{$lang == 'fr' ? 'Tiré de' : 'From'}:
						</div>
						<div class="">
							<Link
								href="{$lang == 'fr' ? '/livres' : '/en/books'}/{book.slug[
									$lang
								]?.current || book.slug.fr.current}"
								class="!px-0 ">{book.name[$lang] || book.name.fr}</Link
							>
						</div>
						{#if book.serie}
							<div class="hidden md:inline">-</div>
							<div class="">
								<Link
									on:click={() => {
										document.documentElement.style.overflowY = 'auto';
									}}
									href="{$lang == 'fr' ? '/livres' : '/en/books'}#{book.serie
										.slug[$lang]?.current || book.serie.slug.fr.current}"
									class="!px-0 ">{book.serie.name[$lang]}</Link
								>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="pointer-events-none relative flex flex-1 gap-2 opacity-0">
		{#each data.content as item, i}
			<div class="h-3 w-3"></div>
		{/each}
	</div>
</div>
