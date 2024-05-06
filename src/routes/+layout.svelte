<script>
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { signOut } from '@auth/sveltekit/client';
	import '../style.css';
	import Item from './Item.svelte';
	import Link from './Link.svelte';

	export let data;

	let total = 0;
	let pending = 0;

	let balance = 0;
	$: calculateBalance();
	function calculateBalance() {
		balance = 0;

		data.balance.pending.forEach((item) => {
			balance += item.amount;
		});
		data.balance.available.forEach((item) => {
			balance += item.amount;
		});
	}
	$: console.log(data);
</script>

{#if $page.url.pathname != '/auth'}
	<div class="flex justify-between items-center my-3 px-6">
		<div class="flex gap-8">
			<Link href="/">Commandes</Link>
			<Link href="/taxes">Taxes</Link>
			<Link href="https://dashboard.stripe.com/payments" target="_blank">Stripe</Link>
		</div>
		<div>
			<button on:click={signOut}> Se déconnecter </button>
		</div>
	</div>

	<div class="m-auto w-fit py-24">
		{#if $page.url.pathname != '/taxes'}
			<div class="border rounded dotted px-4 py-3 mb-20">
				<div class="flex divide-x">
					<div class="pr-6">
						<div class="text-lg font-semibold">Balance</div>
						<div>
							{formatPrice(balance / 100)}
						</div>
					</div>
					<div class="px-6">
						<div class="text-lg font-semibold">Paiements en transit</div>
						{#each data.payouts.data.filter((pay) => pay.status === 'in_transit') as item}
							<div class="flex gap-6">
								<div class="">
									{formatDate(item.arrival_date * 1000)} :
								</div>
								<div>
									{formatPrice(item.amount / 100)}
								</div>
							</div>
						{/each}
					</div>
					<div class="pl-6">
						<a href="https://dashboard.stripe.com/balance/overview" target="_blank" class=""
							>voir les paiements</a
						>
					</div>
				</div>
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

						<td>
							{item.shipping.name}
						</td>

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
