function PlayerItem({ player }: { player: Player }) {
	return (
		<div class="flex flex-row items-center justify-center w-1/2">
			<div class="flex items-center justify-center w-full">
				<h2 class="text-2xl font-bold">{player.name}</h2>
				<h3 class="text-xl font-bold ml-auto">Score: {player.score}</h3>
			</div>
		</div>
	);
}

export default function Scoreboard({ players }: { players: Player[] }) {
	return (
		<main class="flex flex-col items-center justify-center h-screen bg-red-800 text-white">
			<h1 class="text-3xl font-bold">Scoreboard</h1>
			{players.map((player) => (
				<PlayerItem player={player} />
			))}
		</main>
	);
}
