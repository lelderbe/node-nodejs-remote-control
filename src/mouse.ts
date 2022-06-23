import robot from 'robotjs';

export const getMousePos = () => {
	const mouse = robot.getMousePos();
	return [mouse.x, mouse.y];
}

export const mouseMove = (dx: number, dy: number) => {
	// const [x, y] = getMousePos();
	const { x, y } = robot.getMousePos();
	robot.moveMouse(x + dx, y + dy);
}

export const moveLeft = ([dx, ...rest]: number[]) => {
	mouseMove(-dx, 0);
}

export const moveRight = ([dx, ...rest]: number[]) => {
	mouseMove(dx, 0);
}

export const moveUp = ([dy, ...rest]: number[]) => {
	mouseMove(0, -dy);
}

export const moveDown = ([dy, ...rest]: number[]) => {
	mouseMove(0, dy);
}
