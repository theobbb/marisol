<script>
	import { page } from '$app/stores';
	import Link from '$lib/components/Link.svelte';

	$: params = $page.url.pathname.split('/').filter(Boolean);
</script>

<div class="w-full text-lg">
	<div class="px-20 py-4 text-xl">
		<div class="flex items-center gap-3">
			{#each params as param, i}
				{#if i != params.length - 1}
					<Link href="/{params.slice(0, i + 1).join('/')}" class="!px-0"
						>{param}</Link
					>
					{#if i < params.length - 2}
						<span class="mx-0.5">/</span>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</div>

<div class="text-lg">
	<slot />
</div>
