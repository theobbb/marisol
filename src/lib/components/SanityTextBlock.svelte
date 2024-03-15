<script>
	import { toHTML } from '@portabletext/to-html';
	export let blocks;
</script>

{#if blocks}
	<div
		class="space-y-4 text-lg
 leading-[1.64rem] md:space-y-8 md:text-xl md:leading-[1.66rem] {$$props.class}"
	>
		{@html toHTML(blocks)}
	</div>
{/if}
