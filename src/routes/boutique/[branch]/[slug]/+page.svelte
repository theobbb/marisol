<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { cart, lang, progress } from '$lib/store';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { formatPrice } from '../../lib/formatPrice';
	import LightBox from '$lib/components/LightBox.svelte';

	export let data;

	$: match = data.match;

	let loading = false;

	import { lang_href } from '$lib/store';
	import { page } from '$app/stores';
	$: $lang_href = {
		fr: `/boutique/${data.match?.branch.slug.fr?.current}/${data.match?.slug?.fr?.current}`,
		en: `/shop/${data.match?.branch.slug.en?.current}/${data.match?.slug?.en?.current || data.match?.slug?.fr?.current}`,
	};
	$: product = data.match;

	async function addToCart(variant) {
		$progress.start();

		try {
			if (!$cart) {
				const post_cart = await fetch('/boutique/api/cart', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const posted = await post_cart.json();
				if (posted?._id) $cart = posted;
			}

			if (!$cart?._id || !product?._id || !variant?.variant?._id) return;

			let img = '';
			if (product.isBook) {
				img = product.book.images[0].asset.url;
			} else {
				img = product.imgs[0].url;
			}

			const res = await fetch('/boutique/api/cart-item', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart_id: $cart._id,
					product_id: product._id,
					variant_id: variant.variant._id,
					img,
				}),
			});
			const data = await res.json();
			if (data?._id) $cart = data;
		} catch (error) {
			console.error(error);
		}

		$progress.done();
	}
	$: console.log(data.match);
</script>

<div class="mb-8">
	<Link
		class="flex items-center gap-2 !px-0 !py-0"
		href="{$lang == 'fr' ? '/boutique' : '/en/shop'}/{$page.params.branch}"
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
<div class="border-b pb-10">
	<div class="relative flex flex-col gap-12 lg:flex-row lg:gap-0">
		<div class="relative lg:w-1/2">
			<div class="sticky top-36">
				<div class="text-4xl">
					{#if data.match?.isBook}
						<Link
							class="!p-0"
							href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.match.book
								.slug[$lang]?.current || data.match.book.slug.fr?.current}"
							>{data.match.name[$lang] || data.match.name.fr}</Link
						>
					{:else}
						{data.match.name[$lang] || data.match.name.fr}
					{/if}
				</div>
				<div class="mt-2">
					{#if data.match.category?._id}
						<Link
							class="!p-0"
							href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{data.match
								.category.slug[$lang]?.current ||
								data.match.category.slug.fr.current}"
							>{data.match.category.name[$lang] ||
								data.match.category.name[$lang]}</Link
						>
					{:else}
						<Link
							class="!p-0"
							href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{data.match.branch
								.slug[$lang]?.current || data.match.branch.slug.fr.current}"
							>{data.match.branch.name[$lang] ||
								data.match.branch.name.fr}</Link
						>
					{/if}
				</div>

				<div class="mt-16">
					<div>
						{#if match.description?.fr}
							<SanityTextBlock
								class=""
								blocks={data.match.description[$lang] ||
									data.match.description?.fr}
							/>
						{/if}
					</div>
				</div>
				{#if match.category?._id}
					<div class="mt-16">
						<div>
							{#if match.category.description?.fr}
								<SanityTextBlock
									class=""
									blocks={data.match.category.description[$lang] ||
										data.match.category.description?.fr}
								/>
							{/if}
						</div>
					</div>
				{/if}
				<div
					class="mt-12 lg:mt-32 {loading
						? 'pointer-events-none opacity-30'
						: ''}"
				>
					{#if data.match.variants}
						{#each data.match.variants as variant}
							<div class="mb-12">
								<div class="text-lg">
									<div class=" font-medium">
										{formatPrice(variant?.price)}
									</div>
									<div class="text-black/50">
										{variant?.variant.name
											? variant?.variant?.name[$lang] ||
												variant?.variant?.name.fr ||
												''
											: ''}
									</div>
									<button
										on:click={() => addToCart(variant)}
										class="mt-2 rounded rounded-sm bg-accent px-3 py-1.5 text-lg font-medium text-white decoration-white/50 underline-offset-4 hover:underline"
									>
										{$lang == 'fr' ? 'Ajouter au panier' : 'Add to cart'}
									</button>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="lg:w-1/2">
			<LightBox>
				<div class="mb-4">
					<Img
						class="rounded-sm"
						src={data.match?.isBook
							? data.match.book?.images[0].asset.url
							: data.match.imgs[0].url}
					/>
				</div>
				<div class="columns-2 gap-4">
					{#each data.match?.isBook ? data.match.book?.images : data.match.imgs as img, i}
						{#if i != 0}
							<div class="mb-4">
								<Img
									class="rounded-sm"
									src={data.match?.isBook ? img.asset.url : img.url}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</LightBox>
		</div>
	</div>
</div>
<div class="flex w-full flex-col justify-between gap-8 lg:flex-row">
	{#if !data.match.isBook && data.match.book}
		<div class="mt-16">
			<div class="text-xl">
				<div class="pb mr-2 w-fit border-b opacity-60">
					{$lang == 'fr' ? 'Tiré du livre' : 'From the book'}
				</div>
				<div class="mt-4">
					<Link
						class="!p-0"
						href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.match.book
							.slug[$lang]?.current || data.match.book.slug.fr.current}"
						><div class="mb-2">
							{data.match.book.name[$lang] || data.match.book.name.fr}
						</div>
						<div class="w-[200px]">
							<Img
								class="rounded-sm"
								src={data.match.book.images[0].asset.url}
							/>
						</div>
					</Link>
				</div>
			</div>
		</div>
	{/if}
	<div class="w-[400px]">
		<SanityTextBlock
			class="mt-16"
			blocks={data.match.branch.description[$lang] ||
				data.match.branch.description?.fr}
		/>
	</div>
</div>
