<script>
	import { page } from '$app/stores';

	export let href = '';

	$: active = href === $page.url.pathname;
</script>

<a {href} class="relative" {...$$restProps}>
	<slot />
	{#if active}
		<div class="absolute -bottom-2 left-0 w-full h-1 bg-orange-500" />
	{/if}
</a>
