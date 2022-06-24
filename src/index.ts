import 'dotenv/config';
import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';
import { drawCircle } from './circle';
import { Commands, GREEN, RESET } from './constants';
import { getMousePos, moveDown, moveLeft, moveRight, moveUp } from './mouse';
import { drawRectangle, drawSquare } from './square';

const PORT = +process.env.PORT || 8080;

const commands = {
	[Commands.MOUSE_POSITION]: getMousePos,
	[Commands.LEFT]: moveLeft,
	[Commands.RIGHT]: moveRight,
	[Commands.UP]: moveUp,
	[Commands.DOWN]: moveDown,
	[Commands.DRAW_CIRCLE]: drawCircle,
	[Commands.DRAW_SQUARE]: drawSquare,
	[Commands.DRAW_RECTANGLE]: drawRectangle,
}

const wss = new WebSocketServer({
	port: PORT,
});

console.log(GREEN + `Web Socket Server started on port ${wss.options.port}`, RESET);

wss.on('connection', (ws, req) => {
	console.log(GREEN + 'New connection from address:', req.socket.remoteAddress, 'port:', req.socket.remotePort, RESET);

	const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

	duplex.on('data', async (message) => {
		console.log('received:', message);
		
		const [command, ...rest] = message.split(' ');
		const args = rest.map(Number);

		if (command in commands) {
			try {
				const result = await commands[command](args);
				console.log('success:', result);
				duplex.write(result);
			} catch (err: any) {
				console.log('failed:', command, ', got error:', err.message);
			}
		}
	});

	ws.on('close', () => {
		console.log(GREEN + 'Connection closed', RESET);
	});
});

wss.on('close', () => {
	console.log(GREEN + 'Server shutdown', RESET);
});

process.on('SIGINT', () => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.close();
		}
	});

	wss.close();
});
