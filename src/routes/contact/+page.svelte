<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import { lang } from '$lib/store';

	import { lang_href } from '$lib/store';
	$lang_href = {
		fr: '/contact',
		en: '/contact',
	};

	export let form;
</script>

<div class="m-auto text-lg md:w-[600px]">
	{#if form?.success}
		<div>
			<div class="mb-4 text-3xl text-accent">Merci!</div>
			<div>
				{$lang == 'fr'
					? `Votre message a bien été envoyé. Marisol vous répondra dans les plus brefs délais.`
					: `Your message has been sent. Mariso will get back to you as soon as possible.`}
			</div>
			<div class="mt-10">
				<Button on:click={() => (form = null)}
					>{$lang == 'fr'
						? 'Envoyer un autre message'
						: 'Send another message'}</Button
				>
			</div>
		</div>
	{:else if form?.error}
		<div>
			<div class="mb-4 text-3xl text-red-500">
				{$lang == 'fr' ? 'Erreur' : 'Error'}
			</div>
			<div>
				{$lang == 'fr'
					? `Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer. `
					: `An error occurred while sending your message. Please try again.`}
			</div>
			<div class="mt-10">
				<Button on:click={() => (form = null)}
					>{$lang == 'fr' ? 'Retour' : 'Back'}</Button
				>
			</div>
		</div>
	{:else}
		<div class="mb-10">
			<div class="mb-2 text-3xl">
				{$lang == 'fr' ? 'Contactez Marisol' : 'Contact Marisol'}
			</div>
			<div class="inline text-stone-400">
				{$lang == 'fr'
					? `Pour toute question ou demande particulière, veuillez remplir ce formulaire. Vous pouvez également envoyer directement un courriel à `
					: `For any question or special request, please fill out this form. You can also send an email directly to `}
			</div>
			<a
				class="inline text-stone-500 decoration-stone-300 underline-offset-2 hover:underline"
				href="mailto:info@marisolsarrazin.com"
			>
				info@marisolsarrazin.com
			</a>
		</div>
		<form use:enhance method="POST">
			<div class="divide-y rounded-sm border">
				<div>
					<input
						name="name"
						class="w-full px-3 py-3 outline-none"
						type="text"
						placeholder={$lang == 'fr' ? 'Nom' : 'Name'}
					/>
				</div>
				<div>
					<input
						name="email"
						class="w-full px-3 py-3 outline-none"
						type="email"
						placeholder={$lang == 'fr' ? 'Adresse courriel' : 'Email address'}
					/>
				</div>
				<div>
					<input
						name="object"
						class="w-full px-3 py-3 outline-none"
						type="text"
						placeholder={$lang == 'fr' ? 'Objet' : 'Object'}
					/>
				</div>
				<div>
					<textarea
						name="message"
						rows="8"
						class="w-full px-3 py-3 outline-none"
						placeholder={$lang == 'fr' ? 'Message' : 'Message'}
					></textarea>
				</div>
			</div>
			<div class="mt-6 flex w-full items-center justify-between">
				<div class="">
					<div>
						{$lang == 'fr' ? '' : ''}
					</div>
				</div>
				<button
					class="rounded bg-accent px-3 py-2 font-medium tracking-wide text-white"
					type="submit">{$lang == 'fr' ? 'Envoyer' : 'Send'}</button
				>
			</div>
		</form>
	{/if}
</div>
