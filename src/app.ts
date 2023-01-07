import express, { Express } from 'express';
import ws, { Application, Instance } from "express-ws";
import { Inject, Injectable } from 'inversion-tools';
import { SocketController } from './controller/socket/socketController';
import cors from 'cors';
import { TYPES } from './types';
import { StateController } from './controller/state/stateController';


@Injectable()
export class App {

	app: Application;
	port: number;
	socketController: SocketController;

	constructor (@Inject(TYPES.StateController) private readonly stateController: StateController) {
		const { app, getWss } = ws(express());
		this.app = app;
		this.port = (process.env.APP_PORT as unknown) as number || 5000;
		this.socketController = new SocketController(getWss());

	}

	useMiddleWare(): void {
		this.app.use(cors());
		this.app.use(express.json());
	}

	useRoutes (): void {
		this.app.use('/', this.socketController.router);
		this.app.use('/image', this.stateController.router);
	}


	async init (): Promise<void> {
		this.useMiddleWare();
		this.useRoutes();
		try {
			this.app.listen(this.port, () => {
				console.log(`Now running on port ${this.port}`);
			});
		} catch (e) {
			console.log(e);
		}
	}
}