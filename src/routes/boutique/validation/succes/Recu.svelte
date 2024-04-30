<script>
	import { lang, lang_href } from '$lib/store';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { onMount } from 'svelte';

	export let data;

	$: order = data.order;

	$: locale = $lang == 'fr' ? 'fr-CA' : 'en-US';

	$: cart = data.success_cart;

	$: taxesTotal = cart.taxes.reduce((acc, tax) => acc + tax.amount, 0);

	let dom = null;
	onMount(async () => {
		if (data.success_cart.email_sent) return;

		const html = dom.outerHTML;

		console.log('html');

		fetch('/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				html,
				subject: 'Receipt from Marisol Sarrazin',
				text: 'Hello world?',
				to: data.payment_method.billing_details.email,
				from: 'info@marisolsarrazin.com',
			}),
		});

		fetch('/boutique/validation/succes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cart_id: data.success_cart._id,
				receipt: html,
			}),
		});
		data.success_cart.email_sent = true;
	});
</script>

<div
	bind:this={dom}
	style="color:#1f1f1f; font-family: Segoe UI, sans-serif; font-weight: 500; border-radius: 4px; margin: 96px auto; padding: 28px 36px; width: fit; max-width: 580px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"
>
	<div
		style="font-size: 24px; font-weight: 500; margin: auto; width: fit-content;"
	>
		{$lang == 'fr'
			? 'Reçu de Marisol Sarrazin'
			: 'Receipt from Marisol Sarrazin'}
	</div>
	<div style="margin: auto; width: fit-content;">
		nº
		{data.order.created}
	</div>

	<table style="margin-top: 24px; width: 100%;">
		<tr>
			<td>
				<div>{$lang == 'fr' ? 'Montant payé' : 'Amount paid'}</div>
				<div>{formatPrice(order.amount / 100)}</div>
			</td>
			<td style="">
				<div>{$lang == 'fr' ? 'Date du paiement' : 'Date of payment'}</div>
				<div>
					{new Date(order.created * 1000).toLocaleDateString(locale)}
				</div>
			</td>
			<td>
				<div>{$lang == 'fr' ? 'Moyen de paiement' : 'Payment method'}</div>
				<div>
					{data.payment_method.card.brand}
					- {data.payment_method.card.last4}
				</div>
			</td>
		</tr>
	</table>

	<div
		style="margin-top:48px; font-weight: 500; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.2)"
	>
		{$lang == 'fr' ? 'Résumé de la commande' : 'Order summary'}
	</div>
	<table style="width: 100%; margin-top: 24px;">
		{#each cart.items as item}
			<tr>
				<td style="padding-right: 8px;">{item.quantity} x </td>
				<td style="padding-right: 36px;">{item.name}</td>
				<td style="text-align: right;">{formatPrice(item.price)}</td>
			</tr>
		{/each}
		<tr>
			<td style="opacity: 0;">dd</td>
		</tr>
		<tr>
			<td style="opacity: 0;">dd</td>
		</tr>

		<tr>
			<td colspan="2">
				{$lang == 'fr' ? 'Sous-total' : 'Subtotal'}
			</td>
			<td style="text-align: right;">{formatPrice(cart.subtotal / 100)}</td>
		</tr>
		{#if cart.discounts}
			<tr>
				<td colspan="2">
					{$lang == 'fr' ? 'Rabais' : 'Discounts'}
				</td>
				<td style="text-align: right;"
					>{formatPrice((cart.discounts || 0) / 100)}</td
				>
			</tr>
		{/if}

		{#each cart.taxes as tax}
			<tr>
				<td> </td>
				<td style="text-align: right;">{tax.code}</td>
				<td style="text-align: right;"
					>{formatPrice((tax.amount || 0) / 100)}</td
				>
			</tr>
		{/each}
		<tr>
			<td colspan="2"> Taxes </td>
			<td style="text-align: right;">{formatPrice(taxesTotal / 100)}</td>
		</tr>
		<tr>
			<td colspan="2">
				{$lang == 'fr' ? 'Livraison' : 'Shipping'}
			</td>
			<td style="text-align: right;">{formatPrice(cart.shipping)}</td>
		</tr>
		<tr style="font-weight: 500;">
			<td colspan="2"> Total </td>
			<td style="text-align: right;">{formatPrice(cart.total / 100)}</td>
		</tr>
	</table>

	<div
		style="margin-top: 36px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.2); "
	></div>
</div>
