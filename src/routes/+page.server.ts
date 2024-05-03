import { message, superValidate } from 'sveltekit-superforms';
import { schemasafe } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

export const load = async () => {
	const adapter = schemasafe(schema);
	const form = await superValidate(adapter);

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const adapter = schemasafe(schema);
		const form = await superValidate(request, adapter);

		console.log(form);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data

		return message(form, 'Form posted successfully!');
	}
};
