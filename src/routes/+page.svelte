<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import DateInput from './DateInput.svelte';
	import TextInput from './TextInput.svelte';

	let { data } = $props();

	const superform = superForm(data.form, {
		resetForm: false,
		dataType: 'json'
	});
	const { form, message, enhance } = superform;

	function addWorker() {
		$form.workDone = [...$form.workDone, { date: null, worker: '' }];
	}
</script>

<SuperDebug data={$form} />

<h3>Array of date inputs</h3>

{#if $message}
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<div class="status" class:error={page.status >= 400} class:success={page.status == 200}>
		{$message}
	</div>
{/if}

<form method="POST" use:enhance>
	<table>
		<tbody>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each $form.workDone as _, i}
				<tr>
					<td>Name <TextInput {superform} field="workDone[{i}].worker" /></td>
					<td>Work done <DateInput {superform} field="workDone[{i}].date" /></td>
				</tr>
			{/each}
		</tbody>
	</table>
	<button type="button" onclick={() => addWorker()}>Add worker</button>
	<button>Submit</button>
</form>

<hr />
<p>
	💥 <a target="_blank" href="https://superforms.rocks">Created with Superforms for SvelteKit</a> 💥
</p>

<style>
	.status {
		color: white;
		padding: 4px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
	}

	.status.success {
		background-color: seagreen;
	}

	.status.error {
		background-color: #ff2a02;
	}

	a {
		text-decoration: underline;
	}

	hr {
		margin-top: 4rem;
	}

	form {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
</style>
