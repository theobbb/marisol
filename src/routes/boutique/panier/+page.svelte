<script>
	import Img from '$lib/components/Img.svelte';
	import Quantity from './Quantity.svelte';
	import { cart, lang } from '$lib/store';
	import Promo from './Promo.svelte';
	import Link from '$lib/components/Link.svelte';
	import { formatPrice } from '../lib/formatPrice';
	import Total from './Total.svelte';

	export let data;

	async function removeFromCart(variant) {
		variant.loading = true;
		try {
			const res = await fetch('/boutique/api/cart-item', {
				method: 'DELETE',
				body: JSON.stringify({
					cart_id: $cart._id,
					item_id: variant._id,
				}),
				headers: {
					'content-type': 'application/json',
				},
			});
			const data = await res.json();
			cart.set(data);
		} catch (error) {
			console.error(error);
		}
		variant.loading = false;
	}
</script>

<div class="mb-10">
	<div class="mt-2 flex items-center gap-2 text-base">
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
		<Link class="!p-0" href={$lang == 'fr' ? '/boutique' : '/en/shop'}>
			{$lang == 'fr' ? 'Retour à la boutique' : 'Back to shop'}</Link
		>
	</div>
</div>

{#if $cart?.items?.length > 0}
	<div class="flex justify-between">
		<div class="w-2/3 pr-20">
			<div class="mb-14 border-b border-black/10 pb-3 text-4xl">
				{$lang == 'fr' ? 'Votre panier' : 'Your cart'}
			</div>
			<table class="w-full">
				{#each $cart.items as variant}
					<tr
						class="w-full gap-5 border-b border-black/10 pt-2 {variant.loading
							? 'pointer-events-none opacity-40'
							: ''}"
					>
						{#if variant.product}
							<td class=" h-[80px] w-[80px] py-4">
								<a
									href="{$lang == 'fr' ? '/boutique' : '/en/shop'}/{variant
										.product.slug[$lang]?.current ||
										variant.product.slug.fr.current}"
									><Img
										class="max-h-[80px] rounded-sm"
										src={variant.product.isBook
											? variant.product.book.images[0].asset.url
											: variant.product.imgs[0]?.url}
									/></a
								>
							</td>
							<td class="px-6 text-xl lg:w-2/5">
								<a
									href="{$lang == 'fr' ? '/boutique' : '/en/shop'}/{variant
										.product.slug[$lang]?.current ||
										variant.product.slug.fr.current}"
									>{variant.product.name[$lang] || variant.product.name.fr}</a
								>
								<div class="text-base opacity-60">
									{variant.variant_name[$lang]}
								</div>
							</td>

							<td class="pr-6 text-right">
								{formatPrice(variant.price)}
							</td>
							<td class="w-20">
								<div><Quantity {variant} /></div>
							</td>

							<td class="text-right">
								{formatPrice(variant.price * variant.quantity)}
							</td>
							<td class="text-right">
								<button
									on:click={() => removeFromCart(variant)}
									class="mt-[-5px] text-2xl"
								>
									×
								</button>
							</td>
						{/if}
					</tr>
				{/each}
			</table>
		</div>
		<div class="w-[400px] text-base">
			<div class="mb-14 border-b pb-3 text-4xl">Total</div>
			<div class="divide-y">
				<div class="flex w-full justify-between pb-8">
					<Promo {formatPrice} />
				</div>
				<Total />
			</div>
			<div class="mt-14">
				<a
					href={$lang == 'fr' ? '/boutique/validation' : '/en/shop/checkout'}
					class=" rounded bg-accent px-4 py-3 text-xl font-medium text-white"
					>{$lang == 'fr' ? 'Valider la commande' : 'Checkout'}</a
				>
			</div>
		</div>
	</div>
{:else}
	<div class="flex w-full items-center justify-center">
		<div>
			<div class="mb-2 text-4xl">
				{$lang == 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
			</div>
			<div>
				<a class="text-2xl" href={$lang == 'fr' ? '/boutique' : '/en/shop'}
					>{$lang == 'fr' ? 'Retour à la boutique' : 'Back to shop'}</a
				>
			</div>
		</div>
	</div>
{/if}
