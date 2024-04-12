<script>
	import Img from '$lib/components/Img.svelte';
	import { lang } from '$lib/store';

	export let data;
</script>

<div class="m-auto flex w-fit flex-col gap-4 md:flex-row md:gap-16">
	{#each data?.branch?.cats as cat}
		{@const first = data.branch.products.find((p) => p.category._id == cat._id)}
		<a
			class="group rounded border px-4 py-3"
			href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{cat.slug[$lang].current}"
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
