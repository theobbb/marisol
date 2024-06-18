<script>
	import { lang, invert } from '$lib/store';
	import Link from '../Link.svelte';
	import { links } from './links';

	export let activeLinkIndex, data;

	const maped = links.map((link, i) => {
		if (link.fr.href == '/portfolio') {
			link.children = data.portfolio.children.map((branch) => {
				return {
					fr: {
						href: `/portfolio/#${branch.slug.fr.current}`,
						name: branch.name.fr,
					},
					en: {
						href: `/en/portfolio/#${branch.slug.en.current}`,
						name: branch.name.en,
					},
				};
			});
		}

		if (link.fr.href == '/boutique') {
			link.children = data.shop.branches.map((branch) => {
				return {
					fr: {
						href: `/boutique/${branch.slug.fr.current}`,
						name: branch.name.fr,
					},
					en: {
						href: `/en/shop/${branch.slug.en.current}`,
						name: branch.name.en,
					},
				};
			});
		}
		return link;
	});
</script>

<div
	class="flex flex-col gap-1 whitespace-nowrap text-2xl min-[1220px]:flex-row min-[1220px]:gap-5 min-[1220px]:text-xl"
>
	{#each maped as link, i}
		<div class="group relative py-1">
			<Link
				active={activeLinkIndex == i}
				class="z-10 flex items-center gap-1"
				href="{$lang == 'en' ? '/en' : ''}{link[$lang].href}"
			>
				{link[$lang].name}
				{#if link.children?.length > 0}
					<div class="mt-1 hidden min-[1220px]:inline">
						<svg
							class="h-6 w-6 -rotate-180 fill-none transition duration-300 ease-in-out group-hover:-rotate-90"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								class="{$invert ? 'stroke-white/60' : 'stroke-black/30'} "
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 18l-6-6 6-6"
							></path>
						</svg>
					</div>
				{/if}
			</Link>
			{#if link.children?.length > 0}
				<div
					style="backdrop-filter: blur(10px);"
					class="shadow-b pointer-events-none absolute top-[100%] hidden translate-y-[-10px] flex-col gap-1 rounded-md {$invert
						? 'bg-black/40'
						: 'bg-white/80'}  px-2.5 pb-2 opacity-0 transition-all duration-500 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 min-[1220px]:flex min-[1220px]:pt-2.5"
				>
					{#each link.children as child, i}
						<Link href={child[$lang].href}>{child[$lang].name}</Link>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
