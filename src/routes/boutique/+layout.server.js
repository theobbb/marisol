import medusa from '$lib/server/medusa';

export async function load({ cookies, parent }) {
	const { books } = await parent();

	const { products } = await medusa.products.list();

	let cart = null;

	const cartId = cookies.get('cart_id');

	if (cartId && cartId !== 'undefined') {
		const retrieved = await medusa.carts.retrieve(cartId);
		cart = retrieved.cart;
	} else {
		const newCart = await medusa.carts.create();
		cart = newCart.cart;
		cookies.set('cart_id', cart.id, { path: '/', 'max-age': 60 * 60 * 24 * 7 });
	}

	const { collections } = await medusa.collections.list();

	collections.forEach((collection) => {
		if (collection.title === 'Livres') {
			collection.title = {
				fr: 'Livres',
				en: 'Books',
			};
		} else if (collection.title === 'Impressions') {
			collection.title = {
				fr: 'Impressions',
				en: 'Prints',
			};
		} else if (collection.title === 'Produits') {
			collection.title = {
				fr: 'Produits',
				en: 'Products',
			};
		}
		collection.products = [];
	});

	products.forEach((product) => {
		const book = books.find((book) => book._id === product.handle);
		if (book) {
			product.type = 'book';
			product.item = book;
		}
		const collection = collections.find(
			(collection) => collection.id === product.collection_id,
		);
		if (collection) {
			collection.products.push(product);
		}
	});

	return {
		store: {
			products,
			cart,
			collections,
		},
	};
}
