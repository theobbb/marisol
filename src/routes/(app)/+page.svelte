<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { lang } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/',
		en: '',
	};

	let active = 0;

	let timeout;

	let mounted = false;
	onMount(() => {
		mounted = true;
		onActive();
		return () => {
			if (timeout) clearInterval(timeout);
		};
	});

	let visible = [];

	$: active, onActive();

	function onActive() {
		if (!mounted) return;

		let newVisible = [...visible];

		newVisible = [...newVisible, { ...data.content[active] }];
		visible = newVisible;

		if (timeout) clearInterval(timeout);

		timeout = setTimeout(() => {
			active = active === data.content.length - 1 ? 0 : active + 1;
		}, 7000);
	}

	function initVideo(el) {
		el.playbackRate = data.speed;
		el.play();
	}
	let ended = false;
</script>

<svelte:head>
	<title>Accueil | Marisol Sarrazin</title>
	<meta name="description" content="" />
</svelte:head>

<div class="fixed left-0 top-0 h-[100svh] w-full">
	<div class="relative flex h-full w-full select-none overflow-hidden">
		{#each visible as img, i}
			<div
				bind:this={img.node}
				class="absolute left-0 top-0 h-full w-full"
				style=" animation: fadeIn 10s ease-in-out forwards; transform-origin: {Math.round(
					img.img.hotspot?.x * 100,
				)}% {Math.round(img.img.hotspot?.y * 100)}%;"
			>
				<Img
					src={img.img.asset.url}
					style="object-position: {Math.round(
						img.img.hotspot?.x * 100,
					)}% {Math.round(img.img.hotspot?.y * 100)}%;"
					class="pointer-events-none h-full w-full object-cover transition duration-500"
				/>
			</div>
		{/each}

		<div class="absolute left-0 top-0 z-20 flex h-[260px] w-full flex-col">
			<div
				class="h-full w-full bg-gradient-to-t from-transparent to-black/60"
			/>
		</div>

		<div
			class="absolute bottom-0 left-0 z-20 h-[90px] w-full bg-gradient-to-b from-transparent to-black/60 md:h-[20%]"
		/>
	</div>
</div>
<div class="fixed bottom-4 left-0 w-full">
	<div
		class="relative mx-3.5 flex flex-col items-start justify-between md:mx-8 lg:flex-row xl:mx-16 2xl:mx-28"
	>
		<div class="relative ml-3 flex w-fit gap-1 md:gap-1.5">
			{#each data.content as item, i}
				<button
					class="h-3 w-3 rounded-full transition-colors hover:bg-white/50 {active ==
					i
						? 'bg-white/50'
						: 'bg-white/20'}"
					on:click={() => {
						active = i;
					}}
				>
				</button>
			{/each}
		</div>
		<div
			class="mt-3 hidden w-full items-center justify-end text-white lg:mt-0 lg:flex"
		>
			{#each data.content as item, i}
				{@const book = item.book}
				{#if book}
					<div
						class="absolute overflow-hidden {active == i
							? ''
							: 'pointer-events-none'}"
					>
						<div
							class=" left-0 flex flex-row items-baseline gap-1 text-2xl text-lg md:gap-2 {i ==
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
	</div>
</div>

<div
	class="fixed bottom-20 left-4 lg:left-20 {ended
		? '-opacity-0'
		: ''} transition duration-500"
>
	<video
		use:initVideo
		autoplayy
		on:ended={() => {
			ended = true;
		}}
		muted
		class="h-[160px] w-[160px] overflow-hidden rounded-full object-cover object-bottom shadow-2xl sm:h-[220px] sm:w-[220px] lg:h-[300px] lg:w-[300px]"
		src="https://cdn.sanity.io/files/m60p6rsb/production/49e81aa10249a13f203e0dd88b8da7fe3b1fe48f.mov"
	>
	</video>
</div>

<style>
	@keyframes -global-fadeIn {
		0% {
			opacity: 0;
			transform: scale(1);
		}
		20% {
			opacity: 1;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(1.3);
		}
	}
	@keyframes -global-fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
