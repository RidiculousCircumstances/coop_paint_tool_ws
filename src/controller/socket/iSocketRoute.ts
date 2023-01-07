import { Request } from 'express';
import { IMiddleware } from './IMiddleware';
import { WebSocket } from "ws";

export interface WebSocketMod extends WebSocket {
    id: string
}

export interface ISocketRoute {
  path: string;
  function: (ws: WebSocketMod, req: Request) => void;
  middlewares?: IMiddleware[];
}

