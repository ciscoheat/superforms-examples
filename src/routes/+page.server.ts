import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) return fail(400, { form });

		if (form.data.type === 'empty') {
			console.log('Empty name submitted');
		} else {
			console.log('Extra name: ' + form.data.name);
		}

		return message(form, 'Form posted successfully!');
	}
};
