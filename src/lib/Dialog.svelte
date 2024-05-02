<script>
	export let open = false;
	let dialog;

	$: if (dialog && open) dialog.showModal();

	function close() {
		if (dialog && open) dialog.close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => {
		open = false;
	}}
	on:click={close}
	class="relative max-h-[90vh] w-fit gap-12 rounded-lg bg-stone-200 p-0 text-base-20 shadow"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->

	<div class="relative w-[520px] pb-4" on:click|stopPropagation>
		<div class="flex items-center justify-between gap-16 border-b px-4 py-3">
			<div class="mt-0.5">
				<slot name="title" />
			</div>
			<button class="" on:click={close}> X </button>
		</div>
		<div class="px-4">
			<slot />
		</div>
	</div>

	<!-- svelte-ignore a11y-autofocus -->
</dialog>

<style>
	dialog::backdrop {
		backdrop-filter: blur(2px) brightness(0.5);
	}
</style>
