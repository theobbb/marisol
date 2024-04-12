<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { lang } from '$lib/store';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: `/boutique/${data.branch.slug.fr?.current}/categories`,
		en: `/shop/${data.branch.slug.en?.current || branch.slug.fr?.current}/categories`,
	};
</script>

<div class="m-auto w-fit pt-6">
	<div class="mb-4">
		<Link
			class="flex w-fit items-center gap-2 !px-0 !py-0"
			href={$lang == 'fr' ? '/boutique' : '/en/shop'}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="20"
				viewBox="0 0 24 24"
				width="20"
				class="opacity-40"
				><path d="M0 0h24v24H0z" fill="none" /><path
					d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
				/></svg
			>
			<div>{$lang == 'fr' ? 'Retour à la boutique' : 'Back to shop'}</div>
		</Link>
	</div>
	<div class="mb-16 text-4xl">
		{data.branch.name[$lang]}
	</div>
	<div class="flex w-fit flex-col gap-4 md:flex-row md:gap-16">
		{#each data?.branch?.cats as cat}
			{@const first = data.branch.products.find(
				(p) => p.category._id == cat._id,
			)}
			<a
				class="group rounded border px-4 py-3"
				href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{cat.slug[$lang]
					.current}"
			>
				<div>
					<div
						class="mb-12 flex w-full flex-col justify-between gap-4 pb-2 lg:flex-row"
					>
						<div
							class="text-2xl decoration-black/20 underline-offset-4 group-hover:underline"
						>
							{cat.name[$lang] || cat.name.fr}
						</div>
					</div>
					{#if first}
						<div class="transition group-hover:scale-[1.03]">
							<Img
								class=" max-h-[300px] w-full rounded-sm object-cover"
								src={first.isBook
									? first.book.images[0].asset.url
									: first.imgs[0]?.url}
							/>
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
