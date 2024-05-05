<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	function urlParam(name: string) {
		return page.url.searchParams.get(name);
	}

	function updateFilter(el: HTMLInputElement | HTMLSelectElement) {
		const url = new URL(page.url);
		if (el.value !== '') url.searchParams.set(el.name, el.value);
		else url.searchParams.delete(el.name);

		goto(url, { keepFocus: true });
	}

	function clearFilters(...params: string[]) {
		const url = new URL(page.url);
		params.forEach((p) => url.searchParams.delete(p));
		goto(url, { keepFocus: true });
	}

	function isFiltered(...params: string[]) {
		return params.length > 0 && params.some((p) => page.url.searchParams.get(p) !== null);
	}
</script>

<div class="filters">
	{#snippet clearFilter(params: string[])}
		{#if isFiltered(...params)}
			<button onclick={() => clearFilters(...params)}>❌</button>
		{/if}
	{/snippet}

	<div>Category:</div>
	<div>
		<select name="category" oninput={(e) => updateFilter(e.currentTarget)}>
			<option value="">&lt;All&gt;</option>
			{#each data.categories as category}
				<option value={category.id} selected={urlParam('category') === category.id.toString()}>
					{category.name}
				</option>
			{/each}
		</select>
	</div>

	<div>Amount:</div>
	<div>
		<span
			>Min <input
				name="min"
				type="number"
				value={urlParam('min')}
				oninput={(e) => updateFilter(e.currentTarget)}
			/></span
		>
		<span
			>Max <input
				name="max"
				type="number"
				value={urlParam('max')}
				oninput={(e) => updateFilter(e.currentTarget)}
			/></span
		>
		{@render clearFilter(['min', 'max'])}
	</div>

	<div>Date range:</div>
	<div>
		<span
			>From <input
				name="from"
				type="date"
				value={urlParam('from')}
				oninput={(e) => updateFilter(e.currentTarget)}
			/></span
		>
		<span
			>to <input
				name="to"
				type="date"
				value={urlParam('to')}
				oninput={(e) => updateFilter(e.currentTarget)}
			/></span
		>
		{@render clearFilter(['from', 'to'])}
	</div>
</div>

<table>
	<thead>
		<tr>
			<th scope="col">Date</th>
			<th scope="col">Amount</th>
			<th scope="col">Category</th>
		</tr>
	</thead>
	<tbody>
		{#each data.transactions as t}
			<tr>
				<td>{t.date.toISOString().slice(0, 10)}</td>
				<td>{t.amount.toFixed(2)}</td>
				<td>{data.categories.find((c) => c.id === t.category)?.name}</td>
			</tr>
		{/each}
	</tbody>
</table>

<hr />
<p>
	💥 <a target="_blank" href="https://superforms.rocks">Created with Superforms for SvelteKit</a> 💥
</p>

<style>
	.filters button {
		padding: 0;
		background-color: transparent;
		border: none;
	}

	.filters {
		display: grid;
		column-gap: 2rem;
		grid-template-columns: minmax(min-content, 100px) 1fr;
		align-items: baseline;
	}

	.filters input[type='number'] {
		max-width: 100px;
	}

	table {
		margin-top: 2rem;
	}

	thead {
		background-color: #eee;
	}

	a {
		text-decoration: underline;
	}

	hr {
		margin-top: 4rem;
	}
</style>
