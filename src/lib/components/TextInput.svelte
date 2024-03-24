<script>
	export let name, placeholder;

	let empty = false;

	let value = '';

	function init(e) {
		empty = e.value === '';
	}
	/*
	empty = value === '';

	$: empty = value === '';*/
</script>

<div class="relative max-w-[500px]">
	<input
		use:init
		class="w-full rounded border-b text-xl outline-none"
		type="text"
		id={name}
		on:focus={() => (empty = false)}
		on:blur={(e) => {
			console.log(e.target?.value);
			empty = e.target?.value === '';
		}}
		on:change={(e) => (empty = value === '')}
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
</div>
