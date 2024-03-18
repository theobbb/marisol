<script>
	import { lang } from '$lib/store';
	import Cart from '../panier/+page.svelte';
	import Total from '../panier/Total.svelte';
	import Countries from './Countries.svelte';

	export let data;
</script>

<div class="flex w-full justify-between">
	<div class="w-[700px] space-y-4 divide-y">
		<div class="w-full">
			<div>
				{$lang == 'fr'
					? `Cette adresse sera utilisée pour vous envoyer des détails et des mises à
				jour concernant votre commande.`
					: `This address will be used to send you details and updates about your order.`}
			</div>
			<input
				id="email"
				name="email"
				placeholder="email"
				type="email"
				class="w-[400px] rounded-sm border px-3 py-2 placeholder-black/50"
			/>
		</div>
		<div>
			<div class="mb-6 text-3xl">
				{$lang == 'fr' ? 'Adresse de livraison' : 'Shipping address'}
			</div>
			<input
				id="name"
				name="name"
				placeholder={$lang == 'fr' ? 'Nom complet' : 'Full name'}
				type="text"
				autocomplete="name"
				class="w-[400px] rounded-sm border px-3 py-2 placeholder-black/50"
			/>
			<input
				id="address"
				name="address"
				placeholder={$lang == 'fr' ? 'Adresse' : 'Address'}
				type="text"
				autocomplete="street-address"
				required
				class="w-[400px] rounded-sm border px-3 py-2 placeholder-black/50"
			/>
			<select
				id="country"
				name="country"
				placeholder="Country"
				type="text"
				autocomplete="country"
				required
				class="w-[400px] rounded-sm border px-3 py-2 placeholder-black/50"
			>
				<Countries />
			</select>
			<input
				id="zip"
				name="zip"
				placeholder={$lang == 'fr' ? 'Code postal' : 'Postal code'}
				type="text"
				autocomplete="postal-code"
				required
				class="w-[400px] rounded-sm border px-3 py-2 placeholder-black/50"
			/>
			<input
				id="city"
				name="city"
				placeholder={$lang == 'fr' ? 'Ville' : 'City'}
				type="text"
				autocomplete="address-level2"
				required
				class="w-[400px] rounded-sm border px-3 py-2 placeholder-black/50"
			/>
		</div>
		<div class="flex pt-8">
			<input
				dir="ltr"
				type="text"
				inputmode="numeric"
				name="number"
				placeholder="1234 1234 1234 1234"
				autocomplete="billing cc-number"
				aria-invalid="false"
				aria-describedby="null knownCardBrandDesc cardBrandIconsDesc"
				aria-required="true"
				class="w-1/2 w-[400px] rounded-sm border px-3 py-2 placeholder-black/50 outline-none"
				value=""
			/>
			<input
				dir="ltr"
				type="text"
				inputmode="numeric"
				name="expiry"
				id="Field-expiryInput"
				placeholder="MM / AA"
				autocomplete="billing cc-exp"
				aria-invalid="false"
				aria-required="true"
				class="p-Input-input rounded-sm border border-l-0 px-3 py-2 placeholder-black/50 outline-none"
				value=""
			/>
			<input
				dir="ltr"
				type="text"
				inputmode="numeric"
				name="cvc"
				id="Field-cvcInput"
				placeholder="CVC"
				autocomplete="billing cc-csc"
				aria-invalid="false"
				aria-required="true"
				class="p-Input-input w-1/4 rounded-sm border border-l-0 px-3 py-2 placeholder-black/50 outline-none"
				value=""
			/>
		</div>
	</div>
	<div class="w-[400px]">
		<div class="mb-14 border-b border-b pb-3 text-4xl">Total</div>
		<div><Total /></div>
	</div>
</div>
