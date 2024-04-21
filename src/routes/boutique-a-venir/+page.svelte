<script>
	import { lang } from '$lib/store';

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/boutique-a-venir',
		en: '/shop-coming-soon',
	};
</script>

<div class="m-auto max-w-[600px] pt-24">
	<div class="mb-4 text-4xl">
		{$lang == 'fr' ? `Boutique à venir` : ` Shop coming soon`}
	</div>
	<div class="text-lg">
		{$lang == 'fr'
			? `La boutique ouvrira au printemps 2024. Vous pourrez y trouver livres, affiches
		et reproductions de mes originaux. À bientôt!`
			: `The shop will open in spring 2024. You will find books, posters and reproductions of my originals. See you soon!`}
	</div>
</div>
