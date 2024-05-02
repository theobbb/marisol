<script>
	let currentYear = new Date().getFullYear();
	let years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i); // Range from 2020 to current year// From 10 years ago to 10 years in the future

	let months = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	];

	let error = '';

	let day = 1;
	let startMonth = '';
	let startYear = '';
	let endMonth = '';
	let endYear = '';

	let range = 0;

	let start = new Date();
	let end = new Date();

	$: start = new Date(Number(startYear), months.indexOf(startMonth));
	$: end = new Date(Number(endYear), months.indexOf(endMonth));

	$: if (startMonth && startYear && endMonth && endYear) {
		if (start > end) error = 'La date de début doit être avant la date de fin';
		else {
			range = monthDiff();
			error = '';
		}
	} else error = '';

	function monthDiff() {
		const startMonthIndex = months.indexOf(startMonth);
		const endMonthIndex = months.indexOf(endMonth);
		return (endYear - startYear) * 12 + (endMonthIndex - startMonthIndex);
	}
</script>

<div class="flex">
	<div class="mr-36">
		<div class="mb-2">Jour index</div>
		<div class="">
			<input
				class="text-white px-2.5 py-1.5"
				bind:value={day}
				min={1}
				max={31}
				size={7}
				type="number"
				placeholder="Day"
			/>
		</div>
	</div>
	<div class="mr-10">
		<div class="mb-2">À partir de</div>
		<div>
			<select bind:value={startMonth}>
				<option value="" disabled selected>Mois</option>
				{#each months as month}
					<option>{month}</option>
				{/each}
			</select>

			<select bind:value={startYear}>
				<option value="" disabled selected>Année</option>
				{#each years as year}
					<option>{year}</option>
				{/each}
			</select>
		</div>
	</div>
	<div>
		<div class="mb-2">Jusqu'à</div>
		<div>
			<select bind:value={endMonth}>
				<option value="" disabled selected>Mois</option>
				{#each months as month}
					<option>{month}</option>
				{/each}
			</select>

			<select bind:value={endYear}>
				<option value="" disabled selected>Année</option>
				{#each years as year}
					<option>{year}</option>
				{/each}
			</select>
		</div>
	</div>
</div>

<div class="w-fit m-auto">
	{#if error}
		<p class="mt-4 text-red-500">{error}</p>
	{/if}

	{#if range}
		<p class="mt-4">
			<span class="opacity-30">Sélection:</span>
			{day}
			{startMonth}
			{startYear} - {day}
			{endMonth}
			{endYear}
			= {range} mois
		</p>
	{/if}
</div>

<style>
	option,
	input {
		@apply bg-stone-800;
	}
	select {
		@apply bg-stone-800;
		padding: 8px;
		margin-right: 10px;
	}
</style>
