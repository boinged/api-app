import {FastifyInstance} from 'fastify';
import {Db} from 'mongodb';

import {Health} from '../endpoint/health';
import {Message} from '../endpoint/message';
import {IBody} from '../model/iBody';

export class Router {
	db: Db;

	constructor(db: Db) {
		this.db = db;
	}

	async applyRoutes(server: FastifyInstance): Promise<void> {
		const message = new Message(this.db);
		server.get('/content', (request) => message.execute(request.body as IBody));

		const health = new Health();
		server.get('*', (request) => health.execute(request.body as IBody));
	}
}
