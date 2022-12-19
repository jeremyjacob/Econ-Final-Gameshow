import { createSignal, onCleanup } from 'solid-js';
import { players, setPlayers } from './game';

export const [buzzingPlayer, setBuzzingPlayer] = createSignal<
	Player | undefined
>(undefined);

export const [started, setStarted] = createSignal(false);

export function connect() {
	const eventStream = new EventSource('/api/ws-display');

	eventStream.onopen = () => {
		console.log('Stream connected ✅');
	};

	eventStream.addEventListener('players', (event) => {
		const players = JSON.parse(event.data);
		setPlayers(players);
	});

	eventStream.addEventListener('start', (event) => {
		console.log('start');
		setStarted(true);
	});

	eventStream.addEventListener('end', (event) => {
		console.log('end');
		setStarted(false);
		setBuzzingPlayer(undefined);
	});

	eventStream.addEventListener('done-buzzing', (event) => {
		setBuzzingPlayer(undefined);
	});

	eventStream.addEventListener('buzz', (event) => {
		const player: Player = JSON.parse(event.data);
		setBuzzingPlayer(players.find(({ id }) => id === player.id));
		setTimeout(() => {
			console.log('buzz', buzzingPlayer());
		}, 1);
	});

	onCleanup(() => {
		eventStream.close();
	});
}
