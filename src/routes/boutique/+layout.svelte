<script>
	import { cart } from '$lib/store.js';

	export let data;

	if (data.store.cart) cart.set(data.store.cart);

	$: $cart, populateCart();
	function populateCart() {
		if ($cart?.items?.length < 1) return;

		$cart.items.forEach((item) => {
			const product_id = item.variant.product_id;

			item.item = data.store.products.find((p) => p.id === product_id)?.item;
		});
	}
</script>

<slot />
