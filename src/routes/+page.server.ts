import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './schema.js';

export const load = async () => {
	return { form: await superValidate(zod4(schema)) };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Form posted successfully!');
	}
};
