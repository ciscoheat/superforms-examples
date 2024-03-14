import { z } from 'zod';

export const schema = z
	.object({
		scoops: z.number().int().min(1).default(1),
		flavours: z
			.string()
			.array()
			.min(1, 'Please select at least one flavour')
			.default(['Mint choc chip'])
	})
	.refine((data) => data.flavours.length <= data.scoops, {
		message: "Can't order more flavours than scoops!",
		path: ['flavours']
	});
