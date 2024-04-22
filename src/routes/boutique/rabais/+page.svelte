<script>
	import { lang, lang_href } from '$lib/store';

	$lang_href = {
		fr: '/boutique/rabais',
		en: '/shop/discounts',
	};

	$: rabais = $lang == 'fr' ? 'de rabais sur' : 'discount on';
	$: print = $lang == 'fr' ? 'impression en carton' : 'cardboard print';
</script>

<div class="m-auto max-w-[680px] pt-16 text-lg">
	<div class="mb-1.5 text-4xl">
		{$lang == 'fr' ? 'Rabais en cours' : 'Discounts'}
	</div>
	<div class="text-lg">
		{$lang == 'fr'
			? "Acheter un livre et des impressions en carton vous permet d'économiser!"
			: 'Buying a book and cardboard prints saves you money!'}
	</div>
	<div class="mt-16 border-b pb-1">
		{$lang == 'fr' ? `À l'achat d'un livre...` : 'When you buy a book...'}
	</div>
	<div class="mt-6 w-full md:table">
		<tr class="">
			<td>10%</td>
			<td>{rabais}</td>
			<td>{$lang == 'fr' ? 'la 1ere' : 'the 1st'}</td>
			<td>{$lang == 'fr' ? 'impression en carton' : 'cardboard print'}</td>
		</tr>
		<tr class="">
			<td>20%</td>
			<td class="opacity-20">{rabais}</td>
			<td>2</td>
			<td class="opacity-20"
				>{$lang == 'fr' ? 'impressions en carton' : 'cardboard prints'}</td
			>
		</tr>
		<tr class="">
			<td>30%</td>
			<td class="opacity-20">{rabais}</td>
			<td>{$lang == 'fr' ? '3 et +' : '3 +'}</td>
			<td class="opacity-20"
				>{$lang == 'fr' ? 'impressions en carton' : 'cardboard prints'}</td
			>
		</tr>
	</div>
</div>

<style>
	td {
		padding: 6px 0;
		padding-right: 12px;
	}
</style>
