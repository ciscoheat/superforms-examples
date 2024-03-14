<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { flavours } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, enhance, message } = superForm(data.form, {
		resetForm: false,
		clearOnSubmit: 'none'
	});
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<h2>Size</h2>

	<select name="scoops" bind:value={$form.scoops}>
		{#each ['One scoop', 'Two scoops', 'Three scoops'] as scoop, i}
			<option value={i + 1} selected={$form.scoops == i + 1}>{scoop}</option>
		{/each}
	</select>

	{#if $errors.scoops}<p>{$errors.scoops}</p>{/if}

	<h2>Flavours</h2>

	<!-- Note that the selected attribute is required for this to work without JS -->
	<select multiple name="flavours" bind:value={$form.flavours}>
		{#each flavours as flavour}
			<option value={flavour} selected={$form.flavours.includes(flavour)}>{flavour}</option>
		{/each}
	</select>

	{#if $errors.flavours?._errors}<p>{$errors.flavours._errors}</p>{/if}

	{#if $message}<p>{$message}</p>{/if}

	<div><button>Submit</button></div>
</form>

<p class="info">
	<a href="https://svelte.dev/tutorial/group-inputs" target="_blank"
		>Original code from Svelte documentation</a
	>
</p>

<style>
	.info {
		border-top: 1px solid gray;
		margin-top: 4rem;
	}
</style>
