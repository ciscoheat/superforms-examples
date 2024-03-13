import Joi from 'joi';

export const schema = Joi.object({
	name: Joi.string().default('Hello world!'),
	email: Joi.string().email().required()
});
