<script>
	import Img from '$lib/components/Img.svelte';
	import Quantity from './Quantity.svelte';
	import { cart, lang, progress } from '$lib/store';
	import Promo from './Promo.svelte';
	import Link from '$lib/components/Link.svelte';
	import { formatPrice } from '../lib/formatPrice';
	import Total from './Total.svelte';

	import { lang_href } from '$lib/store';
	import { onMount } from 'svelte';
	$lang_href = {
		fr: '/boutique/panier',
		en: '/shop/cart',
	};
	export let data;
	let address = {};

	let mounted = false;
	onMount(async () => {
		const res = await fetch(
			'https://api.geoapify.com/v1/ipinfo?&apiKey=d17169cfe2ce4af09b078c21e271b9c2',
			{
				headers: {
					Accept: 'application/json',
				},
			},
		);
		const data = await res.json();

		$cart.currency = data.country.currency;

		const codes = {
			Canada: 'CA',
			'United States': 'US',
			Quebec: 'QC',
			Ontario: 'ON',
			'British Columbia': 'BC',
			Alberta: 'AB',
			Manitoba: 'MB',
			Saskatchewan: 'SK',
			'Nova Scotia': 'NS',
			'New Brunswick': 'NB',
			'Newfoundland and Labrador': 'NL',
			'Prince Edward Island': 'PE',
			'Northwest Territories': 'NT',
			Nunavut: 'NU',
			Yukon: 'YT',
		};
		const country = codes[data.country.name];
		const state = codes[data.state.name];

		address = {
			country,
			state,
		};
		mounted = true;
		//calculateTotal();
	});
	let calculating = false;
	let lastTotal = 0;
	$: $cart, shouldCalculateTotal();

	function shouldCalculateTotal() {
		if (!mounted || !$cart) return;
		let total = 0;
		$cart.items?.forEach((item) => {
			total += item.price * item.quantity;
		});
		if (total !== lastTotal && !calculating) {
			lastTotal = total;
			//console.log('calculating total', total);
			calculateTotal();
		}
	}

	async function calculateTotal() {
		calculating = true;
		try {
			const res = await fetch('/boutique/api/cart-address', {
				method: 'POST',
				body: JSON.stringify({ address }),
				headers: {
					'content-type': 'application/json',
				},
			});
			const data = await res.json();

			cart.set(data);
		} catch (error) {
			console.error(error);
		}
		calculating = false;
	}

	async function removeFromCart(variant) {
		$progress.start();
		$cart.loading = true;
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
		$cart.loading = false;
		$progress.done();
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
	<div
		class="flex flex-col justify-between gap-24 lg:flex-row lg:gap-0 {$cart.loading ||
		calculating
			? 'pointer-events-none animate-pulse opacity-50'
			: ''}"
	>
		<div class="lg:w-2/3 lg:pr-20">
			<div class="mb-14 border-b border-black/10 pb-3 text-4xl">
				{$lang == 'fr' ? 'Votre panier' : 'Your cart'}
			</div>
			<table class="flex w-full flex-col lg:table">
				{#each $cart.items as variant}
					{@const price = variant.price * (1 - (variant.discount || 0))}
					<tr
						class="flex w-full flex-wrap gap-5 border-b border-black/10 pt-2 lg:table-row {variant.loading
							? 'pointer-events-none opacity-40'
							: ''}"
					>
						{#if variant.product}
							<td class="h-[80px] w-[80px] min-w-[80px] pt-2 lg:py-4 lg:pt-4">
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
							<td class="w-[calc(100%-100px)] text-xl lg:w-2/5 lg:px-6">
								<a href={variant.product.constr_slug[$lang]}
									>{variant.product.name[$lang] || variant.product.name.fr}</a
								>
								<div class="flex gap-1 text-base opacity-60">
									<div>{variant.product.branch.name[$lang]}</div>
									{#if variant.product.category && variant.product.category.name}
										<div class="">
											- {variant.product.category.name[$lang]}
										</div>
									{/if}
									{#if variant.variant_name && variant.variant_name.fr != ''}
										<div class="">
											- {variant.variant_name[$lang]}
										</div>
									{/if}
								</div>
							</td>

							<td
								class="w-full pl-[100px] lg:w-[auto] lg:pl-0 lg:pr-6 lg:text-right"
							>
								{#if variant.quantity > 1 || price != variant.price}
									{#if price != variant.price}
										<span class="mr-4 line-through decoration-red-500"
											>{formatPrice(variant.price)}</span
										>
									{/if}
									{formatPrice(price)}
								{/if}
							</td>
							<td class="w-[full] pl-[100px] lg:w-20 lg:pl-0">
								<div><Quantity {variant} /></div>
							</td>

							<td
								class="w-[full] pl-[100px] lg:w-20 lg:w-[auto] lg:pl-0 lg:text-right"
							>
								{formatPrice(price * variant.quantity)}
							</td>
							<td class="w-full pb-4 text-right lg:w-[auto] lg:pb-0">
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
		<div class="text-base lg:w-[400px]">
			<div class="mb-14 border-b pb-3 text-4xl">Total</div>
			<div class="divide-y">
				<!--
				<div class="flex w-full justify-between pb-8">
					<Promo {formatPrice} />
				</div>
				-->
				<Total iscart />
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
