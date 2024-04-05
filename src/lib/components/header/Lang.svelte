<script>
	import { lang, lang_href } from '$lib/store';
	import Link from '../Link.svelte';
	import { page } from '$app/stores';
	import { links } from './links';

	export let activeLinkIndex;

	$: $lang =
		$page.url.pathname.includes('/en/') || $page.url.pathname == '/en'
			? 'en'
			: 'fr';
</script>

<div class="flex gap-6 text-2xl min-[1120px]:text-xl">
	<Link href={$lang_href?.fr} active={$lang == 'fr'}>Fr</Link>
	<Link href="/en{$lang_href?.en}" active={$lang == 'en'}>En</Link>
</div>
