<script>
	import Img from '$lib/components/Img.svelte';
	import Link from '$lib/components/Link.svelte';
	import { cart, lang } from '$lib/store';
	import SanityTextBlock from '$lib/components/SanityTextBlock.svelte';
	import { formatPrice } from '../lib/formatPrice';
	import LightBox from '$lib/components/LightBox.svelte';

	export let data;

	$: match = data.match;

	let loading = false;

	async function addToCart(variant) {
		if (!variant) return;
		loading = true;
		if (!$cart) {
			const res = await fetch('/boutique/api/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			$cart = data;
		}

		try {
			const res = await fetch('/boutique/api/cart-item', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart_id: $cart._id,
					product_id: match._id,
					variant_id: variant.variant._id,
				}),
			});
			const data = await res.json();

			$cart = data;
		} catch (error) {
			console.error(error);
		}
		loading = false;
	}
	console.log(data);
</script>

<div class="mb-8">
	<Link
		class="flex items-center gap-2 !px-0 !py-0"
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
<div class="border-b pb-10">
	<div class="relative flex">
		<div class="relative lg:w-1/2">
			<div class="sticky top-36">
				<div class="text-4xl">
					{#if data.match.isBook}
						<Link
							class="!p-0"
							href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.match.book
								.slug[$lang]?.current || data.match.book.slug.fr.current}"
							>{data.match.name[$lang] || data.match.name.fr}</Link
						>
					{:else}
						{data.match.name[$lang] || data.match.name.fr}
					{/if}
				</div>
				<div class="mt-2">
					<Link
						class="!p-0"
						href={data.match.branch.slug[$lang]?.current ||
							data.match.branch.slug.fr.current}
						>{data.match.branch.name[$lang] || data.match.branch.name.fr}</Link
					>
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
				<div class="mt-32 {loading ? 'pointer-events-none opacity-30' : ''}">
					{#each data.match.variants as variant}
						<div class="mb-12">
							<div class="text-lg">
								<div class=" font-medium">
									{formatPrice(variant.price)}
								</div>
								<div class="text-black/50">
									{variant.variant.name[$lang] || variant.variant.name.fr}
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
				</div>
			</div>
		</div>
		<div class="lg:w-1/2">
			<LightBox>
				<div class="mb-4">
					<Img
						class="rounded-sm"
						src={data.match.isBook
							? data.match.book?.images[0].asset.url
							: data.match.imgs[0].url}
					/>
				</div>
				<div class="columns-2 gap-4">
					{#each data.match.isBook ? data.match.book?.images : data.match.imgs as img, i}
						{#if i != 0}
							<div class="mb-4">
								<Img class="rounded-sm" src={img.asset.url} />
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
					<a
						href="{$lang == 'fr' ? '/livres' : '/en/books'}/{data.match.book
							.slug[$lang].current}"
						><div class="mb-2">{data.match.book.name[$lang]}</div>
						<div class="w-[200px]">
							<Img
								class="rounded-sm"
								src={data.match.book.images[0].asset.url}
							/>
						</div>
					</a>
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
