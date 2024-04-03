<script>
	import { page } from '$app/stores';

	export let data;

	$: facturePage = $page.url.pathname.includes('/factures');
</script>

<div class="my-24 flex items-start">
	<div class="mx-20 flex w-[200px] flex-col gap-4">
		<a
			href="/admin/ecoles/{data.ecole._id}"
			class="!p-0 text-xl underline underline-offset-4 {facturePage
				? 'opacity-30'
				: ''}">Informations</a
		>
		<a
			href="/admin/ecoles/{data.ecole._id}/factures"
			class="!p-0 text-xl underline underline-offset-4 {facturePage
				? ''
				: 'opacity-30'}">Factures</a
		>
		<div class="my-24 border-b" />
		<div>
			<button
				href="/admin/ecoles/{data.ecole._id}/factures"
				class="!p-0 text-xl">Supprimer l'école</button
			>
		</div>
	</div>

	<div class="mx-12 mt-6"><slot /></div>
</div>
