import { TransitionGroup, animateMove } from '@otonashixav/solid-flip';
import { For } from 'solid-js';
import { removeEls } from '~/lib/utils';
import PageDetails from './PageDetails';

function PlayerItem({ player }: { player: Player }) {
	return (
		<div class="flex flex-row items-center justify-center w-[35%]">
			<div class="flex items-center justify-center w-full text-[2.2rem] font-semibold">
				<h2 class="">{player.name}</h2>
				<h3 class="ml-auto w-10 text-center">{player.score}</h3>
			</div>
		</div>
	);
}

export default function Scoreboard({ players }: { players: Player[] }) {
	return (
		<>
			<div class="flex flex-col pb-12 items-center justify-center h-screen bg-[#145E50] text-white">
				<h1 class="text-3xl font-medium opacity-90 mb-8">Scores</h1>
				<TransitionGroup
					exit={removeEls}
					move={animateMove({ options: { duration: 500 } })}
				>
					<For each={players}>
						{(player) => <PlayerItem player={player} />}
					</For>
				</TransitionGroup>
			</div>
			<PageDetails></PageDetails>
		</>
	);
}
