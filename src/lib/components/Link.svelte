<script>
	import { invert, lang_href } from '$lib/store';

	export let href = '',
		active,
		button = false;
</script>

<a
	{...$$props}
	on:click
	{href}
	class="rounded px-2.5 py-1 font-light underline-offset-4 hover:underline {$invert
		? 'decoration-white/40'
		: 'decoration-black/20'} {active ? 'bg-black/[0.07] ' : ''} {button
		? 'bg-black/10'
		: ''} {$$props.class}"
>
	<slot />
</a>

<style>
</style>
