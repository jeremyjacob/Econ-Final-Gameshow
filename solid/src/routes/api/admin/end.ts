import { broadcast, broadcastPlayers, endGame, game } from '~/lib/game';

export function POST() {
	if (!game.started) return new Response('Game not started', { status: 400 });
	// if (c.req.query('key') !== adminKey) return new Response('Invalid key', {status: 401});

	broadcastPlayers();
	setTimeout(() => {
		broadcast('end', '');
		endGame();
	}, 1000);

	return new Response('Ended game', { status: 200 });
}
