import { object, string, email, optional } from 'valibot';

export const schema = object({
	name: optional(string(), 'Hello world!'),
	email: string([email()])
});
