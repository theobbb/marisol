<script>
	import TextInput from '$lib/components/TextInput.svelte';
	import { onMount } from 'svelte';

	export let data,
		admin = false;

	$: db = data?.ecole || {};

	const niveauxData = [
		'Maternelle',
		'1ère année',
		'2e année',
		'3e année',
		'4e année',
		'5e année',
		'6e année',
	];
	const niveaux = [];
	niveauxData.forEach((niveau, index) => {
		niveaux.push({
			id: index,
			nom: niveau,
			n_classes: 0,
			n_eleves: 0,
		});
	});
	onMount(() => {
		calculateHoraire();
	});

	let horaire_duree = 0;
	function calculateHoraire() {
		const debut = document.getElementById('horaire_debut').value;
		const fin = document.getElementById('horaire_fin').value;
		const debutSplit = debut.split(':');
		const finSplit = fin.split(':');
		const debutMinutes = parseInt(debutSplit[0]) * 60 + parseInt(debutSplit[1]);
		const finMinutes = parseInt(finSplit[0]) * 60 + parseInt(finSplit[1]);
		const duree = finMinutes - debutMinutes;
		const formatted = `${Math.floor(duree / 60)}h${duree % 60}`;
		horaire_duree = formatted;
	}
</script>

<input type="hidden" name="_id" id="_id" value={db._id} />
<div class="flex flex-col gap-12">
	<TextInput
		name="responsable_nom"
		placeholder="Nom du responsable *"
		required
		value={db.responsable_nom}
	/>
	<TextInput
		type="email"
		name="responsable_email"
		placeholder="Adresse courriel du responsable *"
		required
		value={db.responsable_email}
	/>
	<TextInput
		type="email"
		name="responsable_email"
		placeholder="Adresse courriel personnelle du responsable *"
		required
		value={db.responsable_email}
	/>
	{#if !admin}
		<div class="mb-12 mt-6 max-w-[800px]">
			Nous vous demandons votre adresse courriel personnelle pour vous envoyer
			une copie des communications à cette adresse afin d'être sûr de vous
			joindre puisque de plus en plus de centres de services scolaires bloquent
			certains courriels externes. Merci de votre compréhension.
		</div>
	{/if}
	<TextInput
		name="responsable_tel"
		placeholder="Numéro de téléphone du responsable *"
		required
		value={db.responsable_tel}
	/>
	<TextInput
		value={db.ecole}
		name="ecole"
		placeholder="Nom de l'école *"
		required
	/>
	<TextInput
		name="groupe"
		placeholder="Centre de services scolaire *"
		required
		value={db.groupe}
	/>
	<TextInput
		name="adresse"
		value={db.adresse}
		placeholder="Adresse de l'école *"
		required
	/>
	<TextInput
		name="tel"
		placeholder="Numéro de téléphone de l'école *"
		required
		value={db.tel}
	/>
	<TextInput
		name="secretaire"
		placeholder="Adresse courriel de la secrétaire *"
		required
		value={db.secretaire}
	/>
	<div class="mt-12 text-xl">
		{#if !admin}
			<div class="max-w-[500px] border-b">
				Horaire de l'école incluant les pauses (ex: 8h00 - 15h30)
			</div>
		{/if}
		<div class="mt-4">
			<div class="flex gap-2">
				<div class="opacity-60">
					<label for="appt">Heure du début de la journée</label>
				</div>
				<input
					type="time"
					id="horaire_debut"
					name="horaire_debut"
					on:change={calculateHoraire}
					required
					value={db.horaire_debut}
				/>
			</div>
			<div class="mt-2 flex gap-2">
				<div class="opacity-60">
					<label for="appt">Heure du fin de la journée:</label>
				</div>
				<input
					type="time"
					id="horaire_fin"
					name="horaire_fin"
					on:change={calculateHoraire}
					value={db.horaire_fin}
					required
				/>
			</div>
		</div>
		<div class="mt-6 text-base opacity-60">
			<div class="flex w-fit gap-2 border-t">
				<div class="">Durée de la journée:</div>
				<div>{horaire_duree || 0}</div>
			</div>
		</div>
	</div>

	<table class="mt-12 max-w-[600px] rounded border">
		<tr class="">
			<td class="w-2/5 border-b px-3 py-2.5"> Niveau </td>
			<td class=" border-b py-2.5 text-right"> Nombre de classe </td>
			<td class="border-b px-3 py-2.5 text-right">
				Nombre total d'élèves pour le niveau
			</td>
		</tr>
		{#each niveaux as item}
			<tr class="">
				<td class="px-3 py-2.5">
					{item.nom}
				</td>
				<td class="text-right">
					<input
						type="number"
						class="w-[50px] border-b"
						placeholder="0"
						id="n_classes_{item.id}"
						name="n_classes_{item.id}"
						min="0"
						value={db[`n_classes_${item.id}`]}
					/>
				</td>
				<td class="pr-3 text-right">
					<input
						type="number"
						class="w-[50px] border-b"
						placeholder="0"
						id="n_eleves_{item.id}"
						name="n_eleves_{item.id}"
						min="0"
						value={db[`n_eleves_${item.id}`]}
					/>
				</td>
			</tr>
		{/each}
	</table>
	<div class="mt-28 max-w-[800px] {admin ? '' : 'rounded border px-3 py-2.5'}">
		{#if !admin}
			<div class="text-lg leading-6">
				Les animations sont constituées d'une présentation sous forme de vidéo à
				visionner en classe la semaine précédant ma venue suivie par un atelier
				pratique de dessin. Cet atelier peut se donner en personne ou
				virtuellement.
			</div>
		{/if}
		<div class="mt-6 flex items-center gap-4 pb-4">
			<div>{admin ? `Type d'atelier` : `Quel type d'atelier voulez-vous?`}</div>
			<select
				name="type_atelier"
				id="type_atelier"
				value={db.type_atelier || 'virtuel'}
			>
				<option value="virtuel">Virtuel</option>
				<option value="presentiel">Présentiel</option>
			</select>
		</div>
	</div>
	<div class="mt-8 flex items-center gap-3">
		<input
			id="culture_a_ecole"
			type="checkbox"
			checked={db.culture_a_ecole}
			name="culture_a_ecole"
		/>
		<label for="culture_a_ecole"
			>Je fais une demande au programme La culture à l'école</label
		>
	</div>
	<div>
		<textarea
			disabled={admin}
			id="message"
			rows="6"
			name="message"
			value={db.message || ''}
			class="rounded border px-3 py-3 outline-none md:w-[500px]"
			placeholder="Message (facultatif)"
		></textarea>
	</div>
</div>
