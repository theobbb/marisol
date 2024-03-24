<script>
	import { formatDate } from '../utils/formatDate';
	import Loader from './Loader.svelte';

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
	}
</script>

{#if data?.ecoles}
	<table class="">
		<tr class="border-b">
			<td>École</td>
			<td>Date</td>
			<td>Responsable</td>
			<td>Coordonnées responsable</td>
			<td>Soumission envoyée le:</td>
			<td>Dernière modification le:</td>
			<td>Payé</td>
			<td>Editer</td>
			<td>Editer</td>
			<td>Supprimer</td>
		</tr>
		{#each data.ecoles as ecole}
			<tr>
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
					{formatDate(ecole.modified_at) || 'N/A'}
				</td>
				<td>
					<input
						type="checkbox"
						checked={ecole.paye}
						on:change={() => {
							ecole.paye = !ecole.paye;
							togglePaye(ecole);
						}}
					/>
				</td>
				<td class="text-right">
					<a class="underline" href="/admin/ecoles/{ecole._id}"> Éditer </a>
				</td>
				<td class="text-right">
					<button class="text-2xl" on:click={() => deleteEcole(ecole._id)}>
						x
					</button>
				</td>
			</tr>
		{/each}
	</table>
{:else}
	<Loader />
{/if}

<style>
	td {
		padding: 8px 18px;
	}
</style>
