<script>
	import { lang, lang_href } from '$lib/store';
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
	<Link href={$lang_href?.fr} active={$lang == 'fr'}>Fr</Link>
	<Link href="/en{$lang_href?.en}" active={$lang == 'en'}>En</Link>
</div>
