import { Ecole } from '$lib/server/models/Ecole.js';
import { text } from '@sveltejs/kit';

export async function PUT({ request }) {
	const { _id, ...rest } = await request.json();

	await Ecole.findByIdAndUpdate(_id, { ...rest });
	return text('ok');
}
export async function DELETE({ request }) {
	const { _id } = await request.json();

	await Ecole.findByIdAndDelete(_id);

	return text('ok');
}
