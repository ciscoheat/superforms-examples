<script lang="ts">
	import { superForm, defaults, intProxy } from 'sveltekit-superforms';
	import type { Infer } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import spinner from './spinner.svg';

	const data = defaults(valibot(schema));

	let photoUrl = '';

	const { form, errors, message, enhance, delayed } = superForm<
		Infer<typeof schema>,
		{ status: number; text: string } // Strongly typed status message
	>(data, {
		SPA: true,
		resetForm: false,
		clearOnSubmit: 'errors-and-message',
		validators: valibot(schema),
		async onUpdate({ form }) {
			if (!form.valid) return;
			try {
				const { results } = await fetch(`https://randomuser.me/api/?seed=${form.data.id}`).then(
					(response) => response.json()
				);

				const user = results[0];
				const name = `${user.name.first} ${user.name.last}`;

				photoUrl = user.picture.large;
				form.message = { status: 200, text: `${name}, brought to you by randomuser.me` };
			} catch (e) {
				form.message = { status: 500, text: `User not found.` };
			}
		}
	});

	const id = intProxy(form, 'id', { empty: 'zero' });
</script>

<SuperDebug data={$form} />

<h3>SPA with Valibot</h3>

{#if $message}
	<div class="status" class:error={$message.status >= 400} class:success={$message.status == 200}>
		{$message.text}
	</div>
{/if}

{#if photoUrl}
	<img src={photoUrl} alt="randomuser.me" />
{/if}

<form method="POST" use:enhance>
	<label>
		Photo ID (1-5000)<br />
		<input type="number" aria-invalid={$errors.id ? 'true' : undefined} bind:value={$id} />
		{#if $errors.id}<span class="invalid">{$errors.id}</span>{/if}
	</label>

	<div class="submit">
		<button>Submit</button>
		{#if $delayed}<img src={spinner} alt="Loading..." />{/if}
	</div>
</form>

<hr />
<p>
	💥 <a target="_blank" href="https://superforms.rocks">Created with Superforms for SvelteKit</a> 💥
</p>

<style>
	.submit {
		display: flex;
		align-items: center;
	}

	.submit img {
		padding: 0;
		margin: 0 0.5rem;
	}

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
