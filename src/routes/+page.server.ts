import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

// Arktype requires explicit default values for now
const defaults = { name: 'Hello world!', email: '' };

export const load: PageServerLoad = async () => {
	return { form: await superValidate(arktype(schema, { defaults })) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, arktype(schema, { defaults }));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
