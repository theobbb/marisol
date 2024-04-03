<script>
	import { enhance } from '$app/forms';
	import Loader from '$lib/components/Loader.svelte';
	import { progress } from '$lib/store';
	import Form from '../Form.svelte';

	export let data, form;

	$: if (form?.success) {
		submitted = false;
	}

	let submitted = false;
</script>

{#if !submitted}
	<div class="">
		<form
			use:enhance={() => {
				return async ({ result }) => {
					form = result;
					$progress.done();
				};
			}}
			method="POST"
			action="/admin/api/ecole"
			on:submit={() => $progress.start()}
		>
			<Form admin {data} />

			<div class="fixed bottom-6 right-6 z-20">
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
