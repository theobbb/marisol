<script>
	import Img from '$lib/components/Img.svelte';
	import LightBox from '$lib/components/LightBox.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/murales',
		en: '/murals',
	};

	$: console.log(data);
</script>

<div class="m-auto max-w-[660px]">
	<div>
		<SanityTextBlock blocks={data.text?.[$lang] || []} />
	</div>
	<div class="mt-20 space-y-44">
		{#each data.murals as mural}
			<div>
				<LightBox>
					{#each mural.imgs as img}
						<div class="relative my-6">
							<Img src={img.asset.url} class="rounded-sm" />
						</div>
					{/each}
				</LightBox>
				{#each mural.videos as video}
					<div class="flex">
						<video src={video?.asset?.url} loop autoplay muted />
					</div>
				{/each}
				<div class="mt-6">
					<SanityTextBlock blocks={mural[$lang]} />
				</div>
			</div>
		{/each}
	</div>
</div>
