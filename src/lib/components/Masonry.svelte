<script>
	import { onMount } from 'svelte';
	import Img from './Img.svelte';
	import LightBox from './LightBox.svelte';
	import { lang } from '$lib/store';
	export let data,
		imgs,
		cols = 3;
	let container = null;

	let ready = false;

	onMount(() => {
		init();
	});

	let totalH = 0;

	function init() {
		if (!container) return;

		const col_w = container.offsetWidth / cols;
		console.log(col_w);
		const cursors = Array(cols).fill(0);

		imgs.forEach((img, i) => {
			const { aspectRatio } = img.img.asset.metadata.dimensions;

			const col_i = cursors.indexOf(Math.min(...cursors));

			img.x = col_i * col_w;
			img.y = cursors[col_i];

			img.width = col_w;
			img.height = col_w / aspectRatio;

			img.first = col_i === 0;

			cursors[col_i] += img.height;
		});
		totalH = Math.max(...cursors);
		ready = true;
	}
</script>

<!--
<div  class="relative h-[0]">
	<div class="invisible absolute w-full"><slot /></div>
</div>-->
<div
	class="relative w-full {ready ? '' : 'opacity-0'} transition duration-300"
	style="height: {totalH}px;"
	bind:this={container}
>
	{#if ready}
		{#each imgs as img}
			<LightBox {data}>
				<div
					class="absolute"
					style="width: {img.width}px; height: {img.height}px; top: {img.y}px; left: {img.x}px;"
				>
					<img
						alt="img-{img.book}"
						class="absolute h-full w-full object-cover {img.first
							? ''
							: 'pl-4'} pb-4"
						src={img.img.asset.url}
						book={img.book_ref?._ref}
					/>
				</div>
			</LightBox>
		{/each}
	{/if}
</div>
