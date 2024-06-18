<script>
	import Img from '$lib/components/Img.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/coloriages',
		en: '/colorings',
	};
</script>

<div class="m-auto max-w-[1100px]">
	<div>
		<SanityTextBlock blocks={data.text?.[$lang]} />
	</div>

	<div class="mt-20 grid gap-8 md:grid-cols-2">
		{#each data.imgs as img, i}
			<div class=" relative rounded">
				<Img src={img.asset.url} class=" rounded-sm" />
				<div class="mt-6 border-t px-3 py-2.5">
					<a href="{img.asset.url}?dl=coloriage-{i}.jpg" download>
						<svg
							class="size-6"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							{...$$props}
						>
							<path
								fill="currentColor"
								d="M3 19h18v2H3zm10-5.828L19.071 7.1l1.414 1.414L12 17L3.515 8.515L4.929 7.1L11 13.173V2h2z"
							/>
						</svg>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
