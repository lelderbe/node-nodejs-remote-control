import robot from 'robotjs';

export const drawSquare = ([size, ...rest]: number[]) => {
	// Speed up the mouse.
	robot.setMouseDelay(2);
	
	var twoPI = Math.PI * 2.0;
	var screenSize = robot.getScreenSize();
	var height = (screenSize.height / 2) - 10;
	var width = screenSize.width;
	
	for (var x = 0; x < width; x++) {
		let y = height * Math.sin((twoPI * x) / width) + height;
		robot.moveMouse(x, y);
	}
}
