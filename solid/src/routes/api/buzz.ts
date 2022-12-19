import { APIEvent } from 'solid-start';
import { broadcast, game, players } from '~/lib/game';

export async function POST({ request }: APIEvent) {
	if (!game.started) return new Response('Game not started', { status: 400 });

	const json = await request.json();
	const playerId = json.playerId;
	if (!playerId || !players.find(({ id }) => playerId == id)) {
		return new Response('Invalid id, try refreshing', { status: 400 });
	}

	if (game.answeringPlayer)
		return new Response('Already buzzing', { status: 400 });

	game.answeringPlayer = players.find((p) => p.id === playerId);
	broadcast('buzz', JSON.stringify(game.answeringPlayer));

	return new Response('Buzzed', { status: 200 });
}
