<script>
	import { lang, cart } from '$lib/store';
	import Cart from '../panier/+page.svelte';
	import Total from '../panier/Total.svelte';
	import Countries from './Countries.svelte';
	import { onMount } from 'svelte';

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/boutique/validation',
		en: '/shop/checkout',
	};
	import { loadStripe } from '@stripe/stripe-js/pure';
	import Loader from '$lib/components/Loader.svelte';

	export let data;

	let elements = null;

	let loading = false;

	let stripe = null;

	let errorMessage = '';

	onMount(async () => {
		stripe = await loadStripe(
			'pk_test_51OxX1nItENF0KQtogq7Kpz1YE8fg3AwGUdnCP2sRi8ieFJiicSumoDAjFQ3srqrj4qdZAy5YZrWEzMRvEzgaL52200LfEACkwu',
			{ locale: $lang },
		);
		elements = stripe.elements({ clientSecret: data.checkout.secret });

		console.log(elements);

		const paymentElementOptions = {
			layout: 'tabs',
		};

		const emailElement = elements.create('linkAuthentication');

		const paymentElement = elements.create('payment', paymentElementOptions);

		const addressElement = elements.create('address', {
			mode: 'shipping',
		});

		emailElement.mount('#email-element');
		paymentElement.mount('#payment-element');
		addressElement.mount('#address-element');
	});

	async function handleSubmit(e) {
		e.preventDefault();
		loading = true;
		//setLoading(true);
		const { error } = await stripe.confirmPayment({
			elements: elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: 'http://localhost:5173/boutique/validation/success',
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			errorMessage = error.message;
		} else {
			errorMessage = 'An unexpected error occurred.';
		}

		console.log(error);

		loading = false;
	}
	// Fetches the payment intent status after payment submission
	async function checkStatus() {
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) {
			return;
		}

		const { paymentIntent } =
			await loadStripe.retrievePaymentIntent(clientSecret);

		switch (paymentIntent.status) {
			case 'succeeded':
				showMessage('Payment succeeded!');
				break;
			case 'processing':
				showMessage('Your payment is processing.');
				break;
			case 'requires_payment_method':
				showMessage('Your payment was not successful, please try again.');
				break;
			default:
				showMessage('Something went wrong.');
				break;
		}
	}
	function showMessage(messageText) {
		const messageContainer = document.querySelector('#payment-message');

		messageContainer.classList.remove('hidden');
		messageContainer.textContent = messageText;

		setTimeout(function () {
			messageContainer.classList.add('hidden');
			messageContainer.textContent = '';
		}, 4000);
	}
</script>

{#if loading}
	<Loader />
{/if}
<div class="md:mx-8 xl:mx-36">
	<div
		class="flex w-full flex-col-reverse justify-between gap-36 lg:flex-row lg:gap-0 lg:pt-12"
	>
		<div class="">
			<form id="payment-form" class="space-y-20">
				<div>
					<div class="mb-6 w-fit text-3xl md:text-4xl">
						{$lang == 'fr' ? 'Informations' : 'Contact info'}
					</div>
					<div class="lg:w-[500px]" id="email-element"></div>
				</div>
				<div>
					<div class="mb-6 w-fit text-3xl md:text-4xl">
						{$lang == 'fr' ? 'Adresse de livraison' : 'Shipping address'}
					</div>
					<div class="lg:w-[500px]" id="address-element"></div>
				</div>
				<div>
					<div class="mb-6 w-fit text-3xl md:text-4xl">
						{$lang == 'fr' ? 'Paiement' : 'Payment'}
					</div>

					<div id="payment-element"></div>
					<!--Stripe.js injects the Payment Element-->
				</div>

				<div>
					<button
						id="submit"
						type="submit"
						class="mt-6 rounded bg-accent px-3 py-2 text-lg font-medium text-white"
						on:click={handleSubmit}
					>
						<div class="spinner" id="spinner"></div>
						<span id="button-text"
							>{$lang == 'fr' ? 'Acheter maintenant' : 'Pay now'}</span
						>
					</button>
					<div id="payment-message" class="mt-2 text-xl font-medium">
						{errorMessage}
					</div>
				</div>
			</form>
		</div>
		<div class="relative lg:w-[400px]">
			<div class="sticky top-36 lg:pl-12"><Total /></div>
		</div>
	</div>
</div>

<div class="flex hidden w-full justify-between">
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

<style>
</style>