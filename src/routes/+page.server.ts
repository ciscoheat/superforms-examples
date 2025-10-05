import type { Actions } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { registerSchema, profileSchema } from '$lib/schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const regForm = await superValidate(zod4(registerSchema));
	const profileForm = await superValidate(zod4(profileSchema));

	return { regForm, profileForm };
};

export const actions = {
	register: async ({ request }) => {
		const regForm = await superValidate(request, zod4(registerSchema));

		console.log('register', regForm);

		if (!regForm.valid) return fail(400, { regForm });

		return message(regForm, { text: 'Form "register" posted successfully!' });
	},

	edit: async ({ request }) => {
		const profileForm = await superValidate(request, zod4(profileSchema));

		console.log('edit', profileForm);

		if (!profileForm.valid) return fail(400, { profileForm });

		return message(profileForm, { text: 'Form "profile" posted successfully!' });
	}
} satisfies Actions;
