import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { constellations, constellationSchema } from '$lib/constellations';

const schema = z.object({
	id: constellationSchema.shape.id
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form, constellations };
};

export const actions: Actions = {
	default: async ({ request }) => {
		await new Promise((r) => setTimeout(r, 1000));

		const form = await superValidate(request, zod(schema));

		console.log('POST', form);

		if (!form.valid) {
			return message(form, 'Invalid ID for constellation.');
		}

		const index = constellations.findIndex((s) => s.id == form.data.id);

		if (!constellations[index]) {
			return message(form, 'Cannot find constellation in database.', { status: 404 });
		}

		if (constellations[index].locked) {
			return message(form, 'Constellation is locked, could not delete.', { status: 403 });
		}

		// Delete from DB
		constellations.splice(index, 1);

		return message(form, 'Constellation deleted from database.');
	}
};
