<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { debounce } from 'throttle-debounce';
	import spinner from './spinner.svg?raw';

	let { data } = $props();

	const { form, errors, message, enhance } = superForm(data.form, {
		taintedMessage: null
	});

	// "SPA action form", a hidden superForm that checks for usernames against a form action
	const { submitting, submit: submitCheckUsername } = superForm(
		{ username: '' },
		{
			SPA: '?/check',
			onSubmit({ cancel, formData }) {
				if (!$form.username) cancel();
				formData.set('username', $form.username);
			},
			onUpdated({ form }) {
				$errors.username = form.errors.username;
			}
		}
	);

	const checkUsername = debounce(300, submitCheckUsername);
</script>

<SuperDebug data={$form} />

<h3>Debounced username check</h3>

<p>Alphabet names like "alpha", "delta", "romeo" are not available.</p>

{#if $message}
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<div class="status" class:error={page.status >= 400} class:success={page.status == 200}>
		{$message}
	</div>
{/if}

<form method="POST" action="?/post" use:enhance>
	<label>
		Username<br />
		<input
			name="username"
			aria-invalid={$errors.username ? 'true' : undefined}
			bind:value={$form.username}
			on:input={checkUsername}
		/>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{#if $submitting}{@html spinner}{:else if $errors.username}❌{:else if $form.username}✅{/if}
		{#if $errors.username}<div class="invalid">{$errors.username[0]}</div>{/if}
	</label>

	<label>
		Email<br />
		<input
			name="email"
			type="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	</label>

	<button>Submit</button>
</form>

<hr />
<p><a target="_blank" href="https://superforms.rocks">Created with Superforms for SvelteKit</a></p>

<style>
	.invalid {
		color: red;
	}

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

	input {
		background-color: #ddd;
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
