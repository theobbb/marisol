<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BackIcon from '$lib/components/BackIcon.svelte';
	import Link from '$lib/components/Link.svelte';
	import Page from '../../../formulaire_ecole/+page.svelte';
	import Form from '../Form.svelte';
	import Loader from '../Loader.svelte';

	export let data, form;

	$: if (form?.success) {
		submitted = false;
	}

	let submitted = false;
</script>

{#if !submitted}
	<div>
		<form use:enhance method="POST" on:submit={() => (submitted = true)}>
			<Form admin {data} />

			<div class="fixed right-24 top-36 z-20">
				<div>
					<button
						class="rounded bg-accent px-3 py-2 font-medium text-white"
						type="submit"
					>
						Enregistrer
					</button>
				</div>
			</div>
		</form>
	</div>
{:else}
	<Loader />
{/if}
