<script>
	import { lang } from '$lib/store';
	import Link from '../Link.svelte';
	import { page } from '$app/stores';
	import { links } from './links';

	export let activeLinkIndex;

	$: fr_href =
		activeLinkIndex == -1
			? '/'
			: $lang == 'en'
				? links[activeLinkIndex]?.fr?.href
				: $page.url.pathname.replace('/en', '');
	$: en_href =
		activeLinkIndex == -1
			? ''
			: $lang == 'fr'
				? links[activeLinkIndex]?.en?.href
				: $page.url.pathname.replace('/en', '');

	$: $lang =
		$page.url.pathname.includes('/en/') || $page.url.pathname == '/en'
			? 'en'
			: 'fr';
</script>

<div class="flex gap-6 text-2xl lg:text-xl">
	<Link href={fr_href} active={$lang == 'fr'}>Fr</Link>
	<Link href="/en{en_href}" active={$lang == 'en'}>En</Link>
</div>
