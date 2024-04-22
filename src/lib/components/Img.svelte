<script>
	import { onMount } from 'svelte';
	export let src = '',
		lazy = false,
		alt = '';

	let loaded = false;
	let failed = false;

	let dom = null;

	let mounted = false;
	onMount(() => {
		mounted = true;
		init();
	});

	$: src, init();

	function init() {
		if (!mounted) return;

		const img = new Image();

		if (lazy) {
			const observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					img.src = src;
					dom.src = src;
					if (img.complete) {
						loaded = true;
					} else {
						img.onload = () => {
							loaded = true;
						};
					}
				}
			});
			observer.observe(dom);

			return;
		}

		img.src = src;
		img.onload = () => {
			loaded = true;
			dom.src = src;
		};
		img.onerror = () => {
			failed = true;
			dom.src = src;
		};
	}
</script>

<img
	bind:this={dom}
	{alt}
	{...$$restProps}
	class="{loaded
		? 'opacity-100'
		: 'opacity-0'} transition duration-500 {$$props.class}"
/>
{#if lazy && !loaded}
	<div
		class="absolute left-0 top-0 h-full w-full animate-pulse rounded bg-black/5"
	></div>
{/if}
