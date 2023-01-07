import ws, { Router as WsRouter } from 'express-ws';
import { WebSocket } from "ws";
import express, { Router, Request } from 'express';
import { Injectable } from 'inversion-tools';
import { ISocketRoute } from './iSocketRoute';

export class BaseSocketController {

	private readonly _router: WsRouter;

	constructor() {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	bindRoutes(routes: ISocketRoute[]) {
		for (const route of routes) {
			console.log(`Socket Роут: ${route.path} успешно зарегистрирован`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.function.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router.ws(route.path, pipeline);
		}
	}
}
