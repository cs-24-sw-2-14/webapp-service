import { error } from '@sveltejs/kit';
import { validateBoardId } from '$lib/http';

export async function load({ params }) {
	if (await validateBoardId(params.slug)) {
		return {
			slug: params.slug
		};
	}
	throw error(404, 'Board does not exist');
}
