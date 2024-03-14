import { object, string, number, integer, minLength, minValue, email, maxValue } from 'valibot';

export const schema = object({
	name: string([minLength(3, 'Too short')]),
	points: number([integer(), minValue(0), maxValue(5)]),
	email: string([email()])
});
