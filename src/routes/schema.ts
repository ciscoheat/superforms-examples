import { z } from 'zod';

export const schema = z.object({
	workDone: z
		.object({
			date: z.date().nullish(),
			worker: z.string().min(1).nullish()
		})
		.array()
});
