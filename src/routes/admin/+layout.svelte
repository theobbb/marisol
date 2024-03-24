<script>
	import Link from '$lib/components/Link.svelte';
</script>

<div class="fixed left-0 top-0 w-full text-lg">
	<div class="px-6 py-3">
		<Link href="/admin/ecoles" class="flex items-center gap-2 !p-0">Écoles</Link
		>
	</div>
</div>

<div class="text-lg"><slot /></div>
