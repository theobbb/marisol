import { Cart } from '$lib/server/models/Cart.js';
import sanity from '$lib/server/sanity.js';
import stripe from '$lib/server/stripe.js';
import { error, json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { ID, address } = await request.json();

	if (!address) return error(400, 'Invalid request');

	const { country, state } = address;

	const cartId = cookies.get('cart_id');

	if (!cartId || cartId == 'undefined') return error(404, 'No cart found');
	const cart = await Cart.findById(cartId);

	if (!cart) return error(404, 'No cart found');

	let subtotal = 0;
	let discount = 0;
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

	const print_ids = [];
	function checkIfDiscounted(product) {
		if (
			product?.category?.slug?.fr?.current == 'impression-sur-papier-cartonne'
		) {
			print_ids.push(product._id);
		}
	}

	shop.branches.forEach((branch) => {
		branch.products.forEach((product) => {
			checkIfDiscounted(product);

			if (product.variants && product.variants.length) {
				product.variants.forEach((variant) => {
					const item = cart.items.find(
						(i) =>
							i.product_id === product._id &&
							(i.variant_id == variant?.variant?._id ||
								i.variant_id == i.product_id),
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
				});
			} else {
				const item = cart.items.find((i) => i.product_id === product._id);
				if (!item) return;

				const shipping_key =
					product.category?.category_shipping || branch.branch_shipping;
				if (!shipping_key) return;
				const price = findShippingClass(shipping_key);

				//console.log(product.name.fr, price);
				shipping = Math.max(shipping, price);
			}
			//console.log(product.name.fr, product.shipping);
		});
	});

	function findShippingClass(key) {
		const shipping_class = shipping_classes.find((s) => s._id === key._ref);
		return shipping_class?.price[country] || shipping_class?.price.rest || 0;
	}

	let shipping_total = 100 * shipping + taxe(100 * shipping, false);

	total += shipping_total;

	let n_books = 0;
	let n_prints = 0;

	cart.items.forEach((item) => {
		if (item.is_book) n_books += item.quantity;
		if (print_ids.includes(item.product_id)) n_prints += item.quantity;
	});

	let print_discount = 0;
	if (n_prints > 0) {
		if (n_prints >= 3) {
			print_discount = 0.3;
		} else if (n_prints == 2) {
			print_discount = 0.2;
		} else if (n_books > 0) {
			print_discount = 0.1;
		}
	}

	cart.items.forEach((item) => {
		if (print_ids.includes(item.product_id)) {
			item.discount = print_discount;
		} else {
			item.discount = 0;
		}

		const price = item.price * (1 - item.discount) * 100;

		discount += (item.price * 100 - price) * item.quantity;

		let amount = item.quantity * price;
		subtotal += amount;
		total += amount + taxe(amount, item.is_book);
	});

	function push(code, amount) {
		let rate = 1;

		const exists = taxes.find((tax) => tax.code === code);
		if (exists) exists.amount += amount * rate;
		else
			taxes.push({
				amount: amount * rate,
				code,
			});
	}
	function taxe(amount, isLivre) {
		let tx = 0;
		let tpsTaux = 0.05;
		let tvqTaux = 0.0975;
		let hstTauxOnt = 0.13;
		let hstTauxMar = 0.15;
		//console.log('state: ' + state);
		if (country === 'CA') {
			if (state == 'QC') {
				let tps = arrondi(amount * tpsTaux);
				push('TPS (5%)', tps);
				let tvq = 0;
				if (!isLivre) {
					tvq = arrondi(tvqTaux * amount);
					push('TVQ (9.75%)', tvq);
				}
				tx = tps + tvq;
			} else if (state == 'ON') {
				tx = arrondi(hstTauxOnt * amount);
				push('HST (13%)', tx);
			} else if (
				state == 'NS' ||
				state == 'NB' ||
				state == 'NL' ||
				state == 'PE'
			) {
				tx = arrondi(hstTauxMar * amount);
				push('HST (15%)', tx);
			} else {
				tx = arrondi(tpsTaux * amount);
				push('GST (5%)', tx);
			}
		}
		//console.log('montant: ' + amount + '  tx: ' + tx);

		return tx;
	}
	function arrondi(x) {
		return Math.round(100 * x) / 100;
	}

	cart.subtotal = subtotal;
	cart.discount = discount;
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
