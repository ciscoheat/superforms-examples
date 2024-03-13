import { object, string } from 'yup';

// Define at the top-level so it stays in memory and the adapter can be cached
export const schema = object({
	name: string().default('Hello world!'),
	email: string().email().required()
});
