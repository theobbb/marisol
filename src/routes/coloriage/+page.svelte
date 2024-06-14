<script>
	import Img from '$lib/components/Img.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/coloriage',
		en: '/coloring',
	};

	async function download(url) {
		const res = await fetch(`${$page.url.pathname}/${url}`);
		const img = await res.json();
		console.log(img);
	}

	//$: console.log(data);
</script>

<div class="m-auto max-w-[700px]">
	<div>
		<SanityTextBlock blocks={data.text?.[$lang]} />
	</div>

	<div class="mt-20 grid grid-cols-2 gap-3">
		{#each data.imgs as img}
			<button on:click={() => download(img.asset.url)}
				><img src={img.asset.url} alt={img.alt} class="rounded-sm" /></button
			>
		{/each}
	</div>
</div>
