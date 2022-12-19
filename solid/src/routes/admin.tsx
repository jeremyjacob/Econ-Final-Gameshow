import { Show, createSignal, onCleanup, onMount } from 'solid-js';

const [buzzingPlayer, setBuzzingPlayer] = createSignal<Player | undefined>(
	undefined
);
const [numPlayers, setNumPlayers] = createSignal(0);
const [started, setStarted] = createSignal(false);

export function connect() {
	const eventStream = new EventSource('/api/ws-display');

	eventStream.onopen = () => {
		console.log('Stream connected ✅');
	};

	eventStream.addEventListener('players', (event) => {
		const players = JSON.parse(event.data);
		setNumPlayers(players.length);
	});

	eventStream.addEventListener('start', (event) => {
		console.log('start');
		setStarted(true);
	});

	eventStream.addEventListener('end', (event) => {
		console.log('end');
		setStarted(false);
	});

	eventStream.addEventListener('done-buzzing', (event) => {
		console.log('done-buzzing', buzzingPlayer());
		setBuzzingPlayer(undefined);
	});

	eventStream.addEventListener('buzz', (event) => {
		const player: Player = JSON.parse(event.data);
		setBuzzingPlayer(player);
		setTimeout(() => {
			console.log('buzz', buzzingPlayer());
		}, 1);
	});

	onCleanup(() => {
		eventStream.close();
	});
}

onMount(connect);

function endGame() {
	fetch('/api/admin/end', { method: 'POST' });
}

function startGame() {
	fetch('/api/admin/start', { method: 'POST' });
}

function rate(rating: number) {
	fetch('/api/admin/rate-answer', {
		method: 'POST',
		body: JSON.stringify({ rating }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function Admin() {
	return (
		<main class="h-full bg-[#0f0f0f] p-8 md:p-16">
			<div class="w-full md:w-1/2 m-auto flex flex-col h-full">
				<h1 class="text-4xl font-semibold mb-4">🅱️ 🅱️ 🅱️ Controls</h1>
				<hr class="border-white border-opacity-20 mb-6" />
				<p class="mb-10">
					{numPlayers()} <span class="opacity-60">players</span>
				</p>
				<Show when={buzzingPlayer()}>
					<div class="flex flex-col gap-4">
						<p>
							<span class="opacity-60">Score</span>{' '}
							{buzzingPlayer()?.name}
						</p>
						<div class="grid grid-cols-2 gap-3">
							<button
								onClick={() => rate(1)}
								class="text-lg bg-green-400 bg-opacity-20 px-6 py-2.5 rounded-md"
							>
								+1
							</button>
							<button
								onClick={() => rate(0.5)}
								class="text-lg bg-yellow-300 bg-opacity-10 px-6 py-2.5 rounded-md"
							>
								+0.5
							</button>
						</div>
						<button
							onClick={() => rate(0)}
							class="text-lg bg-white bg-opacity-10 px-6 py-2.5 rounded-md"
						>
							+0
						</button>
						<button
							onClick={() => rate(-1)}
							class="text-lg bg-red-500 w-20 bg-opacity-25 px-6 py-2.5 rounded-md"
						>
							-1
						</button>
					</div>
				</Show>
				<div class="mt-auto flex">
					<button
						class="text-lg px-6 text-green-500 py-2 rounded-md disabled:opacity-20"
						onClick={startGame}
						disabled={started()}
					>
						Start
					</button>
					<button
						class="ml-auto text-lg text-red-500 px-6 py-2 rounded-md disabled:opacity-20"
						onClick={endGame}
						disabled={!started()}
					>
						End
					</button>
				</div>
			</div>
		</main>
	);
}
