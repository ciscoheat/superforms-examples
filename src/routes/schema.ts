import { z } from 'zod';

// Define at the top-level so it stays in memory and the adapter can be cached
export const schema = z.object({
	name: z.string().default('Hello world!'),
	email: z.string().email()
});
