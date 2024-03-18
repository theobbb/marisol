<script>
	import Img from '$lib/components/Img.svelte';

	export let data;

	let active = 0;
</script>

<svelte:head>
	<title>Accueil | Marisol Sarrazin</title>
	<meta name="description" content="" />
</svelte:head>

<div class="relative h-[60lvh]">
	<Img
		src={data.content[active].img.asset.url}
		class="h-full w-full rounded-sm object-cover"
	/>
	<div class="flex gap-2">
		{#each data.content as item, i}
			<button
				class="h-4 w-4 rounded-full bg-black/30 transition-colors hover:bg-black/50"
				on:click={() => (active = i)}
			>
			</button>
		{/each}
	</div>
</div>
