<script>
	import Cart from '$lib/components/header/Cart.svelte';
	import { cart } from '$lib/store';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';

	export let data;

	if (data.cart) $cart = data.cart;
</script>

<div class="app">
	<Header {data} />

	<Cart />
	<main
		class="mx-3.5 mb-44 mt-44 min-h-[100lvh] md:mx-8 lg:mt-44 xl:mx-16 2xl:mx-28 min-[2000px]:mx-auto min-[2000px]:max-w-[2000px]"
	>
		<slot />
	</main>

	<Footer />
</div>
