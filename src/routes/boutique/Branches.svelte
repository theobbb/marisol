<script>
	import Img from '$lib/components/Img.svelte';
	import { lang } from '$lib/store';
	export let data;
</script>

<div class="m-auto flex w-fit flex-col gap-4 pt-20 md:flex-row md:gap-16">
	{#each data?.shop?.branches as branch}
		<a
			class="group rounded border px-4 py-3"
			href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{branch.slug[$lang]
				.current}"
		>
			<div>
				<div
					class="mb-12 flex w-full flex-col justify-between gap-4 pb-2 lg:flex-row"
				>
					<div
						class="text-2xl decoration-black/20 underline-offset-4 group-hover:underline"
					>
						{branch.name[$lang] || branch.name.fr}
					</div>
				</div>
				<div class="transition group-hover:scale-[1.03]">
					<Img
						class=" max-h-[300px] w-full rounded-sm object-cover"
						src={branch.products[0].isBook
							? branch.products[0].book.images[0].asset.url
							: branch.products[0].imgs[0]?.url}
					/>
				</div>
			</div>
		</a>
	{/each}
</div>
