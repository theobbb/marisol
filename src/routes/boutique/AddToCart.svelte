<script>
	import { cart, progress } from '$lib/store';

	export let product, variant;

	async function addToCart() {
		$progress.start();

		try {
			if (!$cart) {
				const post_cart = await fetch('/boutique/api/cart', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const posted = await post_cart.json();
				if (posted?._id) $cart = posted;
			}
			console.log(product);
			if (!$cart?._id || !product?._id || !variant?.variant?._id) return;

			let img = '';
			if (product.isBook) {
				img = product.book.images[0].asset.url;
			} else {
				img = product.imgs[0].url;
			}

			const res = await fetch('/boutique/api/cart-item', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart_id: $cart._id,
					product_id: product._id,
					variant_id: variant.variant._id,
					img,
				}),
			});
			const data = await res.json();
			if (data?._id) $cart = data;
		} catch (error) {
			console.error(error);
		}

		$progress.done();
	}
</script>

<div>
	<button on:click={addToCart} class="opacity-30">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			><path d="M0 0h24v24H0zm18.31 6l-2.76 5z" fill="none" class="" /><path
				d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"
			/></svg
		>
	</button>
</div>
