import { Accessor, Setter, onMount } from 'solid-js';
import { setPlayer } from '~/routes';

function RightArrow() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-10 h-10"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
			/>
		</svg>
	);
}

export default function NameInput({
	name,
	setName,
}: {
	name: Accessor<string>;
	setName: Setter<string>;
}) {
	async function join() {
		const res = await fetch('/api/join', {
			method: 'POST',
			body: JSON.stringify({
				name: name(),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json();
		setPlayer(json);
		console.log(json);
	}

	onMount(() => {
		input?.focus();
	});
	let input: HTMLInputElement | undefined = undefined;

	return (
		<div class="flex gap-1.5 items-center">
			<input
				ref={input}
				onKeyDown={(e) => e.key === 'Enter' && join()}
				type="text"
				placeholder="Name"
				class="border-b-2 w-[18rem] border-b-white bg-transparent text-4xl pb-3 outline-none placeholder-[#ffffff44]"
				onInput={(e) => setName(e.currentTarget.value)}
			/>
			<button class={name() ? '' : 'invisible'} onClick={join}>
				<RightArrow></RightArrow>
			</button>
		</div>
	);
}
