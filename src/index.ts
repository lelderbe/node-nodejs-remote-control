import WebSocket, { WebSocketServer } from 'ws';
import { Commands } from './constants';
import { getMousePos, mouseMove, moveDown, moveLeft, moveRight, moveUp } from './mouse';
import { drawRectangle, drawSquare } from './square';

const wss = new WebSocketServer({
	port: 8080,
	perMessageDeflate: {
		zlibDeflateOptions: {
			// See zlib defaults.
			chunkSize: 1024,
			memLevel: 7,
			level: 3
		},
		zlibInflateOptions: {
			chunkSize: 10 * 1024
		},
		// Other options settable:
		clientNoContextTakeover: true, // Defaults to negotiated value.
		serverNoContextTakeover: true, // Defaults to negotiated value.
		serverMaxWindowBits: 10, // Defaults to negotiated value.
		// Below options specified as default values.
		concurrencyLimit: 10, // Limits zlib concurrency for perf.
		threshold: 1024 // Size (in bytes) below which messages
		// should not be compressed if context takeover is disabled.
	}
});

wss.on('connection', (ws) => {
	console.log('got connection');
	ws.on('message', (data) => {
		// console.log('received:', data);
		const message = data.toString();
		console.log('received:', message);
		
		const [command, ...rest] = message.split(' ');
		const args = rest.map(Number);
		console.log('command:', command, 'args:', args);

		switch (command) {
			case Commands.DRAW_SQUARE:
				drawSquare(args);
				ws.send(command);
				break;
			case Commands.DRAW_RECTANGLE:
				drawRectangle(args);
				ws.send(command);
				break;
			case Commands.MOUSE_POSITION:
				const [x, y] = getMousePos();
				ws.send(`mouse_position ${x},${y}`);
				break;
			case Commands.LEFT:
				moveLeft(args);
				ws.send(command);
				break;
			case Commands.RIGHT:
				moveRight(args);
				ws.send(command);
				break;
			case Commands.UP:
				moveUp(args);
				ws.send(command);
				break;
			case Commands.DOWN:
				moveDown(args);
				ws.send(command);
				break;

		}
	});
});

wss.on('close', () => {
	console.log('connection closed');
});
