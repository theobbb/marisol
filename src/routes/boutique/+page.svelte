<script>
	export let data;

	import { lang_href } from '$lib/store';
	import Branches from './Branches.svelte';
	$lang_href = {
		fr: '/boutique',
		en: '/shop',
	};
</script>

<div class="">
	<Branches {data} />
</div>
