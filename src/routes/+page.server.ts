import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load: PageServerLoad = async () => {
	const workers = {
		workDone: [
			{
				worker: 'Jack',
				date: new Date('1982-07-24')
			},
			{
				worker: 'Diane',
				date: null
			}
		]
	};
	return { form: await superValidate(workers, zod(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.dir(form, { depth: 10 });

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
