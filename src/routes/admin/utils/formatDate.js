export function formatDate(dateStr) {
	const date = new Date(dateStr);

	if (date.toString() === 'Invalid Date') return dateStr;
	const now = new Date();
	const timeDiff = now - date;

	const minutes = Math.floor(timeDiff / (1000 * 60));
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days === 0) {
		return (
			date.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			}) + ', today'
		);
	} else if (days === 1) {
		return (
			date.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			}) + ', yesterday'
		);
	} else {
		return (
			date.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			}) +
			', ' +
			days +
			' days ago'
		);
	}
}
