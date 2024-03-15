<script>
	export let menuOpen;
</script>

<div
	class=" relative flex h-5 w-7 flex-col items-end justify-between [&>div]:bg-accent {menuOpen
		? 'translate-x-[-3px] translate-y-[-2px]'
		: ''} transition duration-500 ease-in-out"
>
	<div
		class="h-[2px] w-full rounded {menuOpen
			? '-rotate-45 scale-x-[1.3] '
			: ''} origin-top-right transition-all duration-500 ease-in-out"
	></div>
	<div
		class="h-[2px] w-full rounded {menuOpen
			? 'translate-x-full opacity-0'
			: ''} transition-all duration-500 ease-in-out"
	></div>
	<div
		class="h-[2px] rounded {menuOpen
			? 'translate-y-[7px] rotate-45 scale-x-[1.3]'
			: 'scale-x-[0.8]'} w-full origin-bottom-right transition-all duration-500 ease-in-out"
	></div>
</div>
