import { error } from '@sveltejs/kit';
import { boardExists } from '$lib/http';

export async function load({ params }) {
	if (await boardExists(params.slug)) {
		return {
			slug: params.slug
		};
	}
	throw error(404, 'Board does not exist');
}
