<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';

	import { lang } from '$lib/store';

	export let data;

	const fakeSerie = data.name.fr.includes('Série');
</script>

<div class="-lg:w-1/2 relative flex flex-col lg:flex-row">
	<div class="relative lg:w-1/2">
		<div class="top-24 flex flex-col lg:sticky lg:pr-24">
			<Link
				class="mb-3 !px-0 !py-0 text-4xl lg:text-5xl"
				href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.slug[$lang]
					?.current || data.slug.fr.current}"
			>
				{data.name[$lang] || data.name.fr}
			</Link>

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
				class=" rounded-sm {fakeSerie ? 'max-h-[90vh]' : 'max-h-[64vh]'}"
				alt="{$lang == 'fr' ? 'Livres' : 'Books'} - {data.name[$lang]}"
			/>
		</a>
	</div>
</div>
