export async function GET({ url, fetch }) {
	const img_url = url.pathname.replace('/coloriage/', '');
	console.log(img_url);

	const response = await fetch(img_url);
	const imageBuffer = await response.arrayBuffer();
	const headers = new Headers();

	console.log(response.headers.get('content-type'));

	headers.set('Content-Type', 'image/jpeg'); // Change this to the correct MIME type of your image
	headers.set(
		'Content-Disposition',
		'attachment; filename="downloaded-image.jpg"',
	);

	return new Response(imageBuffer, {
		status: 200,
		headers: headers,
	});
}
