<script>
	let pass = '';
	async function login() {
		const res = await fetch('/admin/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ pass }),
		});
	}
</script>

<div>
	<div>
		<input
			bind:value={pass}
			class="rounded-sm border px-3 py-2 placeholder-black/50"
			id="pass"
			name="pass"
		/>
	</div>

	<div><button on:click={login}>Connecter</button></div>
</div>
