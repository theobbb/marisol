<script>
	import Button from '$lib/components/Button.svelte';
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { lang } from '$lib/store';
	import LightBox from '$lib/components/LightBox.svelte';
	import Carousel from './Carousel.svelte';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';

	export let data;

	console.log(data);
</script>

<div class="mb-4 mt-12 text-3xl md:text-5xl">
	{$lang == 'fr' ? 'Une visite de l’atelier' : 'A visit of the workshop'}
</div>
<div
	class="bg- relative -mx-28 h-[50vh] w-[100vw] bg-fixed bg-[100%_50%] bg-no-repeat brightness-[1.1] saturate-[1.25]"
	style="background-image: url({data.atelier.asset.url})"
>
	<div class=""></div>
</div>

<Carousel data={data.imgs_atelier}>
	<div class=" mt-12 text-3xl md:text-5xl">
		{$lang == 'fr' ? 'L’atelier' : 'The workshop'}
	</div>
</Carousel>

<Carousel data={data.imgs_dessin}>
	<div class=" mt-16 text-3xl md:text-5xl">
		{$lang == 'fr' ? 'Le dessin' : 'The drawing'}
	</div>
</Carousel>
<div
	class="mt-20 flex w-full items-end justify-between border-b border-black/10 pb-4 text-3xl md:text-5xl"
>
	<div>{$lang == 'fr' ? 'Biographie' : 'Biography'}</div>
	<div>
		<Link
			button
			href="#bio"
			class="mb-8 text-xl"
			on:click={() => (data.bioOpen = !data.bioOpen)}
		>
			{data.bioOpen
				? $lang == 'fr'
					? '- Réduire'
					: '- Reduce'
				: $lang == 'fr'
					? '+ Voir plus'
					: '+ See more'}
		</Link>
	</div>
</div>
<div
	id="bio"
	class="mt-6 flex w-full scroll-mt-48 flex-col justify-start gap-10 lg:mt-16 lg:flex-row lg:gap-24 {data.bioOpen
		? ''
		: 'h-[400px] overflow-hidden'}"
>
	<div
		class={data.bioOpen
			? ''
			: 'h-[180px] brightness-[1.3] contrast-[0.8] grayscale lg:h-[auto]'}
	>
		<Img
			src={data.bio.img.asset.url}
			class="max-h-full  max-w-full rounded-lg "
		/>
	</div>
	<div class="relative">
		<SanityTextBlock class=" [&_p]:max-w-[600px]" blocks={data.bio[$lang]} />
		<div
			class="pointer-events-none absolute bottom-0 right-0 h-[100px] w-full bg-gradient-to-b from-transparent to-white {data.bioOpen
				? 'hidden'
				: ''}"
		/>
	</div>
</div>

<div
	class="mb-16 mt-28 flex w-full flex-col justify-between border-b border-black/10 pb-4 text-3xl md:text-5xl lg:flex-row lg:items-end"
>
	<div>{$lang == 'fr' ? 'Prix et mentions' : 'Awards and mentions'}</div>
	<div>
		<Link
			button
			href="#mentions"
			class="text-xl"
			on:click={() => (data.mentionsOpen = !data.mentionsOpen)}
		>
			{data.mentionsOpen
				? $lang == 'fr'
					? '- Réduire'
					: '- Reduce'
				: $lang == 'fr'
					? '+ Voir plus'
					: '+ See more'}
		</Link>
	</div>
</div>
<div
	id="mentions"
	class="relative grid scroll-mt-64 grid-cols-1 gap-16 overflow-hidden md:grid-cols-2 lg:gap-24 xl:grid-cols-3 [&_strong]:text-2xl [&_strong]:lg:text-3xl {data.mentionsOpen
		? ''
		: 'h-[180px]'} transition-all duration-500 ease-in-out"
>
	{#each data.mentions as mention}
		<div class="max-w-[400px]"><SanityTextBlock blocks={mention[$lang]} /></div>
	{/each}
	<div
		class="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-b from-transparent to-white {data.mentionsOpen
			? 'hidden'
			: ''}"
	></div>
</div>

<div
	class="mb-16 mt-28 flex w-full flex-col justify-between border-b border-black/10 pb-4 text-3xl md:text-5xl lg:flex-row lg:items-end"
>
	<div>{$lang == 'fr' ? 'Bibliographie' : 'Bibliography'}</div>
	<div>
		<Link
			button
			href="#mentions"
			class="text-xl"
			on:click={() => (data.biblioOpen = !data.biblioOpen)}
		>
			{data.biblioOpen
				? $lang == 'fr'
					? '- Réduire'
					: '- Reduce'
				: $lang == 'fr'
					? '+ Voir plus'
					: '+ See more'}
		</Link>
	</div>
</div>
<div
	id="biblio"
	class="relative grid scroll-mt-64 grid-cols-1 gap-16 overflow-hidden md:grid-cols-2 lg:gap-24 xl:grid-cols-3 [&_strong]:text-2xl [&_strong]:lg:text-3xl {data.biblioOpen
		? ''
		: 'h-[180px]'} transition-all duration-500 ease-in-out"
>
	{#each data.biblio as item}
		<div class="max-w-[400px]"><SanityTextBlock blocks={item[$lang]} /></div>
	{/each}
	<div
		class="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-b from-transparent to-white {data.biblioOpen
			? 'hidden'
			: ''}"
	></div>
</div>
