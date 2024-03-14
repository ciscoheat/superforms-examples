import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

function join(flavours: string[]) {
	if (flavours.length === 1) return flavours[0];
	return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
}

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(
			form,
			`You ordered ${form.data.scoops} ${form.data.scoops === 1 ? 'scoop' : 'scoops'}
		of ${join(form.data.flavours)}`
		);
	}
};
