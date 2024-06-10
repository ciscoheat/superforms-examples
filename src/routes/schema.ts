import { pipe, object, integer, minValue, number, maxValue } from 'valibot';

export const schema = object({
	id: pipe(number(), integer(), minValue(1), maxValue(5000))
});
