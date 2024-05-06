import { Cart } from '$lib/server/models/Cart';
//d d
import { json } from '@sveltejs/kit';
// 666

export async function POST({ request }) {
	const { cart_ids } = await request.json();

	try {
		const carts = await Cart.find({
			status: 'complete',
			_id: { $in: cart_ids },
		});

		const res = {
			subtotal: 0,
			taxes: [],
			total: 0,
		};

		carts.forEach((cart) => {
			res.subtotal += cart.subtotal;
			cart.taxes.forEach((tax) => {
				const exists = res.taxes.find((t) => t.code == tax.code);
				if (!exists) {
					res.taxes.push(tax);
				} else {
					exists.amount += tax.amount;
				}
			});

			res.total += cart.total;
		});

		return json(res);
	} catch (err) {
		console.error(err);
	}
}
