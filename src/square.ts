import robot from 'robotjs';
import { Commands } from './constants';
import { getMousePos } from './mouse';

export const drawRectangle = ([sizeX, sizeY, ...rest]: number[]) => {
	robot.setMouseDelay(6);

	let [x, y] = getMousePos();

	robot.mouseToggle("down");

	for (let i = 0; i < sizeX; i++, x++) {
		robot.moveMouse(x, y);
	}

	for (let i = 0; i < sizeY; i++, y++) {
		robot.moveMouse(x, y);
	}

	for (let i = 0; i < sizeX; i++, x--) {
		robot.moveMouse(x, y);
	}

	for (let i = 0; i < sizeY; i++, y--) {
		robot.moveMouse(x, y);
	}

	robot.mouseToggle("up");

	return Commands.DRAW_RECTANGLE;
}

export const drawSquare = ([size, ...rest]: number[]) => {
	drawRectangle([size, size]);
	return Commands.DRAW_SQUARE;
}
