import Vine from '@vinejs/vine';

export const schema = Vine.object({
	name: Vine.string(),
	email: Vine.string().email()
});
