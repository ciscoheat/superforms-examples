import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { superstruct } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

const defaults = { name: '', email: '' };

export const load: PageServerLoad = async () => {
	return { form: await superValidate(superstruct(schema, { defaults })) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, superstruct(schema, { defaults }));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
