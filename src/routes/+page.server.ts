import type { PageServerLoad } from './$types.js';

import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { ledger } from './ledger.js';

const filterSchema = z
	.object({
		min: z.number(),
		max: z.number(),
		category: z.number().int().positive(),
		from: z.date(),
		to: z.date()
	})
	.partial();

const categories = [
	{ id: 1, name: 'Eating out' },
	{ id: 2, name: 'Groceries' },
	{ id: 3, name: 'Transportation' },
	{ id: 4, name: 'Utilities' },
	{ id: 5, name: 'Entertainment' },
	{ id: 6, name: 'Healthcare' },
	{ id: 7, name: 'Education' },
	{ id: 8, name: 'Personal Care' },
	{ id: 9, name: 'Clothing' }
].toSorted((a, b) => (a.name < b.name ? -1 : 1));

export const load: PageServerLoad = async ({ url }) => {
	const filters = await superValidate(url, zod(filterSchema));

	if (!filters.valid) {
		//error(400, 'Invalid filter: ' + Object.keys(filters.errors));
		console.log(filters.data);
	}

	const { data } = filters;

	const transactions = ledger
		.filter(
			(t) =>
				(data.min === undefined ? true : t.amount >= data.min) &&
				(data.max === undefined ? true : t.amount <= data.max) &&
				(data.category === undefined ? true : t.category == data.category) &&
				(data.from === undefined ? true : t.date >= data.from) &&
				(data.to === undefined ? true : t.date <= data.to)
		)
		.toSorted((a, b) => (a.date < b.date ? -1 : 1));

	return { transactions, categories };
};
