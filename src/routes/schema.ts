import { object, string, defaulted, define } from 'superstruct';

const email = () => define<string>('email', (value) => String(value).includes('@'));

// Define at the top-level so it stays in memory and the adapter can be cached
export const schema = object({
	name: defaulted(string(), 'Hello world!'),
	email: email()
});
