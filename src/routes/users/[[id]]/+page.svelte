<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import spinner from '$lib/spinner.svg';

	let { data } = $props();

	const { form, errors, enhance, delayed, message, constraints, reset } = superForm(data.form, {
		resetForm: false,
		onUpdated() {
			// Fix for resetting the form when creating a user.
			if (!data.form.data.id) {
				reset({ keepMessage: true });
			}
		}
	});
</script>

<h1>Superforms CRUD</h1>

<h3>Users</h3>
<div class="users">
	{#if $form.id}
		<form action="/users">
			<button>Create new</button>
		</form>
	{/if}
	{#each data.users as user}
		<a href="/users/{user.id}">{user.name}</a>
	{/each}
</div>

{#if $message}
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<h4 class="message" class:success={page.status < 400} class:error={page.status >= 400}>
		{$message}
	</h4>
{/if}

<h2>{!$form.id ? 'Create' : 'Update'} user</h2>

<form method="POST" use:enhance>
	<input type="hidden" name="id" bind:value={$form.id} />

	<label>
		Name<br />
		<input
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	</label>

	<label>
		E-mail<br />
		<input
			name="email"
			type="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	</label>

	<div class="buttons">
		<button>Submit</button>
		{#if $form.id}
			<button
				name="delete"
				class="danger"
				onclick={(e) => !confirm('Are you sure?') && e.preventDefault()}
			>
				Delete user
			</button>
		{/if}
		{#if $delayed}<img src={spinner} alt="Loading..." />{/if}
	</div>
	<div><input type="checkbox" name="delay" /> Delay response 2s</div>
</form>

<div class="follow">
	<hr />
	<a target="_blank" href="https://superforms.rocks/crud">Follow along the tutorial here!</a>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		align-items: flex-start;
		margin-bottom: 2em;
	}

	input {
		background-color: #dedede;
	}

	hr {
		width: 100%;
		margin-block: 2em;
	}

	.buttons {
		display: flex;
		width: min-content;
		gap: 0.75rem;
		align-items: center;
	}

	.buttons img {
		margin-bottom: 0;
		max-width: 24px;
	}

	.message {
		color: white;
		padding: 7px 10px;
		border-radius: 2px;
	}

	.invalid {
		color: red;
	}

	.delay {
		background-color: lightblue;
	}

	.message.success {
		background-color: green;
	}

	.message.error {
		background-color: red;
	}

	.danger {
		background-color: brown;
	}

	.users {
		columns: 3 150px;
	}

	.users > * {
		display: block;
		white-space: nowrap;
		overflow-x: hidden;
	}

	.users a:hover {
		border-bottom: none;
	}

	.follow {
		margin-top: 3rem;
	}
</style>
