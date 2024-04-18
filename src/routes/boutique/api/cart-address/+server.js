import { Cart } from '$lib/server/models/Cart.js';
import sanity from '$lib/server/sanity.js';
import stripe from '$lib/server/stripe.js';
import { error, json } from '@sveltejs/kit';

// commentaire

export async function POST({ request, cookies }) {
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

	console.log('shop', shipping_classes);
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
				console.log(product.name.fr, price);
			}
			//console.log(product.name.fr, product.shipping);
		});
	});

	function findShippingClass(key) {
		const shipping_class = shipping_classes.find((s) => s._id === key._ref);
		return shipping_class?.price[country] || shipping_class?.price.rest || 0;
	}
	let shipping_total = shipping;
	console.log('shipping', shipping);
	if (country === 'CA') {
		if (state == 'QC') {
			push('TPS', 0.05, shipping);
			push('TVQ', 0.09975, shipping);
			shipping_total *= 1.14975;
		} else if (state == 'ON') {
			push('HST', 0.13, shipping);
			shipping_total *= 1.13;
		} else if (
			state == 'NS' ||
			state == 'NB' ||
			state == 'NL' ||
			state == 'PE'
		) {
			push('HST', 0.15, shipping);
			shipping_total *= 1.15;
		} else {
			push('GST', 0.05, shipping);
			shipping_total *= 1.05;
		}
	}

	total += shipping_total;

	cart.items.forEach((item) => {
		let amount = item.quantity * item.price * 100;
		subtotal += amount;
		if (country === 'CA') {
			if (state == 'QC') {
				push('TPS', 0.05, amount);
				if (!item.is_book) {
					push('TVQ', 0.09975, amount);
					amount *= 1.14975;
				} else {
					amount *= 1.05;
				}
			} else if (state == 'ON') {
				push('HST', 0.13, amount);
				amount *= 1.13;
			} else if (
				state == 'NS' ||
				state == 'NB' ||
				state == 'NL' ||
				state == 'PE'
			) {
				push('HST', 0.15, amount);
				amount *= 1.15;
			} else {
				push('GST', 0.05, amount);
				amount *= 1.05;
			}
		}
		total += amount;
	});

	function push(code, rate, amount) {
		const formatted = `${code} (${Math.round(rate * 100000) / 1000}%)`;
		const exists = taxes.find((tax) => tax.code === formatted);
		if (exists) exists.amount += amount * rate;
		else
			taxes.push({
				amount: amount * rate,
				code: formatted,
			});
	}

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