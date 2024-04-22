<script>
	import { lang, lang_href } from '$lib/store';

	$lang_href = {
		fr: '/boutique/rabais',
		en: '/shop/discounts',
	};

	$: rabais = $lang == 'fr' ? 'de rabais sur' : 'discount on';
	$: print = $lang == 'fr' ? 'impression en carton' : 'cardboard print';
</script>

<div class="m-auto max-w-[680px] pt-16">
	<div class="mb-1.5 text-4xl">
		{$lang == 'fr' ? 'Rabais en cours' : 'Discounts'}
	</div>
	<div class="text-lg">
		{$lang == 'fr'
			? "Acheter un livre et des impressions en carton vous permet d'économiser!"
			: 'Buying a book and cardboard prints saves you money!'}
	</div>
	<div class="mt-16 border-b pb-1 text-2xl font-medium">
		{$lang == 'fr' ? `À l'achat d'un livre...` : 'When you buy a book...'}
	</div>
	<div class="mt-6 w-full text-xl md:table">
		<tr class="text-2xl">
			<td>10%</td>
			<td>{rabais}</td>
			<td>{$lang == 'fr' ? 'la première' : 'the first'}</td>
			<td>{print}</td>
		</tr>
		<tr class="">
			<td>20%</td>
			<td class="opacity-30">{rabais}</td>
			<td>{$lang == 'fr' ? 'deux' : 'the  second'}</td>
			<td class="opacity-30">{print}</td>
		</tr>
		<tr class="">
			<td>30%</td>
			<td class="opacity-30">{rabais}</td>
			<td>{$lang == 'fr' ? 'les trois et +' : 'the  second'}</td>
			<td class="opacity-30">{print}</td>
		</tr>
	</div>
</div>

<style>
	td {
		padding: 6px 0;
		padding-right: 12px;
	}
</style>
