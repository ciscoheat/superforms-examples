import { object, string, email, optional, pipe } from 'valibot';

export const schema = object({
	name: optional(string(), 'Hello world!'),
	email: pipe(string(), email())
});
