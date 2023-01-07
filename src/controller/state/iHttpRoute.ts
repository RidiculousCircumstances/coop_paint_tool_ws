import { Request, Response, Router } from 'express';
import { IMiddleware } from '../socket/IMiddleware';
import { WebSocket } from "ws";


export interface IHttpRoute {
  path: string;
  function: (req: Request, res: Response) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: IMiddleware[];
}

