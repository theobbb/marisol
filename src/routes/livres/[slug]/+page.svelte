<script>
	import Img from '$lib/components/Img.svelte';
	import LightBox from '$lib/components/LightBox.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';
	import Book from '../Book.svelte';
	import SerieRelated from '../SerieRelated.svelte';

	export let data, slug;
	console.log(data);
</script>

<!--
<div>
	<Book {data} single />

	<div class="mt-12 flex">
		<div class=" flex w-full flex-col">
			<div class="gap-3.5" style="columns: 2; ">
				{#each data.images as image, i}
					{#if i != 0}
						<div class="">
							<Img
								src={image.asset.url}
								class="mb-3.5 rounded-sm"
								alt="{$lang == 'fr' ? 'Livre' : 'Book'} - {data.name[$lang]}"
							/>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<div class="mt-24 max-w-[800px]">
		<SanityTextBlock
			blocks={data.infos[$lang]}
			class="[&_*]:text-3xl [&_p]:!mt-3 [&_p]:text-xl"
		/>
	</div>
</div>-->

<div>
	<LightBox>
		<div class="mb-10 text-5xl">{data.name[$lang]}</div>
		<div class=" flex flex-col lg:flex-row">
			<div class="relative lg:w-1/4">
				<div class="sticky top-24">
					<Img
						src={data.images[0].asset.url}
						class=" rounded-sm"
						alt="{$lang == 'fr' ? 'Livre' : 'Book'} - {data.name[$lang]}"
					/>
				</div>
			</div>
			<div class="flex w-full flex-col lg:ml-3.5">
				<div class="mb-8 mt-14 max-w-[700px] lg:ml-6">
					<SanityTextBlock blocks={data.text[$lang]} />
				</div>
				<div class="mt-6 gap-3.5 lg:mt-0 lg:columns-[2]">
					{#each data.images as image, i}
						{#if i != 0}
							<div class="">
								<Img
									lightbox
									lazy
									src={image.asset.url}
									class="mb-3.5 rounded-sm"
									alt="{$lang == 'fr' ? 'Livre' : 'Book'} - {data.name[$lang]}"
								/>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<div class="mt-24">
			<SanityTextBlock
				blocks={data.infos[$lang]}
				class="[&_*]:text-3xl [&_p]:text-xl"
			/>
		</div>
	</LightBox>
</div>

<div class="mt-36">
	<SerieRelated {data} />
</div>
