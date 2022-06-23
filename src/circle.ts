import robot from 'robotjs';

export const drawCircle = ([radius, ...rest]: number[]) => {
	robot.setMouseDelay(6);

	const { x, y } = robot.getMousePos();
	robot.moveMouse(x + radius, y);

	// click to get focus - need for Mac ?
	// robot.mouseClick('left');
	robot.mouseToggle('down');

	for (let degree = 0; degree <= 360; degree += 1.5) {
		const dx = Math.cos(degree * Math.PI / 180) * radius;
		const dy = Math.sin(degree * Math.PI / 180) * radius;
		robot.moveMouse(x + dx, y - dy);
	}

	robot.mouseToggle('up');
}
