<script>
	import { lang, lang_href } from '$lib/store';

	export let data;
	console.log(data.order);

	$: order = data.order;

	$lang_href = {
		fr: '/boutique/validation/recu',
		en: '/boutique/validation/recu',
	};

	$: locale = $lang == 'fr' ? 'fr-CA' : 'en-US';

	// Create our number formatter.
	const formatCurrency = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: data.order.currency.toUpperCase() || 'USD',

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});
	console.log(formatCurrency.format(data.order.amount / 100));
</script>

<div style="margin: auto; width: fit; max-width: 800px;">
	<div
		style="display: flex; flex-direction: column; gap: 12px; align-items: center;"
	>
		<div style="font-size: 24px; font-weight: 500;">
			Recu de Marisol Sarrazin
		</div>
		<div>
			{$lang == 'fr' ? 'Reçu nº' : 'Receipt nº'}
			{data.order.created}
		</div>

		<div style="display: flex; gap: 48px; margin-top: 24px;">
			<div>
				<div>{$lang == 'fr' ? 'Montant payé' : 'Amount paid'}</div>
				<div>{formatCurrency.format(order.amount / 100)}</div>
			</div>
			<div style="">
				<div>{$lang == 'fr' ? 'Date du paiement' : 'Date of payment'}</div>
				<div>
					{new Date(order.created * 1000).toLocaleString(locale)}
				</div>
			</div>
			<div>
				<div>{$lang == 'fr' ? 'Moyen de paiement' : 'Payment method'}</div>
			</div>
		</div>
	</div>
</div>
