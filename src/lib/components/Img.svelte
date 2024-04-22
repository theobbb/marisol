<script>
	import { onMount } from 'svelte';
	export let src,
		lazy = false,
		alt = '';

	let loaded = false;
	let failed = false;

	let dom;

	onMount(() => {
		const img = new Image();

		if (lazy) {
			const observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					img.src = src;
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
		};
		img.onerror = () => {
			failed = true;
		};
	});
</script>

<img
	bind:this={dom}
	{alt}
	{src}
	{...$$restProps}
	class="{loaded
		? 'opacity-100'
		: 'opacity-0'} transition duration-500 {$$props.class}"
/>
