<script>
	import Link from '$lib/components/Link.svelte';
	import { cart, lang, lang_href } from '$lib/store.js';
	import DiscountNotice from './DiscountNotice.svelte';

	export let data;

	let subtotal = 0;

	const affiches_ids = [];

	data.shop.branches.forEach((branch) => {
		branch.products.forEach((product) => {
			if (product?.category?.slug?.fr?.current == 'impression-sur-papier-cartonne') {
				affiches_ids.push(product._id);
			}
		});
	});

	let n_affiches = 0;
	let n_books = 0;

	$: $cart, populateCart();
	function populateCart() {
		n_affiches = 0;
		n_books = 0;

		subtotal = 0;
		const allProducts = data.shop.branches.flatMap((branch) => branch.products);

		if (!$cart || !$cart.items?.length) return;

		$cart.items.forEach((item) => {
			const product = allProducts.find(
				(product) => product._id === item.product_id,
			);

			if (product?.isBook) {
				n_books += item.quantity;
			} else if (affiches_ids.includes(product._id)) {
				n_affiches += item.quantity;
			}

			if (product) {
				item.variant_name = product.variants?.find(
					(variant) => variant?.variant?._id === item.variant_id,
				).variant?.name;
			}

			if (product?.isBook) {
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
			//subtotal += item.price * item.quantity;
		});
		$cart.n_discount = n_books > 0 ? n_affiches : 0;
		//$cart.subtotal = subtotal;
	}
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

{#if $lang_href.fr != '/boutique/rabais' && $lang_href.fr != '/boutique/validation' && $lang_href.fr != '/boutique/validation/success'}
	<DiscountNotice />
{/if}

<slot />
