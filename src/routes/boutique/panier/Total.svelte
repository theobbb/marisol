<script>
	import { cart } from '$lib/store.js';
	import { formatPrice } from '../lib/formatPrice';
	import { lang } from '$lib/store';
</script>

<div class="divide-y">
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
			{formatPrice(0)}
		</div>
	</div>
	<div class="flex w-full justify-between py-3">
		<div>Taxes</div>
		<div class="font-medium">
			{formatPrice(0)}
		</div>
	</div>
	<div class="flex w-full justify-between pt-3 text-xl font-medium">
		<div>Total</div>
		<div class="">
			{formatPrice($cart.subtotal)}
		</div>
	</div>
</div>
