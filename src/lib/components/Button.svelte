<script>
	export let href = '',
		active;
</script>

<button
	{...$$props}
	on:click
	{href}
	class="rounded bg-black/10 px-2 py-0.5 font-light {active
		? 'bg-black/10 '
		: ''} {$$props.class}"
>
	<slot />
</button>
