<script>
	import Link from '$lib/components/Link.svelte';
	import { lang } from '$lib/store';
	import { onMount } from 'svelte';

	import Masonry from '$lib/components/Masonry.svelte';

	export let data;

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/portfolio',
		en: '/portfolio',
	};

	onMount(() => {
		setCols();

		window.addEventListener('resize', onresize);
		return () => {
			window.removeEventListener('resize', onresize);
		};
	});

	let cols = 0;

	let lastWidth = 0;
	let resizeTimeout;
	function onresize() {
		if (resizeTimeout) clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			if (window.innerWidth == lastWidth) return;

			setCols();
			lastWidth = window.innerWidth;
		}, 100);
	}

	function setCols() {
		if (window.innerWidth < 840) {
			cols = 1;
		} else if (window.innerWidth < 1600) {
			cols = 2;
		} else {
			cols = 3;
		}
	}
</script>

<svelte:head>
	<title>Portfolio | Marisol Sarrazin</title>
	<meta name="description" content="" />
</svelte:head>
{#if cols != 0}
	<div>
		{#key lastWidth}
			{#each data.portfolio.children as branch}
				<div class="mb-24 scroll-mt-36" id={branch.slug[$lang].current}>
					<div>
						<Link
							class="!px-0 text-3xl lg:text-4xl"
							href="#{branch.slug[$lang].current}"
						>
							{branch.name[$lang]}
						</Link>
					</div>

					<div class="mt-8">
						<Masonry {cols} {data} imgs={branch.content} />
					</div>
				</div>
			{/each}
		{/key}
	</div>
{/if}
