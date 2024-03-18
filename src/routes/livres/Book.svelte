<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';

	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { lang } from '$lib/store';

	export let data;

	const fakeSerie = data.name.fr.includes('Série');

	console.log(fakeSerie);
</script>

<div class="relative flex w-full flex-col lg:flex-row">
	<div class="relative lg:w-1/2">
		<div class="top-24 flex flex-col lg:sticky lg:pr-24">
			<Link
				class="mb-3 !px-0 !py-0 text-4xl lg:text-5xl"
				href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.slug[$lang]
					?.current || data.slug.fr.current}"
			>
				{data.name[$lang] || data.name.fr}
			</Link>
			<div class="mt-8 max-w-[600px] lg:mt-16">
				<SanityTextBlock blocks={data.text[$lang]} />
			</div>
			<div class="mb-12 mt-8">
				<Link
					button
					href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.slug[$lang]
						?.current || data.slug.fr.current}"
					class=" text-xl"
				>
					{fakeSerie
						? $lang == 'fr'
							? 'Voir la série'
							: 'Show serie'
						: $lang == 'fr'
							? 'Voir le livre'
							: 'See the book'}
				</Link>
			</div>
		</div>
	</div>
	<div class=" flex justify-end lg:w-1/2">
		<a
			href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.slug[$lang]
				?.current || data.slug.fr.current}"
		>
			<Img
				src={data.images[0].asset.url}
				class="max-h-[54vh] rounded-sm"
				alt="{$lang == 'fr' ? 'Livres' : 'Books'} - {data.name[$lang]}"
			/>
		</a>
	</div>
</div>
