<script lang="ts">
	import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import { fileProxy, filesFieldProxy, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const superform = superForm(data.form, {
		validators: zod(schema),
		resetForm: true
	});
	const { form, message, enhance, errors } = superform;

	const files = filesFieldProxy(superform, 'images');
	const { values, valueErrors } = files;

	const file = fileProxy(form, 'image');

	/////////////////////////////////////////////////////////////////////////////

	function setFile() {
		file.set(new File(['1234566'], 'test.txt', { type: 'text/plain' }));
	}

	function addFile() {
		const newFile = new File(['7890123'], 'test2.txt', { type: 'text/plain' });
		files.values.update(($files) => [...$files, newFile]);
	}
</script>

<SuperDebug data={$form} />

{#if $message}<h4>{$message}</h4>{/if}

<form method="POST" enctype="multipart/form-data" use:enhance>
	<label>
		Upload one file, max 100 Kb: <input
			bind:files={$file}
			accept="image/png, image/jpeg"
			name="image"
			type="file"
		/>
		{#if $errors.image}
			<div class="invalid">{$errors.image}</div>
		{/if}
	</label>
	<label>
		Upload files, max 100 Kb: <input
			multiple
			bind:files={$values}
			accept="image/png, image/jpeg"
			name="images"
			type="file"
		/>
		<ul class="invalid">
			{#each $valueErrors as error, i}
				{#if error}
					<li>Image {i + 1}: {error}</li>
				{/if}
			{/each}
		</ul>
	</label>
	<div class="buttons">
		<div><button>Submit</button></div>
		<div class="button-group">
			<b>Actions</b>
			<div>
				<button type="button" onclick={setFile}>Set file programmatically</button>
			</div>
			<div>
				<button type="button" onclick={addFile}>Add a file</button>
			</div>
		</div>
	</div>
</form>

<hr />
<p>
	💥 <a target="_blank" href="https://superforms.rocks">Created with Superforms for SvelteKit</a> 💥
</p>

<style>
	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.button-group {
		margin: 1rem 0;
		border: 2px dashed #1d7484;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	form {
		margin: 2rem 0;

		input {
			background-color: #dedede;
		}

		.invalid {
			color: crimson;
		}
	}
</style>
