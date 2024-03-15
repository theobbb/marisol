<script>
	import Img from '$lib/components/Img.svelte';
	import { cart, lang } from '$lib/store';
	import axios from 'axios';
	import Variants from './lib/Variant.svelte';

	export let data;

	console.log(data);
</script>

{#each data.store.collections as collection}
	<div class="mb-4 text-4xl">
		{collection.title[$lang]}
	</div>
	<div class="grid gap-8">
		{#each collection.products as product}
			<a
				href="/{$lang == 'fr' ? 'boutique' : 'en/shop'}/{product?.item?.slug[
					$lang
				].current || product?.handle}"
			>
				{#if product.type === 'book'}
					{#if product.item}
						<div>
							<div>
								<Img
									class="max-h-[300px] max-w-[200px] rounded-sm"
									src={product.item.images[0].asset.url}
									alt={product.item.name[$lang]}
								/>
							</div>
							<div class="text-xl">
								{product.item.name[$lang]}
							</div>
						</div>
					{/if}
				{:else}
					<div>
						<div>
							<Img
								class="max-h-[300px] max-w-[200px] rounded-sm"
								src={product.thumbnail}
							/>
						</div>
						<div class="text-xl">
							{product.title}
						</div>
					</div>
				{/if}
			</a>

			<Variants {product} />
		{/each}
	</div>
{/each}
