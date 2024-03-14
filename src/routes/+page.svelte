<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { Ratings } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, enhance, allErrors, message, submit } = superForm(data.form, {
		dataType: 'json',
		validators: valibotClient(schema)
	});

	// Require some user input per step to continue forward
	let initialStepData: Record<string, unknown> = $form;

	function onStepHandler(e: CustomEvent<{ step: number; state: { current: number } }>) {
		if (e.detail.state.current > e.detail.step) {
			// Reset step data (locking the step) when moving forward.
			initialStepData = $form;
		} else {
			// When going back, always allow forward
			initialStepData = {};
		}
	}

	// Lock the next step if no modified form data, or errors exist
	let locked = $derived(initialStepData == $form || !!$allErrors.length);
</script>

<div class="absolute w-1/2 transform translate-x-1/2">
	<SuperDebug data={$form} />
</div>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 flex flex-col items-center">
		{#if $message}
			<aside class="alert variant-filled-success max-w-md">
				<div class="alert-message">
					<h3 class="h3">Thank you!</h3>
					<p>{$message}</p>
				</div>
			</aside>
		{:else}
			<form method="POST" use:enhance>
				<Stepper
					class="bg-surface-800 p-3 rounded-lg"
					on:step={onStepHandler}
					on:complete={() => submit()}
				>
					<Step {locked}>
						<svelte:fragment slot="header">Enter your name</svelte:fragment>
						<label class="label">
							<span>Name</span>
							<input
								class="input"
								type="text"
								name="name"
								aria-invalid={$errors.name ? 'true' : undefined}
								bind:value={$form.name}
							/>
							{#if $errors.name}<span class="text-error-500">{$errors.name}</span>{/if}
						</label>
					</Step>
					<Step {locked}>
						<svelte:fragment slot="header"
							>How much do you enjoy SvelteKit and its ecosystem?</svelte:fragment
						>
						<Ratings
							value={$form.points}
							max={5}
							interactive={true}
							on:icon={(e) => ($form.points = e.detail.index)}
						>
							<svelte:fragment slot="empty"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="2em"
									height="2em"
									viewBox="0 0 256 256"
									><path
										fill="currentColor"
										d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09m-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31l13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z"
									/></svg
								></svelte:fragment
							>
							<svelte:fragment slot="full"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="2em"
									height="2em"
									viewBox="0 0 256 256"
									><path
										fill="currentColor"
										d="m234.5 114.38l-45.1 39.36l13.51 58.6a16 16 0 0 1-23.84 17.34l-51.11-31l-51 31a16 16 0 0 1-23.84-17.34l13.49-58.54l-45.11-39.42a16 16 0 0 1 9.11-28.06l59.46-5.15l23.21-55.36a15.95 15.95 0 0 1 29.44 0L166 81.17l59.44 5.15a16 16 0 0 1 9.11 28.06Z"
									/></svg
								></svelte:fragment
							>
						</Ratings>
					</Step>
					<Step {locked}>
						<svelte:fragment slot="header">And an email please</svelte:fragment>
						<label class="label">
							<span>Email</span>
							<input
								class="input"
								type="email"
								name="email"
								aria-invalid={$errors.email ? 'true' : undefined}
								bind:value={$form.email}
							/>
							{#if $errors.email}<span class="text-error-500">{$errors.email}</span>{/if}
						</label>
					</Step>
				</Stepper>
			</form>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(.stepper) {
		min-width: 350px;
	}
</style>
