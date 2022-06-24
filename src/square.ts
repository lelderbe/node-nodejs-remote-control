import robot from 'robotjs';
import { Commands } from './constants';

export const drawRectangle = async ([sizeX, sizeY, ...rest]: number[]) => {
	robot.setMouseDelay(80);

	let { x, y } = robot.getMousePos();

	// click to get focus - need for Mac ?
	// robot.mouseClick('left');
	robot.mouseToggle('down');

	robot.moveMouse(x + sizeX, y);
	robot.moveMouse(x + sizeX, y + sizeY);
	robot.moveMouse(x, y + sizeY);
	robot.moveMouse(x, y);

	robot.mouseToggle('up');

	return Commands.DRAW_RECTANGLE;
}

export const drawSquare = async ([size, ...rest]: number[]) => {
	await drawRectangle([size, size]);
	return Commands.DRAW_SQUARE;
}
