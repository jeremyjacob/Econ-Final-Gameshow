import Scoreboard from '~/components/display/Scoreboard';

const players = [
	{
		name: 'Jeremy',
		score: 0,
		id: 'player1',
	},
	{
		name: 'John',
		score: 1,
		id: 'player2',
	},
	{
		name: 'Joe',
		score: 0,
		id: 'player3',
	},
	{
		name: 'Jim',
		score: 2,
		id: 'player4',
	},
	{
		name: 'Jill',
		score: 3,
		id: 'player5',
	},
];

export default function Display() {
	return (
		<main class="">
			<Scoreboard players={players}></Scoreboard>
		</main>
	);
}
