import { APIEvent, json } from 'solid-start';
import { broadcastPlayers, players, setPlayers } from '~/lib/game';

export async function POST({ request }: APIEvent) {
	const body: { name: string } = await request.json();
	if (typeof body.name != 'string')
		return new Response('Invalid name', { status: 400 });
	const name = body.name.trim();
	const id = crypto.randomUUID();

	setPlayers([...players, { name, id, score: 0 }]);
	broadcastPlayers();

	return json({ type: 'joined', id, name });
}
