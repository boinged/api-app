import express from 'express';

import { ContentResult } from '../model/contentResult';

import { IEndpoint } from './iEndpoint';

export class Content implements IEndpoint {
	public execute(request: express.Request, response: express.Response): void {
		let result = new ContentResult('Hello world!');
		response.json(result)
	}
}
