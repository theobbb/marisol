<script>
	import Img from '$lib/components/Img.svelte';
	import { lang } from '$lib/store';
	import AddToCart from '../AddToCart.svelte';
	import { formatPrice } from '../lib/formatPrice';

	export let data;

	import { lang_href } from '$lib/store';
	import Branches from '../Branches.svelte';
	import Link from '$lib/components/Link.svelte';

	$: branch = data.branch;

	$: $lang_href = {
		fr: `/boutique/${data.branch.cat_display ? data.branch.cat.slug.fr.current : data.branch.slug.fr?.current}`,
		en: `/shop/${data.branch.cat_display ? data.branch.cat.slug.en.current : data.branch.slug.en?.current || data.branch.slug.fr?.current}`,
	};

	$: console.log(data);
</script>

<div class="flex flex-col gap-44">
	<div>
		{#if branch.cat_display}
			<div class="mb-4">
				<Link
					class="flex w-fit items-center gap-2 !px-0 !py-0"
					href="/{$lang == 'fr' ? 'boutique' : 'shop'}/{branch.slug[$lang]
						.current}"
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
					<div>{$lang == 'fr' ? 'Retour' : 'Back'}</div>
				</Link>
			</div>
		{/if}
		<div
			class="mb-12 flex w-full flex-col justify-between gap-4 border-b pb-2 lg:flex-row"
		>
			<div class=" text-4xl">
				{branch.cat_display
					? branch.cat.name[$lang]
					: branch.name[$lang] || branch.name.fr}
			</div>
		</div>
		<div
			class="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-20"
		>
			{#each branch.products as product}
				{#if branch.orderByVariant && product.variantTitle}
					<div class="w-fit border-b pb-2 text-3xl" style="grid-column: 1/-1;">
						{product.variantTitle}
					</div>
				{/if}

				<div>
					<a
						href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{branch.slug[$lang]
							?.current || branch.slug.fr.current}/{product.slug[$lang]
							?.current || product.slug.fr.current}"
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
						{#if product.variants}
							{#each product.variants as variant}
								<div class="flex w-full items-center justify-between gap-2">
									<div class="flex gap-2">
										<div class="w-14 font-medium">
											{formatPrice(variant.price)}
										</div>
										{#if !branch.orderByVariant}
											<div class="text-black/50">
												{variant.variant.name[$lang] || variant.variant.name.fr}
											</div>
										{/if}
									</div>
									<div>
										<AddToCart {product} {variant} />
									</div>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="mt-24 border-t pt-10">
	{#if branch.cat_display}
		<div class="mb-4">
			<Link
				class="flex w-fit items-center gap-2 !px-0 !py-0"
				href="/{$lang == 'fr' ? 'boutique' : 'shop'}/{branch.slug[$lang]
					.current}"
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
				<div>{$lang == 'fr' ? 'Retour' : 'Back'}</div>
			</Link>
		</div>
	{/if}
	<Branches
		data={{
			...data,
			shop: {
				...data.shop,
				branches: [...data.shop.branches].filter(
					(b) => b._id != data.branch._id,
				),
			},
		}}
	/>
</div>
