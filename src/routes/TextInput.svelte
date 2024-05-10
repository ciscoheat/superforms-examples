<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	export let superform: SuperForm<T>;
	export let field: FormPathLeaves<T, string>;

	const { value, errors } = formFieldProxy(superform, field);
</script>

<input aria-invalid={$errors ? 'true' : undefined} bind:value={$value} />
{#if $errors}
	<span class="invalid">{$errors}</span>
{/if}

<style>
	.invalid {
		color: red;
	}
</style>
