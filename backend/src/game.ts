type Player = {
	name: string;
	points: number;
	id: string;
};

type Game = {
	started: boolean;
	answeringPlayer: Player | undefined;
};

export let players: Player[] = [];

export const game: Game = {
	started: false,
	answeringPlayer: undefined,
};

export function startGame() {
	game.started = true;
}

export function endGame() {
	game.started = false;
	players = [];
}
