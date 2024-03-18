<script>
	import { cart, lang } from '$lib/store';

	export let variant;

	let loading = false;

	async function updateQuantity(newQuantity) {
		if (newQuantity < 1) {
			removeFromCart();
			return;
		}

		newQuantity = Math.min(Math.floor(newQuantity), variant.stock);

		loading = true;

		try {
			const res = await fetch('/boutique/api/cart-item', {
				method: 'PUT',
				body: JSON.stringify({
					cart_id: $cart._id,
					item_id: variant._id,
					quantity: newQuantity,
				}),
				headers: {
					'content-type': 'application/json',
				},
			});

			const data = await res.json();

			$cart = data;
			cart.set(data);
		} catch (error) {
			console.error(error);
		}

		loading = false;
	}
	async function removeFromCart() {
		loading = true;
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
