<script>
	import Cart from '$lib/components/header/Cart.svelte';
	import { cart } from '$lib/store';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { page } from '$app/stores';

	export let data;

	if (data.cart) $cart = data.cart;

	$: home = $page.url.pathname == '/' || $page.url.pathname == '/en';
</script>

<div class="app">
	<Header {data} />

	<Cart />
	<main
		class="mx-3.5 {home
			? 'h-[100svh] max-h-[100svh]'
			: 'mb-44 mt-44 min-h-[100lvh] lg:mt-44'}  md:mx-8 xl:mx-16 2xl:mx-28 min-[2000px]:mx-auto min-[2000px]:max-w-[2000px]"
	>
		<slot />
	</main>
	{#if !home}
		<Footer />
	{/if}
</div>
