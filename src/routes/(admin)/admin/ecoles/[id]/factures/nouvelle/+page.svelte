<script>
	export let data;

	const ecole = data.ecole;
	console.log(data);
	let rows = [{}];

	const facture = {
		ecole: ecole.ecole,
		montant: '',
		description: '',
		items: [],
	};
</script>

<div class="text-3xl">Nouvelle facture</div>

<div>
	<input type="text" bind:value={facture.ecole} />
</div>
<div>
	<table></table>
</div>
