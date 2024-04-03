<div
	class="fixed left-0 top-0 z-[200] flex h-full w-full items-center justify-center"
>
	<div><div class="loader" /></div>
</div>

<style>
	.loader {
		width: 36px;
		height: 36px;
		border: 5px solid #000000;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes -global-rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
