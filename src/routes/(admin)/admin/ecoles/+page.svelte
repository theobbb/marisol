<script>
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
	import PageTitle from '$lib/components/admin/PageTitle.svelte';
	import { progress } from '$lib/store.js';
	import { formatDate } from '$lib/utils/formatDate.js';

	export let data;

	async function deleteEcole(_id) {
		try {
			await fetch('/admin/api/ecole', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ _id }),
			});
		} catch (error) {
			console.error('Error:', error);
		}
		data.ecoles = data.ecoles.filter((ecole) => ecole._id !== _id);

		console.log('json');
	}
	async function togglePaye(ecole) {
		$progress.start();
		try {
			await fetch('/admin/api/ecole', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ _id: ecole._id, paye: ecole.paye }),
			});
		} catch (error) {
			console.error('Error:', error);
		}
		$progress.done();
	}
</script>

<div class="m-auto mt-10 w-fit">
	<div class="mb-20">
		<div class="mx-3.5 text-3xl">Écoles</div>
	</div>
	{#if data?.ecoles}
		<table class="">
			<tr class="border-b">
				<td>École</td>
				<td>Date</td>
				<td>Responsable</td>
				<td>Coordonnées responsable</td>
				<td>Soumission envoyée:</td>
				<td>Modifié:</td>
				<td>Payé</td>
			</tr>
			{#each data.ecoles as ecole}
				<tr
					class="cursor-pointer hover:bg-black/10"
					on:click={() => {
						goto(`/admin/ecoles/${ecole._id}`);
					}}
				>
					<td>
						{ecole.ecole}
					</td>
					<td> Date </td>
					<td>
						{ecole.responsable_nom}
					</td>
					<td>
						{ecole.responsable_email} - {ecole.responsable_tel}
					</td>
					<td>
						{formatDate(ecole.created_at)}
					</td>
					<td>
						{formatDate(ecole.updated_at)}
					</td>

					<td class="text-right">
						<input
							type="checkbox"
							on:click|stopPropagation
							checked={ecole.paye}
							on:change={() => {
								ecole.paye = !ecole.paye;
								togglePaye(ecole);
							}}
						/>
					</td>
				</tr>
			{/each}
		</table>
	{:else}
		<Loader />
	{/if}
</div>

<style>
	td {
		padding: 8px 18px;
	}
</style>
