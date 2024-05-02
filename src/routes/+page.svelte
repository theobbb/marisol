<script>
	import Item from './Item.svelte';

	export let data;
	console.log(data);
</script>

<table class="hidden bg-red-500">
	{#each data.paymentIntents.data as item}
		<a href="/{item.id}" style="display: table-row">
			<Item {item} />
		</a>
	{/each}
</table>
