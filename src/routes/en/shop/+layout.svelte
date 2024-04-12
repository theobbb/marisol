<script>
	import Layout from '../../boutique/+layout.svelte';

	export let data;
</script>

<Layout {data}>
	<slot />
</Layout>
