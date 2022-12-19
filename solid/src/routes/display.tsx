import { Show, onMount } from 'solid-js';
import Buzzing from '~/components/display/Buzzing';
import Entry from '~/components/display/Entry';
import Scoreboard from '~/components/display/Scoreboard';

import { buzzingPlayer, connect, started } from '~/lib/display-client';
import { players } from '~/lib/game';

onMount(() => {
	connect();
});

export default function Display() {
	return (
		<main class="h-full">
			<Buzzing player={buzzingPlayer} />
			<Show when={started()}>
				<Scoreboard players={players}></Scoreboard>
			</Show>
			<Show when={!started()}>
				<Entry></Entry>
			</Show>
		</main>
	);
}
