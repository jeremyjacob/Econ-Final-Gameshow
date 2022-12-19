import { APIEvent } from 'solid-start';
import { eventStream } from 'solid-start/server';
import { game, players } from '~/lib/game';

export let senders: ((event: string, data: any) => void)[] = [];

export function GET({ request }: APIEvent) {
	return eventStream(request, (send) => {
		senders.push(send);
		send('players', JSON.stringify(players));
		if (game.answeringPlayer) {
			send('buzz', JSON.stringify(game.answeringPlayer));
		}
		return () => {};
	});
}
