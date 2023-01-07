import { WebSocket, Server } from "ws";
import { Request } from 'express';
import {  } from 'express-ws';
import { Injectable } from 'inversion-tools';
import { BaseSocketController } from './BaseSocketController';
import { WebSocketMod } from './iSocketRoute';


@Injectable()
export class SocketController extends BaseSocketController {

	constructor(private readonly aWss: Server) {
		super();

		this.bindRoutes([{
			path: '/',
			function: this.entryPoint
		}]);
	}

	async entryPoint(ws: WebSocketMod, req: Request) {
		ws.on('message', (msgRow) => {
			const msg = JSON.parse((msgRow as unknown) as string);

			switch (msg.method) {
				case 'connection':
					this.connectionHandler(ws, msg);
					break;
				case 'draw':
					this.broadcastConnection(ws, msg);
					break;
				default:
					return;
			}
		});

	}

	async connectionHandler(ws: WebSocketMod, msg: any) {
			ws.id = msg.id;
			this.broadcastConnection(ws, msg);
	}
	

	async broadcastConnection(ws: WebSocketMod, msg: any) {
		this.aWss.clients.forEach((client) => {
			if ((client as WebSocketMod).id === ws.id) {
				client.send(JSON.stringify(msg));
			}
		});
	}
}
