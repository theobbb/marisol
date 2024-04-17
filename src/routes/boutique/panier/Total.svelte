<script>
	import { cart } from '$lib/store.js';
	import { formatPrice } from '../lib/formatPrice';
	import { lang } from '$lib/store';

	$: taxesTotal = $cart.taxes.reduce((acc, tax) => acc + tax.amount, 0);

	$: multipleTaxes = $cart.taxes?.length > 1;
</script>

<div class="divide-y">
	<div class="flex w-full justify-between py-3">
		<div>
			{$lang == 'fr' ? 'Sous-total' : 'Subtotal'}
		</div>
		<div class="font-medium">
			{formatPrice($cart.subtotal / 100)}
		</div>
	</div>
	<div class="flex w-full justify-between py-3">
		<div>
			{$lang == 'fr' ? 'Livraison' : 'Shipping'}
		</div>
		<div class="font-medium">
			{formatPrice(0)}
		</div>
	</div>
	<div class="flex w-full flex-col justify-between py-3">
		{#if multipleTaxes}
			<div class=" flex flex-col gap-1">
				{#each $cart.taxes as tax}
					<div class="flex items-baseline justify-end gap-8">
						<div class=" text-right text-sm">
							{tax.code}
						</div>
						<div class="font-medium">
							{formatPrice(tax.amount / 100)}
						</div>
					</div>
				{/each}
			</div>
		{/if}
		<div class="flex items-baseline justify-between gap-4 pt-6">
			<div>Taxes</div>
			{#if !multipleTaxes}
				<div class="text-sm">
					{$cart.taxes[0]?.code || ''}
				</div>
			{/if}

			<div class="font-medium">
				{formatPrice(taxesTotal / 100)}
			</div>
		</div>
	</div>

	<div class="flex w-full justify-between pt-3 text-xl font-medium">
		<div>Total</div>
		<div class="">
			{formatPrice($cart.total / 100)}
		</div>
	</div>
</div>
