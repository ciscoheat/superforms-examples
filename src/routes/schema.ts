import { object, string } from 'yup';

export const schema = object({
	name: string().default('Hello world!'),
	email: string().email().required()
});
