<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
	import Form from '../../../(admin)/admin/ecoles/Form.svelte';

	export let form;

	function generate() {
		const inputs = document.querySelectorAll('input[type="text"]');
		inputs.forEach((input) => {
			input.value = String(Math.round(Math.random() * 1000));
		});
		document.getElementById('horaire_debut').value = '09:00';
		document.getElementById('horaire_fin').value = '15:30';

		const emails = document.querySelectorAll('input[type="email"]');
		emails.forEach((email) => {
			email.value = 'theobaillargeon@hotmail.com';
		});

		document.getElementById('n_classes_1').value = '3';
		document.getElementById('n_eleves_1').value = '64';
		document.getElementById('responsable_tel').value = '4383898908';

		const submit = document.querySelector('button[type="submit"]');
		window.scrollTo({ top: submit.offsetTop, behavior: 'smooth' });
	}
	let submitted = false;

	$: console.log(form);
	$: if (form?.success) {
		console.log('success');
		submitted = false;
		goto('/formulaire_ecole/merci');
	}
</script>

<button class="fixed bottom-6 left-6" on:click={generate}> generate </button>

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
			action="/admin/api/ecole"
			use:enhance={() => {
				return async ({ result }) => {
					form = result;
				};
			}}
			on:submit|preventDefault={(e) => {
				console.log(e);
				submitted = true;
			}}
		>
			<Form />
			<div class="mt-10 text-right">
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
