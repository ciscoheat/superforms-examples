import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load: PageServerLoad = async () => {
	const adapter = schemasafe(schema);
	return { form: await superValidate(adapter) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
