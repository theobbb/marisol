<script>
	import './styles.css';
	import NProgress from 'nprogress';

	import './style-progress.css';
	import { navigating, page } from '$app/stores';
	import { cart, progress } from '$lib/store';
	import Header from '$lib/components/header/Header.svelte';
	import Cart from '$lib/components/header/Cart.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

	export let data;
	$progress = NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		easing: 'ease',
		template: '<div class="bar" role="bar"><div class="peg"></div></div>',
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	if (data.cart?._id) $cart = data.cart;
	//$: console.log($cart);

	$: home = $page.url.pathname == '/' || $page.url.pathname == '/en';
</script>

<div class="app font-light tracking-[0.01rem] text-stone-700">
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
