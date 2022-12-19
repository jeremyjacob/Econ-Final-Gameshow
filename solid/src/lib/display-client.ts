import { createSignal, onCleanup } from 'solid-js';
import { players, setPlayers } from './game';

export const [buzzingPlayer, setBuzzingPlayer] = createSignal<
	Player | undefined
>(undefined);

export const [started, setStarted] = createSignal(false);

export function connect() {
	const start = new Audio('start.mp3');
	start.loop = true;
	const asking = new Audio('asking.mp3');
	asking.loop = true;
	const answering = new Audio('answering.mp3');
	answering.loop = true;
	const eventStream = new EventSource('/api/ws-display');

	eventStream.onopen = () => {
		console.log('Stream connected ✅');
		start.currentTime = 0;
		setTimeout(() => start.play(), 10);
	};

	eventStream.addEventListener('players', (event) => {
		const players = JSON.parse(event.data);
		setPlayers(players);
	});

	eventStream.addEventListener('start', (event) => {
		console.log('start');
		asking.currentTime = 0;
		setTimeout(() => asking.play(), 10);
		start.pause();
		answering.pause();
		setStarted(true);
	});

	eventStream.addEventListener('end', (event) => {
		console.log('end');
		start.currentTime = 0;
		setTimeout(() => start.play(), 10);
		asking.pause();
		answering.pause();
		setStarted(false);
		setBuzzingPlayer(undefined);
	});

	eventStream.addEventListener('done-buzzing', (event) => {
		asking.currentTime = 0;
		setTimeout(() => asking.play(), 10);
		start.pause();
		answering.pause();
		setBuzzingPlayer(undefined);
	});

	eventStream.addEventListener('buzz', (event) => {
		answering.currentTime = 0;
		setTimeout(() => answering.play(), 10);
		asking.pause();
		answering.pause();

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
