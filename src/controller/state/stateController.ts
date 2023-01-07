import { Request, Response } from 'express';
import { Injectable } from 'inversion-tools';
import { BaseController } from './BaseController';
import fs from "fs";
import path from "path";



@Injectable()
export class StateController extends BaseController {

	constructor() {
		super();

		this.bindRoutes([
		{
			path: '/',
			method: 'get',
			function: this.downloadImage
		},
		{
			path: '/',
			method: 'post',
			function: this.uploadImage
		},
	]);
	}


	async downloadImage (req: Request, res: Response) {
		try {
			const file = fs.readFileSync(path.resolve(__dirname, '../../files', `${req.query.id}.jpg`));
			console.log(req.query.id);
			const data = `data:image/png;base64,` + file.toString('base64');
			res.json(data)
		} catch (e) {
			console.log(e);
			res.status(500).json('On download error occured');
		}
	}

	async uploadImage(req: Request, res: Response) {
		try {
			const data = req.body.img.replace('data:image/png;base64,', '');
			fs.writeFileSync(path.resolve(__dirname, '../../files', `${req.query.id}.jpg`), data, 'base64');
			return res.status(201).json({message: 'Canvas uploaded!'});
		} catch (e) {
			console.log(e);
			res.status(500).json('On upload error occured');
		}
	}

	
}
