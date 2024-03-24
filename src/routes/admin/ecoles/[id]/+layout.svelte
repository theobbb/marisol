<script>
	import { page } from '$app/stores';

	export let data;

	$: facturePage = $page.url.pathname.includes('/factures');
</script>

<div class="fixed left-0 top-0 z-20 mb-24 flex w-full gap-12 bg-white shadow">
	<div class="flex items-center gap-12 px-12 py-4">
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
	</div>
</div>
<slot />
