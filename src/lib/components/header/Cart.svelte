<script>
	import { navigating, page } from '$app/stores';
	import { cart, lang } from '$lib/store';

	let visible = false;

	let cartLen = 0;

	$: $cart, updateCartLen();
	function updateCartLen() {
		let len = 0;
		if (!$cart?.items) return;
		[...$cart.items].forEach((item) => {
			len += item.quantity;
		});
		cartLen = len;
	}

	$: $navigating, updateVisibility();

	updateVisibility();

	function updateVisibility() {
		console.log('navigating');
		if (cartLen > 0) {
			visible = true;

			const pathname = $page.url.pathname;
			console.log(pathname);
			if (
				pathname === '/boutique/panier' ||
				pathname === '/en/shop/cart' ||
				pathname === '/boutique/validation' ||
				pathname === '/en/shop/checkout'
			) {
				visible = false;
			} else {
				visible = true;
			}
		} else {
			visible = false;
		}
	}

	$: console.log(visible, cartLen);
</script>

<div class="fixed bottom-6 right-8 z-[200]">
	<div
		class="rounded bg-accent shadow {visible
			? ''
			: 'pointer-events-none translate-x-full opacity-0'} transition duration-500 ease-in-out"
	>
		<a
			href="/{$lang == 'fr' ? 'boutique/panier' : 'en/shop/cart'}"
			class="group text-white"
		>
			<div class="flex">
				<div
					class=" flex rounded fill-white px-3 py-2 text-xl decoration-white/40 underline-offset-4 group-hover:underline"
				>
					<div>{$lang == 'fr' ? 'Voir le panier' : 'See cart'}</div>
				</div>

				<div
					class="m-1 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-black/50 text-white"
				>
					<div class="text-sm">{cartLen}</div>
				</div>
			</div>
		</a>
	</div>
</div>
