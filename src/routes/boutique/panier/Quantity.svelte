<script>
	import { cart, lang } from '$lib/store';

	export let variant;

	let loading = false;

	async function updateQuantity(newQuantity) {
		if (newQuantity < 1) {
			removeFromCart();
			return;
		}
		newQuantity = Math.min(
			Math.floor(newQuantity),
			variant.variant.inventory_quantity,
		);

		loading = true;
		const res = await fetch('/boutique/api/cart-item', {
			method: 'PUT',
			body: JSON.stringify({
				cart_id: $cart.id,
				id: variant.id,
				quantity: newQuantity,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});

		if (res.status == 200) {
			const data = await res.json();

			data.message =
				$lang == 'fr' ? 'Quantité mise à jour' : 'Quantity updated';
			cart.set(data);
		} else {
			const data = await res.json();
		}
		loading = false;
	}
	async function removeFromCart() {
		loading = true;
		const res = await fetch('/boutique/api/cart-item', {
			method: 'DELETE',
			body: JSON.stringify({
				cart_id: $cart.id,
				id: variant.id,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});

		if (res.ok) {
			const data = await res.json();

			cart.set(data);
		}
		loading = false;
	}
	let input = null;
	function onchange(e) {
		if (isNaN(e.target.value)) {
			input.value = variant.quantity;
			return;
		}
		const quantity = Number(e.target.value);
		updateQuantity(quantity);

		//updateQuantity(e.target.value);
	}
</script>

<div
	class="flex rounded-sm border border-black/10 py-1 {loading
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<button
		class="mt-[-3px] px-3"
		on:click={() => updateQuantity(variant.quantity - 1)}
	>
		-
	</button>
	<input
		bind:this={input}
		type="text"
		class="w-12 border-x border-black/10 text-center"
		on:change={onchange}
		value={variant.quantity}
	/>
	<button
		class="mt-[-3px] px-3"
		on:click={() => updateQuantity(variant.quantity + 1)}
	>
		+
	</button>
</div>
