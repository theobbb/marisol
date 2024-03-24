<script>
	import { onMount } from 'svelte';
	import HeaderLinks from './HeaderLinks.svelte';
	import Lang from './Lang.svelte';
	import { lang } from '$lib/store';
	import { navigating, page } from '$app/stores';
	import { links } from './links';

	import Toggle from './Toggle.svelte';
	import Cart from './Cart.svelte';

	export let data;

	let dom = {};

	onMount(() => {
		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', onResize);

		onScroll();

		const observer = new ResizeObserver(onResize).observe(dom.header);

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (observer) observer.disconnect();
		};
	});

	let topPage = true;

	function onScroll() {
		if (window.scrollY > 0) {
			topPage = false;
		} else {
			topPage = true;
		}
	}

	let lastWidth;
	function onResize() {
		if (!dom.header || !dom.header.offsetWidth) return;
		if (dom.header.offsetWidth == lastWidth) return;

		lastWidth = dom.header.offsetWidth;

		menuOpen = false;
	}

	$: big = topPage || menuOpen;

	$: activeLinkIndex = links.findIndex(
		(link) =>
			link.fr.href == $page.url.pathname ||
			link.en.href == $page.url.pathname.replace('/en', ''),
	);

	let menuOpen = false;

	$: if ($navigating) {
		menuOpen = false;
	}
</script>

<div
	class="pointer-events-none fixed inset-0 z-10 bg-black/70 {menuOpen
		? ''
		: 'opacity-0 delay-100'} transition-all duration-500 ease-in-out"
/>
<header
	bind:this={dom.header}
	style={!topPage ? 'backdrop-filter: blur(6px);' : ''}
	class="fixed left-0 top-0 z-[200] w-full {big
		? 'h-[160px]'
		: 'h-[54px] shadow lg:h-[60px]'} {menuOpen
		? '!h-[100%] bg-white/80 '
		: topPage
			? ''
			: 'bg-white/80'} pointer-events-none transition-all duration-500 ease-in-out"
>
	<div
		class="flex h-[100lvh] w-full flex-col gap-6 font-light lg:h-[auto] lg:flex-row lg:gap-1 {big
			? ''
			: 'lg:translate-y-[-10px]'} {menuOpen
			? ''
			: ''} transition duration-500 ease-in-out"
	>
		<div
			class="relative z-10 z-20 flex w-full justify-between px-3.5 md:pl-8 xl:pl-16 2xl:pl-28"
		>
			<div
				class="group pointer-events-auto flex w-full justify-between lg:w-[auto] lg:justify-start"
			>
				<a
					href={$lang == 'fr' ? '/' : '/en'}
					class="flex flex-col gap-1 whitespace-nowrap pt-3 lg:gap-2 lg:pt-5"
				>
					<div
						style=""
						class="text-2xl text-accent lg:text-3xl {big
							? ''
							: 'scale-y-[2]-'} origin-top transition duration-500 ease-in-out"
					>
						Marisol Sarrazin
					</div>
					<div
						class="text- text-sm text-stone-400 lg:text-base {big
							? ''
							: 'scale-[0] opacity-0'} origin-top-left transition duration-500 ease-in-out"
					>
						ART / DESIGN
					</div>
				</a>
				<a
					href={$lang == 'fr' ? '/' : '/en'}
					class="relative mr-2 w-[80px] select-none transition duration-500 ease-in-out lg:mr-0 2xl:w-[100px] {big
						? ''
						: '-translate-y-[120%] rotate-[-20deg] scale-[0.7] opacity-0'}"
				>
					<img
						src="/girafe2.png"
						class=" absolute w-full origin-top-right object-cover transition duration-300 ease-in-out group-hover:lg:translate-y-[-3%] group-hover:lg:rotate-[-5deg] group-hover:lg:scale-[1.1]"
						alt="Welcome"
					/>
				</a>
			</div>
			<div
				class=" lg:hidden {big
					? ''
					: 'scale-y-[2]-'} origin-top transition duration-500 ease-in-out"
			>
				<button
					class="pointer-events-auto p-1 focus:outline-none"
					on:click|stopPropagation={() => {
						menuOpen = !menuOpen;
					}}
				>
					<Toggle {menuOpen} />
				</button>
			</div>
		</div>

		<div
			class="bg-white/90- pointer-events-none ml-6 flex h-full flex-col items-start justify-start gap-8 px-3.5 pt-4 md:gap-2 md:pr-8 lg:ml-0 lg:h-[auto] lg:items-end lg:bg-transparent xl:pr-16 2xl:pr-28 {menuOpen
				? ''
				: 'translate-y-[-50px] opacity-0 lg:translate-y-0 lg:opacity-100'} transition duration-500 ease-in-out"
		>
			<div
				class="lg:pointer-events-auto {big
					? ''
					: 'lg:scale-[0] lg:opacity-0'} {menuOpen
					? 'pointer-events-auto'
					: ''} order-[2] origin-top-right transition duration-500 ease-in-out lg:order-[unset]"
			>
				<Lang {activeLinkIndex} />
			</div>
			<div
				class="lg:pointer-events-auto {big
					? ''
					: 'opacity-0 lg:translate-y-[-42px] lg:opacity-100'} {menuOpen
					? 'pointer-events-auto'
					: ''} mt-24 origin-bottom transition duration-500 ease-in-out lg:mt-0"
			>
				<HeaderLinks {activeLinkIndex} {data} />
			</div>
			<div
				class="lg:pointer-events-auto {big
					? ''
					: 'lg:scale-[0] lg:opacity-0'} {menuOpen
					? 'pointer-events-auto'
					: ''} order-[3] origin-top-right transition duration-500 ease-in-out"
			>
				<a
					class="mt-2"
					href="https://www.instagram.com/marisolsarrazin/"
					target="_blank"
					><img class="h-[26px] w-[26px]" src="/instagram.png" /></a
				>
			</div>
		</div>
	</div>
</header>
