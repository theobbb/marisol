<script>
	import Button from '$lib/components/Button.svelte';
	import Img from '$lib/components/Img.svelte';
	import LightBox from '$lib/components/LightBox.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	let open = false;

	let n = 0;
	let actives = [];

	function init() {
		actives = [];
		for (let i = 0; i < n; i++) {
			actives.push(i);
		}
	}

	function prev() {
		actives = actives.map((i) => {
			return (i - n + data.length) % data.length;
		});
	}
	function next() {
		actives = actives.map((i) => {
			return (i + n) % data.length;
		});
	}

	onMount(() => {
		onresize();
		window.addEventListener('resize', onresize);

		return () => {
			window.removeEventListener('resize', onresize);
		};
	});

	function onresize() {
		if (window.innerWidth < 1024) {
			n = 1;
		} else {
			n = 3;
		}
		init();
	}
</script>

<div
	class="mb-16 flex w-full flex-wrap items-end justify-between border-b border-black/10 pb-4 xl:mb-6"
>
	<slot />
	<div>
		<Button class=" text-xl" on:click={() => (open = !open)}>
			{open
				? $lang == 'fr'
					? '- Réduire'
					: '- Reduce'
				: $lang == 'fr'
					? '+ Voir plus'
					: '+ See more'}
		</Button>
	</div>
</div>

{#if !open}
	<LightBox>
		<div class="relative flex items-center">
			<div
				class="absolute left-0 top-0 z-20 flex h-full items-start xl:-translate-x-full xl:items-center"
			>
				<button
					class="translate-y-[calc(-100%-16px)] xl:translate-y-0 xl:pr-3 2xl:pr-6"
					on:click={prev}
				>
					<svg
						class="h-10 w-10"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							class="fill-none stroke-black/90"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 18l-6-6 6-6"
						></path>
					</svg>
				</button>
			</div>
			<div
				class="relative flex h-[400px] w-full flex-col items-center justify-between gap-6 overflow-hidden lg:flex-row"
			>
				{#each data as img, i}
					{@const visible = actives.includes(i)}
					<div
						class="mb-4 flex h-full flex-col justify-center {visible
							? ''
							: 'hidden'}"
						style="order: {actives.indexOf(i)}"
					>
						<Img
							src={img.asset.url}
							class="max-h-[400px] rounded-sm object-contain object-center"
						/>
					</div>
				{/each}
			</div>
			<div
				class="absolute right-0 top-0 z-20 flex h-full items-start xl:translate-x-full xl:items-center"
			>
				<button
					class=" translate-y-[calc(-100%-16px)] xl:translate-y-0 xl:pl-3 2xl:pl-6"
					on:click={next}
				>
					<svg
						class="h-10 w-10"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							class="fill-none stroke-black/90"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 18l6-6-6-6"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</LightBox>
{:else}
	<LightBox>
		<div class="columns-[2] gap-4 md:columns-[3] lg:columns-[4]">
			{#each data as img, i}
				<div class="mb-4"><Img src={img.asset.url} class="rounded-sm" /></div>
			{/each}
		</div>
	</LightBox>
{/if}
