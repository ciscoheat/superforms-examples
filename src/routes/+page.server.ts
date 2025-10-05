import type { Actions } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema, profileSchema } from '$lib/schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const regForm = await superValidate(zod(registerSchema));
	const profileForm = await superValidate(zod(profileSchema));

	return { regForm, profileForm };
};

export const actions = {
	register: async ({ request }) => {
		const regForm = await superValidate(request, zod(registerSchema));

		console.log('register', regForm);

		if (!regForm.valid) return fail(400, { regForm });

		return message(regForm, { text: 'Form "register" posted successfully!' });
	},

	edit: async ({ request }) => {
		const profileForm = await superValidate(request, zod(profileSchema));

		console.log('edit', profileForm);

		if (!profileForm.valid) return fail(400, { profileForm });

		return message(profileForm, { text: 'Form "profile" posted successfully!' });
	}
} satisfies Actions;
