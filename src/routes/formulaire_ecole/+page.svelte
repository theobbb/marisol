<script>
	import { enhance } from '$app/forms';

	import Loader from '../admin/ecoles/Loader.svelte';
	import Form from '../admin/ecoles/Form.svelte';

	export let form;

	function generate() {
		const inputs = document.querySelectorAll('input[type="text"]');
		inputs.forEach((input) => {
			input.value = String(Math.round(Math.random() * 1000));
		});
		document.getElementById('horaire_debut').value = '09:00';
		document.getElementById('horaire_fin').value = '15:30';
	}
	let submitted = false;
</script>

<button on:click={generate}> generate </button>

{#if form?.success == false}
	<div class="text-4xl">Erreur lors de l'envoi du formulaire</div>
{:else if !submitted}
	<div>
		<div class="text-4xl">
			Veuillez remplir ce formulaire pour informations ou soumission
		</div>
		<form
			class="mt-16 text-xl"
			method="POST"
			use:enhance
			on:submit={() => {
				submitted = true;
			}}
		>
			<Form />
			<div class="mt-10">
				<button
					class="rounded bg-accent px-3 py-2 font-medium tracking-wide text-white"
					type="submit">Envoyer</button
				>
			</div>
		</form>
	</div>
{:else}
	<Loader />
{/if}
