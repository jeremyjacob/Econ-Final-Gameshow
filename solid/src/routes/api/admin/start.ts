import { broadcast, startGame } from '~/lib/game';

export function POST() {
	broadcast('start', '');
	startGame();
	return new Response('Started game', { status: 200 });
}
