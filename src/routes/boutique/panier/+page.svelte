<script>
	import Img from '$lib/components/Img.svelte';
	import Quantity from './Quantity.svelte';
	import { cart, lang } from '$lib/store';
	import Promo from './Promo.svelte';
	import Link from '$lib/components/Link.svelte';

	export let data;

	function formatPrice(price) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price / 100);
	}
</script>

{#if $cart?.items?.length > 0}
	<div class="flex justify-between">
		<div class="w-2/3 pr-20">
			<div class="mb-14 border-b border-black/10 pb-3 text-4xl">
				{$lang == 'fr' ? 'Votre panier' : 'Your cart'}
			</div>
			<table class="w-full">
				{#each $cart.items as variant}
					<tr class="w-full gap-5 border-b border-black/10 pt-2">
						{#if variant.item}
							<td class=" h-[80px] w-[80px] py-4">
								<a
									href="{$lang == 'fr' ? '/livres' : '/en/books'}/{variant.item
										.name[$lang]}"
									><Img
										class="max-h-[80px] rounded-sm"
										src={variant.item.images[0].asset.url}
									/></a
								>
							</td>
							<td class="px-4 text-xl lg:w-2/5">
								<a
									href="{$lang == 'fr' ? '/livres' : '/en/books'}/{variant.item
										.name[$lang]}">{variant.item.name[$lang]}</a
								>
							</td>
							<td class="pr-6 text-right">
								{formatPrice(variant.unit_price)}
							</td>
							<td class="w-20">
								<div><Quantity {variant} /></div>
							</td>

							<td class="text-right">
								{formatPrice(variant.total)}
							</td>
						{/if}
					</tr>
				{/each}
			</table>
			<div class="mt-20">
				<div class="text-xl">
					{$lang == 'fr' ? 'Oublié quelque chose?' : `Forgot something?`}
				</div>
				<div class="mt-2 text-base">
					<Link button href={$lang == 'fr' ? '/boutique' : '/en/shop'}
						>{$lang == 'fr' ? 'Retour à la boutique' : 'Back to shop'}</Link
					>
				</div>
			</div>
		</div>
		<div class="w-[400px] text-base">
			<div class="mb-14 border-b border-black/10 pb-3 text-4xl">Total</div>
			<div class="divide-y">
				<div class="flex w-full justify-between pb-8">
					<Promo {formatPrice} />
				</div>
				<div class="flex w-full justify-between py-3">
					<div>
						{$lang == 'fr' ? 'Sous-total' : 'Subtotal'}
					</div>
					<div class="font-medium">
						{formatPrice($cart.subtotal)}
					</div>
				</div>
				<div class="flex w-full justify-between py-3">
					<div>
						{$lang == 'fr' ? 'Livraison' : 'Shipping'}
					</div>
					<div class="font-medium">
						{formatPrice($cart.shipping_total)}
					</div>
				</div>
				<div class="flex w-full justify-between py-3">
					<div>Taxes</div>
					<div class="font-medium">
						{formatPrice($cart.tax_total)}
					</div>
				</div>
				<div class="flex w-full justify-between pt-3 text-xl font-medium">
					<div>Total</div>
					<div class="">
						{formatPrice($cart.total)}
					</div>
				</div>
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
