import { APIEvent } from 'solid-start';
import { broadcast, broadcastPlayers, game, players } from '~/lib/game';

export async function POST({ request }: APIEvent) {
	if (!game.started) return new Response('Game not started', { status: 400 });

	const body: { rating: number } = await request.json();
	if (!game.answeringPlayer)
		return new Response('No player is answering', { status: 400 });
	if (typeof body.rating != 'number')
		return new Response('Invalid rating', { status: 400 });

	game.answeringPlayer.score += body.rating;
	players.sort((a, b) => b.score - a.score);
	game.answeringPlayer = undefined;

	broadcast('done-buzzing', '');
	setTimeout(broadcastPlayers, 800);
	return new Response('Rated', { status: 200 });
}
