<script>
	import { onMount } from 'svelte';
	export let src,
		lazy = false,
		alt = '';

	let loaded = false;
	let failed = false;

	let dom;

	let observer;

	onMount(() => {
		const img = new Image();
		img.src = src;

		if (lazy) {
			observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					if (img.complete) {
						loaded = true;
					} else {
						img.onload = () => {
							loaded = true;
						};
						img.onerror = () => {
							failed = true;
						};
					}
				}
			});
			observer.observe(dom);

			return;
		}
		img.onload = () => {
			loaded = true;
		};
		img.onerror = () => {
			failed = true;
		};
	});
</script>

<img
	bind:this={dom}
	{src}
	{alt}
	{...$$restProps}
	class="{loaded
		? 'opacity-100'
		: 'opacity-0'} transition duration-500 {$$props.class}"
/>
