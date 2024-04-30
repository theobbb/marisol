export function formatPrice(price) {
	return format.format(price);
}

const format = new Intl.NumberFormat('fr-CA', {
	style: 'currency',
	currency: 'CAD',
});
