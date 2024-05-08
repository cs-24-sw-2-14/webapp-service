import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const response = await fetch('http://localhost:5123' + '/v1/board/validate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ boardId: params.slug })
		});
		if (response.ok) {
			return {
				slug: params.slug
			};
		}
		throw error(404, 'Board does not exist');
	} catch (error) {
		throw error(500, 'Failed to fetch data');
	}
}
