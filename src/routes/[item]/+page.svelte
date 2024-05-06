<script>
	import { page } from '$app/stores';
	import Dialog from '$lib/Dialog.svelte';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { onMount } from 'svelte';

	export let data;

	$: item = data.paymentIntents.data.find((item) => item.id === $page.params.item);

	let cart = null;

	let payment_method = null;

	onMount(async () => {
		const cart = await data.stream.cart;

		if (!data.item?.id) return;

		const res = await fetch(`/api/payment-method/${data.item.payment_method}`);
		payment_method = await res.json();
	});

	$: shipping = data.item?.shipping;

	let receipt_open = false;

	$: console.log(payment_method);

	//$: console.log(item);
</script>

<div class="table-row relative">
	<td class="w-full !py-8 !pb-20 !px-0" colspan="4">
		{#await data.cart}
			<p>Loading...</p>
		{:then cart}
			{#if !cart}
				<p>No cart found</p>
			{:else}
				<table class="w-full">
					<tr class="border-b border-white/10">
						<th>Item</th>
						<th>Prix</th>
						<th>Quantité</th>
					</tr>
					{#each cart.items as item}
						<tr class="">
							<td class="w-full"
								><div class="flex items-center gap-4">
									<img class="size-16" src={item.image} alt={item.name} />{item.name}
								</div></td
							>
							<td>{formatPrice(item.price)}</td>
							<td>{item.quantity}</td>
						</tr>
					{/each}
					<tr>
						<td colspan="3" class="!pt-5">
							<a
								target="_blank"
								class="hover:underline !text-blue-400"
								href="https://dashboard.stripe.com/payments/{item.id}">Paiement sur stripe</a
							>
						</td>
					</tr>
				</table>

				<table class="w-fit m-auto">
					{#if payment_method}
						<tr>
							<td colspan={2} class="!pt-16 !pb-2 border-b font-bold">Facturation</td>
						</tr>
						<tr>
							<td>Nom</td>
							<td>{payment_method.billing_details.name}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{payment_method.billing_details.email}</td>
						</tr>
						<tr>
							<td>Méthode de paiement</td>
							<td>{payment_method.card.brand} - {payment_method.card.last4}</td>
						</tr>
						<tr>
							<td>Pays</td>
							<td>{payment_method.card.country}</td>
						</tr>
					{/if}

					{#if shipping}
						<tr>
							<td colspan={2}><div class="!pt-16 !pb-2 border-b font-bold">Livraison</div></td>
						</tr>
						<tr>
							<td>Ville</td>
							<td>{shipping.address.city}</td>
						</tr>
						<tr>
							<td>Pays</td>
							<td>{shipping.address.country}</td>
						</tr>
						<tr>
							<td>Adresse 1</td>
							<td>{shipping.address.line1}</td>
						</tr>
						<tr>
							<td>Adresse 2</td>
							<td>{shipping.address.line2 || ''}</td>
						</tr>
						<tr>
							<td>Code postal</td>
							<td>{shipping.address.postal_code}</td>
						</tr>
						<tr>
							<td>État</td>
							<td>{shipping.address.state}</td>
						</tr>

						<tr class="">
							<td>Nom</td>
							<td>{shipping.name}</td>
						</tr>
						<tr>
							<td>Téléphone</td>
							<td>{shipping.phone}</td>
						</tr>
					{/if}
					<tr>
						<td colspan={2}><div class="!pt-16 !pb-2 border-b font-bold">Détails</div></td>
					</tr>
					<tr>
						<td>Sous-total</td>
						<td>{formatPrice(cart.subtotal / 100)}</td>
					</tr>
					<tr>
						<td>Livraison</td>
						<td>{formatPrice(cart.shipping)}</td>
					</tr>
					<tr>
						<td>Rabais</td>
						<td>{formatPrice(cart.discount)}</td>
					</tr>
					{#each cart.taxes as tax}
						<tr>
							<td>{tax.code}</td>
							<td>{formatPrice(tax.amount / 100)}</td>
						</tr>
					{/each}
					<tr>
						<td>Total</td>
						<td>{formatPrice(cart.total / 100)}</td>
					</tr>
				</table>
			{/if}
		{:catch}
			<p>Failed to load cart</p>
		{/await}
	</td>

	<div class="absolute top-0 -left-6 rounded-b-sm w-1 h-full bg-orange-500" />
</div>

<style>
	td,
	th {
		padding: 4px 16px;
	}

	th {
		text-align: left;
	}
</style>
