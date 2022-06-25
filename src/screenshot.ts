import robot from 'robotjs';
import Jimp from 'jimp';
import { Commands } from './constants';

export const screenshot = async () => {
	const { x, y } = robot.getMousePos();
	const size = 200;
	const raw = robot.screen.capture(x - size / 2, y - size / 2, size, size);
	const image = new Jimp({ data: raw.image, width: size, height: size });

	// brg -> rgb fix
	for (let i = 0; i < raw.image.length; i += 4) {
		[image.bitmap.data[i], image.bitmap.data[i + 2]] =
			[image.bitmap.data[i + 2], image.bitmap.data[i]];
	}

	const encodedPicture = (await image.getBufferAsync(Jimp.MIME_PNG)).toString('base64');

	return Commands.PRNT_SCRN + ' ' + encodedPicture;
}
