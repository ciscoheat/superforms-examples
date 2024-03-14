<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	//import SuperDebug from 'sveltekit-superforms'
	import spinner from './spinner.svg';

	let { data } = $props();

	const { message, enhance, delayed, formId } = superForm(data.form, {
		delayMs: 300,
		clearOnSubmit: 'errors'
	});

	// eslint-disable-next-line svelte/valid-compile
	$page;
</script>

<h3>Superforms data list actions</h3>

<p>
	How to use a single superform in a list of items, with a delete button for each row. Uses <a
		href="https://superforms.rocks/concepts/multiple-forms"
		target="_blank">$formId</a
	>
	to be able to share the
	<a href="https://superforms.rocks/concepts/timers" target="_blank">$delayed</a> timer across the whole
	list.
</p>

<div
	class="status"
	class:hidden={!$message}
	class:error={$page.status >= 400}
	class:success={$page.status == 200}
>
	{$message}
</div>

<form method="POST" use:enhance>
	<table>
		<thead>
			<tr><th>Id</th><th>Name</th><th>Locked</th><th>Action</th></tr>
		</thead>
		<tbody>
			{#each data.constellations as c}
				<tr>
					<td>{c.id}</td>
					<td>{c.name}</td>
					<td>{c.locked ? 'Yes' : 'No'}</td>
					<td class="has-spinner">
						<button
							name="id"
							value={c.id}
							class="delete"
							onclick={() => ($formId = c.id.toString())}>Delete</button
						>

						{#if $delayed && $formId == c.id.toString()}
							<img alt="Loading..." class="spinner" src={spinner} />
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</form>

<style>
	a {
		text-decoration: underline;
	}

	.hidden {
		visibility: hidden;
	}

	.has-spinner {
		width: 160px;
	}

	.spinner {
		margin-bottom: 0;
		vertical-align: top;
	}

	.delete {
		background-color: darkred;
	}

	tr:nth-child(odd) td {
		background-color: #eee;
	}

	.status {
		color: white;
		padding: 4px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
		position: sticky;
		top: 0;
	}

	.status.success {
		background-color: seagreen;
	}

	.status.error {
		background-color: darkred;
	}

	form {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
</style>
