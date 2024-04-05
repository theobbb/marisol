<script>
	import { lang, progress } from '$lib/store';
	import Img from '../Img.svelte';
	import { email_newsletter } from './email_newsletter';

	const year = new Date().getFullYear();

	let emailElem = null;
	let email = '';
	let error = '';
	let success = '';
	async function subscribe() {
		console.log(email);
		if (!email) {
			error = 'Please enter an email';
			emailElem.focus();
			return;
		}
		const valid = emailElem.checkValidity();
		if (!valid) {
			error = 'Please enter a valid email';
			emailElem.focus();
			return;
		}
		$progress.start();
		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			const data = await res.json();
			console.log(data);
			if (data.success) {
				success =
					$lang == 'fr'
						? 'Merci, vous êtes abonnez!'
						: 'Thank you for subscribing!';

				sendEmail();
			} else {
				if (data.exists) {
					error =
						$lang == 'fr'
							? 'Vous êtes déjà abonné!'
							: 'You are already subscribed!';
				} else {
					error =
						$lang == 'fr'
							? `Une erreur s'est produite, veuillez réessayer plus tard.`
							: 'An error occurred, please try again later.';
				}
			}
		} catch (error) {
			error =
				$lang == 'fr'
					? `Une erreur s'est produite, veuillez réessayer plus tard.`
					: 'An error occurred, please try again later.';
		}
		$progress.done();
	}

	async function sendEmail() {
		fetch('/api/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				to: email,
				from: 'info@marisolsarrazin.com',
				subject:
					$lang == 'fr'
						? 'Merci de vous être abonné!'
						: 'Thank you for subscribing!',
				html: email_newsletter,
			}),
		});
	}
</script>

<footer
	class="flex w-full flex-col items-center justify-center gap-24 bg-fixed bg-center px-3.5 py-36 font-normal text-black md:flex-row"
	style="background-image: url(https://cdn.sanity.io/images/m60p6rsb/production/8eb7deb5e273ae9288145c651fbbf838921a9af4-7732x4011.jpg?w=2000)"
>
	<div>
		<Img
			src="https://cdn.sanity.io/images/m60p6rsb/production/06b618dcf004fb80c20c91674b3ff0198106a15a-1082x1082.png?w=300&fit=max&auto=format"
			alt="Marisol Sarrazin"
		/>
	</div>
	<div class="flex max-w-[480px] flex-col">
		<div class="mb-8 w-full">
			<div class="mb-2 text-2xl">
				{$lang == 'fr'
					? `Inscrivez-vous pour rester à l'affut des nouveautés`
					: `Sign up to stay up to date`}
			</div>
			<input
				bind:this={emailElem}
				bind:value={email}
				id="email-footer"
				name="email-footer"
				type="email"
				class="w-full rounded bg-black/10 p-2 px-3 text-xl text-black placeholder-black/70"
				placeholder="email"
			/>
			<div class="mt-2 flex items-center gap-4">
				<button class=" rounded bg-white/10 px-3 py-2" on:click={subscribe}>
					{$lang == 'fr' ? `S'inscrire` : `Subscribe`}
				</button>

				{#if success}
					<div class="font-medium text-green-900">{success}</div>
				{:else if error}
					<div class="font-medium text-red-800">{error}</div>
				{/if}
			</div>
		</div>
		<div class="w-fit border-b border-black/20 text-base">
			© {year} Marisol Sarrazin
		</div>
		<div class="mt-3 text-base leading-5">
			{$lang == 'fr'
				? `Toutes les illustrations de ce site sont protégées par le droit d’auteur.
			Toute reproduction ou utilisation sans permission est strictement
			interdite. Le droit d’auteur et le droit de reproduction ne sont pas
			transférés avec la vente d’œuvres d’art.`
				: `All illustrations on this website are protected by copyright. Any reproduction or use without permission is strictly prohibited. Copyright and reproduction right do not transfer with the sale of works of art.`}
		</div>
	</div>
</footer>
