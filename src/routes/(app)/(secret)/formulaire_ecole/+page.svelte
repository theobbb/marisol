<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
	import { email_apres_formulaire } from '$lib/emails/apres-formulaire';
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

	$: if (form?.success) {
		console.log('success');
		submitted = false;
		sendEmail();
		goto('/formulaire_ecole/merci');
	}

	async function sendEmail() {
		const body = JSON.parse(form.body);
		return;

		fetch('/admin/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				to: body.responsable_email,
				from: 'info@marisolsarrazin.com',
				subject: 'Demande bien reçue',
				html: email_apres_formulaire,
			}),
		});

		const html_for_marisol = `
			<h1>Une nouvelle demande de soumission a été reçue! &#128521; &#x1F609;</h1>
			<p>École: ${body.ecole}</p>
			<p>Responsable: ${body.responsable_nom}</p>
			<p></p>
			<a href="https://marisolsarrazin.com/admin/ecoles/${body._id}">Voir la demande</a>
		`;
		fetch('/admin/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				to: 'theobaillargeon@hotmail.com',
				from: 'info@marisolsarrazin.com',
				subject: `Nouvelle demande de soumission - ${body.ecole}`,
				html: html_for_marisol,
			}),
		});
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
