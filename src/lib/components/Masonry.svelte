<script>
	import { onMount } from 'svelte';
	import Img from './Img.svelte';
	import LightBox from './LightBox.svelte';
	export let data,
		imgs,
		cols = 2;
	let container = null;
	let padding = 20;

	let targetH = 300;

	let ready = false;

	onMount(() => {
		init();
	});

	let totalH = 0;

	function init() {
		if (!container || !container.offsetWidth) return;

		const fullW = container.offsetWidth;

		let curY = 0;

		const aRatio = [];
		const defaultW = [];

		imgs.forEach((img, i) => {
			const { aspectRatio } = img.img.asset.metadata.dimensions;
			aRatio[i] = aspectRatio;
			defaultW[i] = targetH * aspectRatio;
		});

		let nImage = imgs.length;
		//console.log("nImage: " + nImage);

		if (cols == 1) {
			for (let i = 0; i < nImage; i++) {
				let img = imgs[i];
				img.x = 0;
				img.width = fullW;
				img.y = curY;
				let imgHeight = fullW / aRatio[i];
				img.height = imgHeight;
				curY = curY + imgHeight + padding;
				//console.log("info: " + img.x + " " + img.y + " " + img.width + " " + img.height + " " + i + " " + defaultW[i]);
			}
		} else {
			var fini = false;
			let fin = -1;
			let facteur;

			while (!fini) {
				if (fin + 1 < nImage) {
					// on ajoute une ligne
					let debut = fin + 1;
					fin = -1;
					let largeur = defaultW[debut];
					let nouvelleLargeur;
					let ajout = 1;

					while (fin < 0) {
						if (debut + ajout < nImage) {
							nouvelleLargeur = largeur + padding + defaultW[debut + ajout];

							if (nouvelleLargeur >= fullW) {
								if (fullW - largeur < nouvelleLargeur - fullW) {
									facteur = fullW / largeur;
									fin = debut + ajout - 1;
								} else {
									facteur = fullW / nouvelleLargeur;
									fin = debut + ajout;
								}
							} else {
								largeur = nouvelleLargeur;
								ajout++;
								if (debut + ajout == nImage) {
									fin = debut + ajout - 1;
									if (largeur / fullW > 0.8) {
										facteur = fullW / largeur;
									} else {
										facteur = 1;
									}
									fini = true;
								}
							}
						} else {
							facteur = 1;
							fin = debut + ajout - 1;
							fini = true;
						}
					}

					let espace = padding * facteur;
					let imgHeight = targetH * facteur;
					// console.log('hauteur: ' + imgHeight);

					let curX = 0;
					//console.log('début-fin: ' + debut + " " + fin);
					for (let i = debut; i <= fin; i++) {
						let img = imgs[i];
						img.x = curX;
						img.width = defaultW[i] * facteur;
						curX = curX + espace + img.width;
						img.y = curY;
						img.height = imgHeight;
						//console.log("info: " + img.x + " " + img.y + " " + img.width + " " + img.height + " " + i + " " + defaultW[i] + " " + facteur);
					}

					curY = curY + imgHeight + padding;
				} else {
					fini = true;
				}
			}
		}

		totalH = curY;
		//console.log('fin init');

		ready = true;
	}
</script>

<div
	class="relative w-full {ready ? '' : 'opacity-0'} transition duration-300"
	style="height: {totalH}px;"
	bind:this={container}
>
	{#if ready}
		<LightBox {data}>
			{#each imgs as img}
				<div
					class="absolute"
					style="width: {img.width}px; height: {img.height}px; top: {img.y}px; left: {img.x}px;"
				>
					<Img
						lazy
						alt="img-{img.book}"
						class="absolute h-full w-full object-cover {img.first ? '' : ''} "
						src={img.img.asset.url}
						book={img.book_ref?._ref}
					/>
				</div>
			{/each}
		</LightBox>
	{/if}
</div>
