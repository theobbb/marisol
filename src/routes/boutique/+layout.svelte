<script>
	import Link from '$lib/components/Link.svelte';
	import { cart, lang } from '$lib/store.js';

	export let data;

	let subtotal = 0;

	const affiches_ids = [];

	data.shop.branches.forEach((branch) => {
		branch.products.forEach((product) => {
			if (product?.category?.slug?.fr?.current == 'impression-sur-carton') {
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
		console.log('populateCart');
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
				console.log('affiche', product);
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
		//$cart.subtotal = subtotal;
	}
	$: $cart.n_discount = n_books > 0 ? n_affiches : 0;
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<div class="m-auto mb-10 w-fit rounded py-2">
	<div class="leading-5">
		<span class="mr-1 inline-block align-text-bottom">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				class="fill-accent"
				viewBox="0 -960 960 960"
				width="24"
				><path
					d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
				/></svg
			>
		</span>
		<span class="inline-block">
			{#if $lang == 'fr'}
				{#if $cart.n_discount == 0}
					Achetez un livre et bénéficiez d'un rabais de 10% sur une impression
					en carton!
				{:else if $cart.n_discount == 1}
					20% de rabais sur votre deuxième impression en carton!
				{:else if $cart.n_discount == 2}
					30% de rabais sur votre deuxième impression en carton!
				{/if}

				{#if $cart.n_discount == 2}
					Achetez un livre et bénéficiez d'un rabais de 10% sur une impression
					en carton!
				{/if}
				{$cart.n_discount > 1 ? 30 : $cart.n_discount == 1 ? 20 : 10}% sur {$cart.n_discount >
				0
					? 'vos impressions'
					: 'une impression'} en carton!
			{/if}
			{$lang == 'fr'
				? `Achetez un livre et bénéficiez d'un rabais de 10% sur une impression en carton!`
				: `Buy a book and get a 10% discount on a cardboard print!`}
		</span>
	</div>
	<div class="mt-1">
		<a
			href="/{$lang == 'fr' ? 'boutique/rabais' : 'shop/discounts'}"
			class="!p-0 decoration-black/40 underline-offset-4 opacity-60 hover:underline"
			>Voir tous les rabais en cours</a
		>
	</div>
</div>
<slot />
