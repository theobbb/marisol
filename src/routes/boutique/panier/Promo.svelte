<script>
	import { cart, lang } from '$lib/store';
	export let formatPrice;

	async function promoCode(code) {
		const res = await fetch('/boutique/api/promo-code', {
			method: 'POST',
			body: JSON.stringify({
				cart_id: $cart.id,
				code,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});
		if (res.ok) {
			const data = await res.json();
			console.log(data);
		}
	}
	let codes = [];
</script>

<div>
	<button
		on:click={() => {
			if (codes.length < 6) codes = [...codes, ''];
		}}
	>
		+ {$lang == 'fr' ? 'Appliquer un code promo' : 'Apply promo code'}
	</button>
	{#if $cart.discounts?.length > 0}
		<div>
			{#each $cart.discounts as discount}
				<div class="flex w-full justify-between py-3">
					<div class="rounded bg-black/10 px-2.5 py-1.5">
						{discount.code}
					</div>
					{#if discount.rule.type === 'percentage'}
						<div class="font-medium">
							{discount.rule.value}% off
						</div>
					{:else}
						<div class="font-medium">
							{formatPrice(discount.amount)}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	<div class="flex flex-col gap-2.5">
		{#each codes as code, i}
			<div class="flex w-full items-center justify-between gap-4">
				<input
					bind:value={code}
					type="text"
					class="w-full rounded-sm border border-black/10 px-3 py-2"
					placeholder={$lang == 'fr' ? 'Code promo' : 'Promo code'}
				/>
				<button on:click={() => promoCode(codes[i])}>
					{$lang == 'fr' ? 'Appliquer' : 'Apply'}
				</button>
			</div>
		{/each}
	</div>
</div>
