import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message, withFiles } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod4(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));
		console.dir(form, { depth: 8 });

		if (!form.valid) return fail(400, withFiles({ form }));

		return message(form, 'Form posted successfully!');
	}
};
