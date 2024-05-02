export function formatPrice(price: number) {
	return format.format(price);
}

const format = new Intl.NumberFormat('fr-CA', {
	style: 'currency',
	currency: 'CAD'
});
