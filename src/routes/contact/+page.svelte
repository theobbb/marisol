<script>
	import { lang } from '$lib/store';

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/contact',
		en: '/contact',
	};
</script>

<div class="m-auto text-lg md:w-[600px]">
	<div class="mb-10">
		<div class="mb-2 text-3xl">
			{$lang == 'fr' ? 'Contactez Marisol' : 'Contact Marisol'}
		</div>
		<div class=" text-stone-400">
			{$lang == 'fr'
				? `Pour toute question ou demande particulière, veuillez remplir ce formulaire.`
				: `For any question or special request, please fill out this form. `}
		</div>
	</div>
	<form class=" ">
		<div class="divide-y rounded-sm border">
			<div>
				<input
					class="w-full px-3 py-3 outline-none"
					type="text"
					placeholder={$lang == 'fr' ? 'Nom' : 'Name'}
				/>
			</div>
			<div>
				<input
					class="w-full px-3 py-3 outline-none"
					type="email"
					placeholder={$lang == 'fr' ? 'Adresse courriel' : 'Email address'}
				/>
			</div>
			<div>
				<input
					class="w-full px-3 py-3 outline-none"
					type="text"
					placeholder={$lang == 'fr' ? 'Objet' : 'Object'}
				/>
			</div>
			<div>
				<textarea
					rows="8"
					class="w-full px-3 py-3 outline-none"
					placeholder={$lang == 'fr' ? 'Message' : 'Message'}
				></textarea>
			</div>
		</div>
		<div class="mt-6 flex w-full justify-end">
			<button
				class="rounded bg-accent px-3 py-2 font-medium tracking-wide text-white"
				type="submit">{$lang == 'fr' ? 'Envoyer' : 'Send'}</button
			>
		</div>
	</form>
</div>
