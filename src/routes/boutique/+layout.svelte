<script>
	import { cart } from '$lib/store.js';

	export let data;

	let subtotal = 0;

	$: $cart, populateCart();
	function populateCart() {
		subtotal = 0;
		const allProducts = data.shop.branches.flatMap((branch) => branch.products);

		if (!$cart || !$cart.items?.length) return;

		$cart.items.forEach((item) => {
			const product = allProducts.find(
				(product) => product._id === item.product_id,
			);
			console.log(product.variants);
			return;
			if (product) {
				item.variant_name = product.variants?.find(
					(variant) => variant?.variant?._id === item.variant_id,
				).variant?.name;
			}

			if (product.isBook) {
				product.book = data.books.find(
					(book) => book._id === product.book_ref._ref,
				);
			}

			item.product = product;
			if (!product) return;
			const variantData = product.variants.find(
				(variant) => variant?.variant?._id === item.variant_id,
			);

			if (!variantData) return;
			item.price = variantData.price;
			item.stock = variantData.stock;
			subtotal += item.price * item.quantity;
		});
		$cart.subtotal = subtotal;
	}
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<slot />
