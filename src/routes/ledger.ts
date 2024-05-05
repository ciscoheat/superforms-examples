const transaction = () => ({
	id: Math.random().toString().slice(2),
	amount: intBetween(5, 5000),
	category: intBetween(1, 9),
	date: new Date('2024-04-' + intBetween(1, 30))
});

function intBetween(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const ledger = [...Array(100)].map(() => transaction());
