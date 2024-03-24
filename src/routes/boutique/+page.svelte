<script>
	import Img from '$lib/components/Img.svelte';
	import { lang } from '$lib/store';
	import AddToCart from './AddToCart.svelte';
	import { formatPrice } from './lib/formatPrice';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/boutique',
		en: '/shop',
	};

	let hiddenVariants = [];

	data.shop.branches.forEach((branch) => {
		let lastVariantTitle = '';
		branch.products.forEach((product) => {
			const variant = product.variants[0];
			if (variant.variant.name[$lang] != lastVariantTitle) {
				lastVariantTitle = variant.variant.name[$lang];
				product.variantTitle = lastVariantTitle;
			}
		});
	});
</script>

<div class="flex flex-col gap-44">
	{#each data?.shop?.branches as branch}
		<div id={branch.slug[$lang].current} class="scroll-mt-44">
			<div
				class="mb-12 flex w-full flex-col justify-between gap-4 border-b pb-2 lg:flex-row"
			>
				<div class=" text-4xl">{branch.name[$lang] || branch.name.fr}</div>
				{#if !branch.orderByVariant}
					<div class="flex flex-col items-end gap-4 text-xl lg:flex-row">
						{#each branch.variants as variant}
							<div>
								<button
									on:click={() => {
										variant.hidden = !variant.hidden;
										hiddenVariants = branch.variants
											.filter((v) => v.hidden)
											.map((v) => v._id);
									}}
									class="rounded px-3 py-1 decoration-black/20 underline-offset-4 hover:underline {variant.hidden
										? ''
										: 'bg-black/10'}"
								>
									{variant.name[$lang] || variant.name.fr}
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div
				class="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-20"
			>
				{#each branch.products as product}
					{#if !product.variants?.some( (v) => hiddenVariants.includes(v.variant._id), )}
						{#if branch.orderByVariant && product.variantTitle}
							<div
								class="w-fit border-b pb-2 text-3xl"
								style="grid-column: 1/-1;"
							>
								{product.variantTitle}
							</div>
						{/if}

						<div>
							<a
								class=""
								href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{product.slug[
									$lang
								]?.current || product.slug.fr.current}"
							>
								<div>
									<Img
										class="rounded-sm"
										src={product.isBook
											? product.book?.images[0].asset.url
											: product.imgs[0].url}
									/>
								</div>
								<div class="mt-4 border-b pb-1 text-2xl">
									{product.name[$lang] || product.name.fr}
								</div>
							</a>
							<div class="mt-4 flex flex-col gap-2">
								{#each product.variants as variant}
									<div class="flex w-full items-center justify-between gap-2">
										<div class="flex gap-2">
											<div class="w-14 font-medium">
												{formatPrice(variant.price)}
											</div>
											{#if !branch.orderByVariant}
												<div class="text-black/50">
													{variant.variant.name[$lang] ||
														variant.variant.name.fr}
												</div>
											{/if}
										</div>
										<div>
											<AddToCart {product} {variant} />
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>
