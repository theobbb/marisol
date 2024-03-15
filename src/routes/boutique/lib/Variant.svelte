<script>
	import { cart, lang } from '$lib/store';

	export let product;

	async function addToCart(variant) {
		const res = await fetch('/boutique/api/cart-item', {
			method: 'POST',
			body: JSON.stringify({
				cart_id: $cart.id,
				variant_id: variant.id,
				quantity: 1,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});

		if (res.ok) {
			const data = await res.json();
			data.message = `${product.item.name[$lang]} ${$lang == 'fr' ? 'ajouté au panier' : 'added to cart'}`;
			cart.set(data);
		}
	}
</script>

<div>
	{#each product.variants as variant}
		<div>
			{variant.title}
		</div>
		<button on:click={() => addToCart(variant)}>
			{$lang == 'fr' ? 'Ajouter au panier' : 'Add to cart'}
		</button>
	{/each}
</div>
