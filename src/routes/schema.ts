import { Type } from '@sinclair/typebox';

export const schema = Type.Object({
	name: Type.String({ default: 'Hello world!' }),
	email: Type.String({ format: 'email' })
});
