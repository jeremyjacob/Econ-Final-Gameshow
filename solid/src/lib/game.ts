import { createStore } from 'solid-js/store';
import { senders } from '~/routes/api/ws-display';

type Player = {
	name: string;
	score: number;
	id: string;
};

// used on both server and client, independently
export const [players, setPlayers] = createStore<Player[]>([]);

type Game = {
	started: boolean;
	answeringPlayer: Player | undefined;
};

export const game: Game = {
	started: false,
	answeringPlayer: undefined,
};

export function startGame() {
	game.started = true;
}

export function endGame() {
	game.started = false;
	setPlayers([]);
}

export function broadcastPlayers() {
	broadcast('players', JSON.stringify(players));
}

export function broadcast(type: string, payload: string) {
	for (const sender of senders) {
		sender(type, payload);
	}
}
