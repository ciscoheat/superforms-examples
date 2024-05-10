<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import DateInput from './DateInput.svelte';

	let { data } = $props();

	const superform = superForm(data.form, {
		dataType: 'json'
	});
	const { form, message, enhance } = superform;
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
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each $form.workDone as _, i}
		<div>Work done: <DateInput {superform} field="workDone[{i}].date" /></div>
	{/each}
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
