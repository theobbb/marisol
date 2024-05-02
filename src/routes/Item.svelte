<script>
	import { onMount } from 'svelte';
	export let item;

	onMount(async () => {
		if (item.status != 'succeeded') return;
	});
</script>

<td>{new Date(item.created * 1000).toLocaleString('fr-CA')}</td>
<td>{item.amount / 100}</td>
<td>{item.currency}</td>
<td>{item.status}</td>
<td>{item.receipt_email || ''}</td>
<td>{item.shipping?.name || ''}</td>

<style>
	tr {
	}
	td {
		border-bottom: 1px solid #484848;
		padding: 4px 16px;
	}
</style>
