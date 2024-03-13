import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { joi } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(joi(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, joi(schema));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
