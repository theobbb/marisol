<script>
	import { lang, lang_href } from '$lib/store';

	$lang_href = {
		fr: '/link-tree',
		en: '/link-tree',
	};
</script>

<div class="m-auto max-w-[600px] pt-16">
	<div class="border-b pb-2">
		<div class="flex items-center gap-3 text-4xl">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="32"
				viewBox="0 -960 960 960"
				width="32"
				><path
					d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"
				/></svg
			>
			Link tree
		</div>
		<div class="text-lg">
			{$lang == 'fr'
				? "Explorez le réseau d'adresses de Marisol"
				: "Explore Marisol's network of addresses"}
		</div>
	</div>
	<div class="mt-12 flex flex-col gap-4 text-2xl">
		<a
			href="https://www.instagram.com/marisolsarrazin/"
			class="group flex w-fit items-center gap-3"
			target="_blank"
		>
			<img class="size-[32px]" alt="instagram" src="/instagram.png" />

			<div class="decoration-black/20 underline-offset-4 group-hover:underline">
				Instagram
			</div>
		</a>
		<a
			href="https://www.facebook.com/marisolsarrazinart"
			class="group flex w-fit items-center gap-3"
			target="_blank"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				style="fill: rgba(0, 0, 0, 1);"
				><path
					d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"
				></path></svg
			>

			<div class="decoration-black/20 underline-offset-4 group-hover:underline">
				Facebook
			</div>
		</a>
		<a
			target="_blank"
			class="group mt-6 w-fit items-center gap-3"
			href="https://www.dominiqueetcompagnie.com/catalogue/livre.asp?id_prd=7803"
		>
			<div class="decoration-black/20 underline-offset-4 group-hover:underline">
				<svg
					class="mr-3 inline-block"
					xmlns="http://www.w3.org/2000/svg"
					height="32"
					viewBox="0 -960 960 960"
					width="32"
					><path
						d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"
					/></svg
				>{$lang == 'fr'
					? '25e anniversaire de Pas de taches pour une girafe'
					: '25th anniversary of Pas de taches pour une girafe'}
			</div>
		</a>
		<a
			target="_blank"
			class="group w-fit items-center gap-3"
			href="https://editionslabagnole.groupelivre.com/products/au-dodo-avec-les-bebes-animaux?variant=44235887771905&utm_source=auteur&utm_medium=Social&utm_campaign=Printemps_2024"
		>
			<div class="decoration-black/20 underline-offset-4 group-hover:underline">
				<svg
					class="mr-3 inline-block"
					xmlns="http://www.w3.org/2000/svg"
					height="32"
					viewBox="0 -960 960 960"
					width="32"
					><path
						d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"
					/></svg
				>{$lang == 'fr'
					? `Nouvelle parution: Au dodo avec les bébés animaux`
					: `New release: Au dodo avec les bébés animaux`}
			</div>
		</a>
	</div>
</div>
