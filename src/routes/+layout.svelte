<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { formatPrice } from '$lib/utils/formatPrice';
	import '../style.css';
	import Item from './Item.svelte';
	import Link from './Link.svelte';

	export let data;

	$: console.log($page.url);
</script>

{#if $page.url.pathname != '/auth'}
	<div class="flex gap-8 my-3 px-6">
		<Link href="/">Commandes</Link>
		<Link href="/taxes">Taxes</Link>
		<Link href="https://dashboard.stripe.com/payments" target="_blank">Stripe</Link>
	</div>

	<div class="m-auto w-fit py-24">
		{#if $page.url.pathname != '/taxes'}
			<div>
				<button> Réussis </button>
			</div>
			<table class="relative max-w-[700px]">
				<tr class="sticky top-0 bg-stone-950 z-20">
					<th>Montant</th>

					<th>Client</th>
					<th>Date</th>
				</tr>
				<tr>
					<td class="invisible">f</td>
				</tr>
				{#each data.paymentIntents.data as item}
					<a
						data-sveltekit-noscroll
						href={$page.params.item == item.id ? '/' : '/' + item.id}
						class="first:hidden table-row relative border-t border-white/10 hover:bg-white/5"
						style={item.status != 'succeeded' ? 'color: rgba(255,255,255,0.3);' : ''}
					>
						<td>{formatPrice(item.amount / 100)}</td>

						<td>{item.receipt_email || ''}</td>

						<td
							>{new Date(item.created * 1000).toLocaleDateString('fr-CA')}
							<span class="opacity-40"> - {formatDate(item.created * 1000)}</span></td
						>
						{#if $page.params.item === item.id}
							<div class="absolute top-0 -left-6 rounded-t-sm w-1 h-full bg-orange-500" />
						{/if}
					</a>

					{#if $page.params.item === item.id}
						<slot />
					{/if}
				{/each}
			</table>
		{:else}
			<slot />
		{/if}
	</div>
{:else}
	<slot />
{/if}

<style>
	td,
	th {
		padding: 12px 16px;
	}
	th {
		text-align: left;
	}
</style>
