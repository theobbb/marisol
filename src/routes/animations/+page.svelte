<script>
	import Img from '$lib/components/Img.svelte';
	import LightBox from '$lib/components/LightBox.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';
	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/animations',
		en: '/workshop',
	};
</script>

<div
	class="mb-24 flex w-full flex-col justify-between gap-6 md:flex-row md:gap-20"
>
	<div class="flex flex-col md:w-1/2">
		<div class="max-w-[700px]">
			<SanityTextBlock blocks={data.text1[$lang]} />
		</div>
		<div class="mt-8 self-end">
			<Img src={data.featured[0].asset.url} class="max-h-[50lvh] rounded-sm" />
		</div>
	</div>
	<div class="flex flex-col md:w-1/2">
		<div class="md:self-end">
			<Img src={data.featured[1].asset.url} class="rounded-sm" />
		</div>
		<div class="mt-8 max-w-[700px]">
			<SanityTextBlock blocks={data.text2[$lang]} />
		</div>
	</div>
</div>

<LightBox>
	<div class="columns-[2] gap-4 md:columns-[3] xl:columns-[4]">
		{#each data.imgs as img}
			<div class="grid-item relative mb-4">
				<Img lazy src={img.asset.url} class="rounded-sm" />
			</div>
		{/each}
	</div>
</LightBox>
