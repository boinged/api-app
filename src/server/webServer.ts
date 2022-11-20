import helmet from '@fastify/helmet';
import websocket from '@fastify/websocket';
import {fastify, FastifyInstance} from 'fastify';
import {Db} from 'mongodb';

import {Health} from '../endpoint/health';
import {Message} from '../endpoint/message';
import {IBody} from '../model/body';
import {Logger} from '../util/logger';

export class WebServer {
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

	async start(port: number): Promise<void> {
		const webServer = fastify();
		await webServer.register(helmet);
		await webServer.register(websocket);
	
		webServer.get('/connect', {websocket: true}, (connection, request) => {
			Logger.info('index', {info: `Connection open ${request.socket.remoteAddress}`});
	
			connection.socket.on('message', (message) => {
				Logger.info('index', {info: `Message ${message.toString()} from ${request.socket.remoteAddress}`});
			});
	
			connection.socket.on('close', () => {
				Logger.info('index', {info: `Connection close ${request.socket.remoteAddress}`});
			});
		});
	
		webServer.register(this.applyRoutes.bind(this));
	
		await webServer.listen({
			host: '::',
			port
		});
		Logger.info(this.constructor.name, {info: `web server started on port ${port}`});
	}
}
