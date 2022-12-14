import { serve } from 'http';
import { Hono } from 'https://deno.land/x/hono/mod.ts';
import { endGame, game, players, startGame } from './game.ts';

const adminKey = 'admin';
const app = new Hono();

// Display API
const displayClients = new Set<WebSocket>();

function handleDisplayClient(socket: WebSocket) {
	displayClients.add(socket);
	socket.onclose = () => displayClients.delete(socket);
	socket.onmessage = (ev: MessageEvent) => {
		console.log(ev.data);
		socket.send(ev.data);
	};
}

function broadcastPlayers() {
	broadcast({ type: 'players', players: players });
}

function broadcast(msg: unknown) {
	for (const socket of displayClients) {
		socket.send(JSON.stringify(msg));
	}
}

app.all('/ws-display', (c) => {
	const { socket, response } = Deno.upgradeWebSocket(c.req);
	handleDisplayClient(socket);
	return response;
});

// Client API
app.post('/join', async (c) => {
	if (!game.started) return c.text('Game not started', 400);
	const json: { name: string } = await c.req.json();
	if (typeof json.name != 'string') return c.text('Invalid name', 400);
	const name = json.name.trim();
	const id = crypto.randomUUID();
	players.push({ name, points: 0, id });
	broadcastPlayers();
	return c.json({ type: 'joined', id, name });
});
app.post('/buzz', (c) => {
	if (!game.started) return c.text('Game not started', 400);
	const playerId = c.req.query('id');
	if (!playerId || !(players.find(({ id }) => playerId == id))) {
		return c.text('Invalid id', 400);
	}
	if (game.answeringPlayer) return c.text('Already buzzing', 400);

	game.answeringPlayer = players.find((p) => p.id === playerId);
	broadcast({ type: 'buzz', player: game.answeringPlayer });

	return c.text('Buzzed', 200);
});

// Admin API
app.post('/admin/start', (c) => {
	if (c.req.query('key') !== adminKey) return c.text('Invalid key', 401);

	startGame();
	return c.text('Started game', 200);
});
app.post('/admin/end', (c) => {
	if (!game.started) return c.text('Game not started', 400);
	if (c.req.query('key') !== adminKey) return c.text('Invalid key', 401);

	broadcastPlayers();
	setTimeout(() => {
		broadcast({ type: 'end' });
		endGame();
	}, 1000);
	return c.text('Ended game', 200);
});
app.post('/admin/rate-answer', async (c) => {
	if (!game.started) return c.text('Game not started', 400);
	if (c.req.query('key') !== adminKey) return c.text('Invalid key', 401);

	const json: { rating: number } = await c.req.json();
	if (!game.answeringPlayer) return c.text('No player is answering', 400);
	if (typeof json.rating != 'number') return c.text('Invalid rating', 400);

	game.answeringPlayer.points += json.rating;
	game.answeringPlayer = undefined;

	broadcastPlayers();
	return c.text('Rated', 200);
});

serve(app.fetch, { port: 8000 });
