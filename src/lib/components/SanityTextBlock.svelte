<script>
	import { toHTML } from '@portabletext/to-html';
	export let blocks;
</script>

{#if blocks}
	<div
		class="sanity-text text-block space-y-12 text-lg leading-[1.64rem] md:text-xl md:leading-[1.66rem] [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:md:text-3xl [&_p]:!mt-2 [&_p]:text-lg [&_p]:md:text-lg {$$props.class}"
	>
		{@html toHTML(blocks)}
	</div>
{/if}
