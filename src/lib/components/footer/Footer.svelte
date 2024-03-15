<script>
	import { lang } from '$lib/store';

	const year = new Date().getFullYear();
</script>

<footer
	class="flex w-full items-center justify-center bg-fixed bg-center px-3.5 py-36 font-light text-white"
	style="background-image: url(https://cdn.sanity.io/images/m60p6rsb/production/4014b7b21b17f10084323c96dd0c4b1e9596cc9a-2000x1378.jpg)"
>
	<div class="flex max-w-[460px] flex-col">
		<div class="mb-8 w-full">
			<div class="mb-2 text-2xl">
				{$lang == 'fr'
					? `Inscrivez-vous pour rester à l'affut des nouveautés`
					: `Sign up to stay up to date`}
			</div>
			<input
				type="text"
				class="w-full rounded bg-white/40 p-2 px-3 text-xl text-black placeholder-black/70"
				placeholder="email"
			/>
		</div>
		<div class="border-white-20 w-fit border-b text-base">
			© {year} Marisol Sarrazin
		</div>
		<div class="mt-3 text-base">
			Toutes les illustrations de ce site sont protégées par le droit d’auteur.
			Toute reproduction ou utilisation sans permission est strictement
			interdite. Le droit d’auteur et le droit de reproduction ne sont pas
			transférés avec la vente d’œuvres d’art.
		</div>
	</div>
</footer>
