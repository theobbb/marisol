<script>
	import { onMount } from 'svelte';
	import HeaderLinks from './HeaderLinks.svelte';
	import Lang from './Lang.svelte';
	import { lang, invert } from '$lib/store';
	import { navigating, page } from '$app/stores';
	import { links } from './links';

	import Toggle from './Toggle.svelte';

	export let data;

	let dom = {};

	let mobileMenuOpen = false;
	$: $invert =
		($page.url.pathname == '/' || $page.url.pathname == '/en') && !menuOpen;

	$: console.log($invert);
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
	let mobile = false;
	let lastWidth;
	function onResize() {
		if (!dom.header || !dom.header.offsetWidth) return;
		if (dom.header.offsetWidth == lastWidth) return;

		lastWidth = dom.header.offsetWidth;
		mobile = dom.header.offsetWidth < 1120;
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
		: 'h-[54px] shadow min-[1120px]:h-[60px]'} {menuOpen
		? '!h-[100%] bg-white/80 '
		: topPage
			? ''
			: 'bg-white/80'} {$invert
		? 'text-white'
		: ''} pointer-events-none transition-all duration-500 ease-in-out"
>
	<div
		class="flex h-[100lvh] w-full flex-col gap-6 font-light min-[1120px]:h-[auto] min-[1120px]:flex-row min-[1120px]:gap-1 {big
			? ''
			: 'min-[1120px]:translate-y-[-10px]'} {menuOpen
			? ''
			: ''} transition duration-500 ease-in-out"
	>
		<div
			class="relative z-10 z-20 flex w-full justify-between px-3.5 md:pl-8 xl:pl-16 2xl:pl-28"
		>
			<div
				class="group pointer-events-auto flex w-full justify-between min-[1120px]:w-[auto] min-[1120px]:justify-start"
			>
				<a
					href={$lang == 'fr' ? '/' : '/en'}
					class="flex flex-col gap-1 whitespace-nowrap pt-3 min-[1120px]:gap-2 min-[1120px]:pt-5 {$invert
						? 'brightness-[1.2]'
						: ''}"
				>
					<div
						style=""
						class="text-2xl text-accent min-[1120px]:text-3xl {big
							? ''
							: 'scale-y-[2]-'}  origin-top transition duration-500 ease-in-out"
					>
						Marisol Sarrazin
					</div>
					<div
						class="text- text-sm text-stone-400 min-[1120px]:text-base {big
							? ''
							: 'scale-[0] opacity-0'} origin-top-left transition duration-500 ease-in-out"
					>
						ART / DESIGN
					</div>
				</a>
				<a
					href={$lang == 'fr' ? '/' : '/en'}
					class="relative mr-2 w-[80px] select-none transition duration-500 ease-in-out min-[1120px]:mr-0 2xl:w-[100px] {big
						? ''
						: '-translate-y-[120%] rotate-[-20deg] scale-[0.7] opacity-0'}  {$invert
						? ''
						: ''}"
				>
					<img
						src="/girafe2.png"
						class=" absolute w-full origin-top-right object-cover transition duration-300 ease-in-out group-hover:min-[1120px]:translate-y-[-3%] group-hover:min-[1120px]:rotate-[-5deg] group-hover:min-[1120px]:scale-[1.1]"
						alt="Welcome"
					/>
				</a>
			</div>
			<div
				class=" min-[1120px]:hidden {big
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
			class="bg-white/90- pointer-events-none ml-6 flex h-full flex-col items-start justify-start gap-8 px-3.5 pt-4 md:gap-2 md:pr-8 min-[1120px]:ml-0 min-[1120px]:h-[auto] min-[1120px]:items-end min-[1120px]:bg-transparent xl:pr-16 2xl:pr-28 {menuOpen
				? ''
				: 'translate-y-[-50px] opacity-0 min-[1120px]:translate-y-0 min-[1120px]:opacity-100'} transition duration-500 ease-in-out"
		>
			<div
				class="min-[1120px]:pointer-events-auto {big
					? ''
					: 'min-[1120px]:scale-[0] min-[1120px]:opacity-0'} {menuOpen
					? 'pointer-events-auto'
					: ''} order-[2] origin-top-right transition duration-500 ease-in-out min-[1120px]:order-[unset]"
			>
				<Lang {activeLinkIndex} />
			</div>
			<div
				class="min-[1120px]:pointer-events-auto {big
					? ''
					: 'opacity-0 min-[1120px]:translate-y-[-42px] min-[1120px]:opacity-100'} {menuOpen
					? 'pointer-events-auto'
					: ''} mt-24 origin-bottom transition duration-500 ease-in-out min-[1120px]:mt-0"
			>
				<HeaderLinks {activeLinkIndex} {data} />
			</div>
			<div
				class="min-[1120px]:pointer-events-auto {big
					? ''
					: 'min-[1120px]:scale-[0] min-[1120px]:opacity-0'} {menuOpen
					? 'pointer-events-auto'
					: ''} {$invert
					? 'invert-[0.9]'
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
