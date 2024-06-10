import { pipe, object, string, number, integer, minLength, minValue, email, maxValue } from 'valibot';

export const schema = object({
	name: pipe(string(),minLength(3, 'Too short')),
	points: pipe(number(), integer(), minValue(0), maxValue(5)),
	email: pipe(string(), email())
});
