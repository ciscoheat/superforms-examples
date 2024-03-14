import { z } from 'zod';

export const constellationNames = [
	'Andromeda',
	'Aquarius',
	'Aquila',
	'Bootes',
	'Cancer',
	'Canis Major',
	'Capricornus',
	'Cassiopeia',
	'Cepheus',
	'Cetus',
	'Crater',
	'Cygnus',
	'Draco',
	'Eridanus',
	'Gemini',
	'Hercules',
	'Hydra',
	'Leo',
	'Lyra',
	'Ophiuchus',
	'Orion',
	'Pegasus',
	'Perseus',
	'Pisces',
	'Sagittarius',
	'Scorpius',
	'Taurus',
	'Ursa Major',
	'Ursa Minor',
	'Virgo'
];

// See https://zod.dev/?id=primitives for schema syntax
export const constellationSchema = z.object({
	id: z.number().int().min(1),
	name: z.string().min(2),
	locked: z.boolean()
});

export type ConstellationSchema = z.infer<typeof constellationSchema>[];

export const constellations: ConstellationSchema = constellationNames.map((name, i) => ({
	id: i + 1,
	name,
	locked: !!(Math.random() > 0.5)
}));
