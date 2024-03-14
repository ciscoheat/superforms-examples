import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { schema } from './schema';

export const load: PageServerLoad = async () => {
	const form = await superValidate(valibot(schema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(schema));

		console.log('POST', form);

		if (!form.valid) return fail(400, { form });

		return message(
			form,
			'An AI will review your information and get back to you soon. Thank you for being a cog in a fully automated machine.'
		);
	}
} satisfies Actions;
