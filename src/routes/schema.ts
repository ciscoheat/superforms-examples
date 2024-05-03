import type { JSONSchema } from 'sveltekit-superforms';

export const schema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 2 },
		email: { type: 'string', format: 'email' }
	},
	required: ['name', 'email'],
	additionalProperties: false,
	$schema: 'http://json-schema.org/draft-07/schema#'
} as const satisfies JSONSchema;
