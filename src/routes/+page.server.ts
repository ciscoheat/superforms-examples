import { message, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema.js';

// Arktype requires explicit default schema values for now
// Make sure they are defined on the top-level so the adapter can be cached
const defaults = { name: '', email: '' };

export const load = async () => {
	const form = await superValidate(arktype(schema, { defaults }));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, arktype(schema, { defaults }));
		console.log(form);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data

		return message(form, 'Form posted successfully!');
	}
};
