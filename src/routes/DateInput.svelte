<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import {
		dateProxy,
		formFieldProxy,
		type SuperForm,
		type FormPathLeaves
	} from 'sveltekit-superforms';

	export let superform: SuperForm<T>;
	export let field: FormPathLeaves<T, Date>;

	const { errors } = formFieldProxy(superform, field);
	$: value = dateProxy(superform, field, { format: 'date', empty: 'null' });
</script>

<input type="date" aria-invalid={$errors ? 'true' : undefined} bind:value={$value} />
{#if $errors}
	<span class="invalid">{$errors}</span>
{/if}

<style>
	.invalid {
		color: red;
	}
</style>
