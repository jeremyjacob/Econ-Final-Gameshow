import { Show, createSignal } from 'solid-js';
import Buzzer from '~/components/client/Buzzer';
import NameInput from '~/components/client/NameInput';

const [name, setName] = createSignal('');
export const [player, setPlayer] = createSignal<Player | undefined>(undefined);

export default function Home() {
	return (
		<main class="text-center p-8 lg:p-12 h-full w-full bg-[#3A4589] grid place-items-center">
			<h1 class="text-3xl text-white text-left font-semibold absolute left-8 top-8">
				<div>Big</div>
				<div>Business</div>
				<div>Buzzer</div>
			</h1>
			<div class="">
				<Show when={player()}>
					<Buzzer></Buzzer>
				</Show>
				<Show when={!player()}>
					<NameInput name={name} setName={setName}></NameInput>
				</Show>
			</div>
		</main>
	);
}
