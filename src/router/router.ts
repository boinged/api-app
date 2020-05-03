import { FastifyInstance } from 'fastify';
import { Db } from 'mongodb';

import { Health } from '../endpoint/health';
import { Message } from '../endpoint/message';

export class Router {
	db: Db;

	constructor(db: Db) {
		this.db = db;
	}

	async applyRoutes(server: FastifyInstance): Promise<void> {
		const health = new Health();
		server.get('/healthz', health.execute.bind(health));

		const message = new Message(this.db);
		server.get('/content', message.execute.bind(message));
	}
}
