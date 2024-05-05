import { z } from 'zod';

export const filterSchema = z
	.object({
		amount: z.number(),
		category: z.number().int().positive(),
		from: z.date(),
		to: z.date()
	})
	.partial();
