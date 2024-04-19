import { Cart } from '$lib/server/models/Cart.js';
import sanity from '$lib/server/sanity.js';
import stripe from '$lib/server/stripe.js';
import { error, json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {

	for (let i = 0; i < 5; i++) {console.log('');}

	const { ID, address } = await request.json();

	if (!address) return error(400, 'Invalid request');

	const { country, state } = address;

	const cartId = cookies.get('cart_id');

	if (!cartId || cartId == 'undefined') return error(404, 'No cart found');
	const cart = await Cart.findById(cartId);

	if (!cart) return error(404, 'No cart found');

	let subtotal = 0;
	let taxes = [];
	let shipping = 0;
	let total = 0;

	const shop = await sanity.fetch(`*[_type == "shop-page"][0]{
        ...,
        branches[]->{
            ...,
			products[]->{
				...,
				variants[]{
					...,
					variant->{...}
				},
				category->{...},
				
			},
        	}
        }`);

	const shipping_classes = await sanity.fetch(`*[_type == "shipping"]`);

	//console.log('shop', shipping_classes);
	shop.branches.forEach((branch) => {
		branch.products.forEach((product) => {
			if (product.variants && product.variants.length) {
				product.variants.forEach((variant) => {
					const item = cart.items.find(
						(i) =>
							i.variant_id == variant?.variant?._id &&
							i.product_id === product._id,
					);
					if (!item) return;
					const shipping_key =
						variant?.shipping ||
						product.category?.category_shipping ||
						variant?.variant?.shipping ||
						branch.branch_shipping;
					if (!shipping_key) return;
					const price = findShippingClass(shipping_key);

					shipping = Math.max(shipping, price);
					console.log(shipping);
				});
			} else {
				const item = cart.items.find((i) => i.product_id === product._id);
				if (!item) return;

				const shipping_key =
					product.category?.category_shipping || branch.branch_shipping;
				if (!shipping_key) return;
				const price = findShippingClass(shipping_key);
				//console.log(product.name.fr, price);
			}
			//console.log(product.name.fr, product.shipping);
		});
	});

	function findShippingClass(key) {
		const shipping_class = shipping_classes.find((s) => s._id === key._ref);
		return shipping_class?.price[country] || shipping_class?.price.rest || 0;
	}

	let shipping_total = 100*shipping + taxe(100*shipping, false);
	
	total += shipping_total;

	cart.items.forEach((item) => {
		let amount = item.quantity * item.price * 100;
		subtotal += amount;
		total += amount + taxe(amount, item.is_book);
	});

	function push(code, amount) {
		let rate = 1;
		const formatted = `${code} (${Math.round(rate * 100000) / 1000}%)`;
		const exists = taxes.find((tax) => tax.code === formatted);
		if (exists) exists.amount += amount * rate;
		else
			taxes.push({
				amount: amount * rate,
				code: formatted,
			});
	}
	function taxe(amount, isLivre) {

		let tx = 0;
		let tpsTaux = 0.05;
		let tvqTaux = 0.0975;
		let hstTauxOnt = 0.13;
		let hstTauxMar = 0.15;
		console.log('state: ' + state);
		if (country === 'CA') {
			if (state == 'QC') {
				let xx = amount * tpsTaux;
				let tps = arrondi(amount * tpsTaux);
				console.log('xx: ' + xx);
				push('TPS', tps);
				let tvq = 0;
				if (!isLivre) {
					tvq = arrondi(tvqTaux * amount);
					push('TVQ', tvq);
				}
				tx = tps + tvq;
			} else if (state == 'ON') {
				tx = arrondi(hstTauxOnt * amount);
				push('HST', tx);
			} else if (
				state == 'NS' ||
				state == 'NB' ||
				state == 'NL' ||
				state == 'PE'
			) {
				tx = arrondi(hstTauxMar * amount);
				push('HST', tx);
			} else {
				tx = arrondi(tpsTaux * amount);
				push('GST', tx);
			}
		}
		console.log('montant: ' + amount + '  tx: ' + tx);

		return tx;
	}
	function arrondi(x) {return Math.round(100*x)/100;}

	cart.subtotal = subtotal;
	cart.taxes = taxes;
	cart.shipping = shipping;
	cart.total = total;
	await cart.save();

	if (!ID) return json(cart);
	await stripe.paymentIntents.update(ID, {
		amount: Math.round(cart.total),
	});
	return json(cart);
}