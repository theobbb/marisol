<script>
	import { onMount } from 'svelte';

	export let name,
		placeholder,
		error = 'Invalide',
		type = 'text';

	let empty = false;

	let value = '';

	let elem = null;

	onMount(() => {
		empty = elem.value === '';
	});

	let invalid = false;

	/*
	empty = value === '';

	$: empty = value === '';*/
</script>

<div class="relative max-w-[500px]">
	<input
		bind:this={elem}
		class="w-full rounded border-b text-xl outline-none"
		{type}
		id={name}
		on:focus={() => {
			empty = false;
			invalid = false;
		}}
		on:blur={(e) => {
			console.log(e.target?.value);
			empty = e.target?.value === '';
		}}
		on:change={(e) => (empty = value === '')}
		on:invalid|preventDefault={() => {
			invalid = true;
			window.scrollTo({ top: elem.offsetTop, behavior: 'smooth' });
		}}
		{name}
		{...$$restProps}
	/>
	<div
		class="pointer-events-none absolute left-0 top-0 h-full w-full opacity-60 {empty
			? ''
			: 'translate-y-[-24px] scale-[0.8]'} origin-top-left transform transition duration-[200ms] ease-in-out"
	>
		{placeholder}
	</div>
	{#if invalid}
		<div class="absolute -bottom-5 left-0 text-base text-red-600">{error}</div>
	{/if}
</div>
