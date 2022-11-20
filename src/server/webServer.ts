import helmet from '@fastify/helmet';
import websocket from '@fastify/websocket';
import {fastify, FastifyInstance} from 'fastify';
import {Db} from 'mongodb';

import {Health} from '../endpoint/health';
import {Message} from '../endpoint/message';
import {IBody} from '../model/body';
import {Logger} from '../util/logger';

import {IApiServer} from './apiServer';

export class WebServer implements IApiServer {
	db: Db;

	server: FastifyInstance;

	constructor(db: Db) {
		this.db = db;
		this.server = fastify();
	}

	async applyRoutes(server: FastifyInstance): Promise<void> {
		const message = new Message(this.db);
		server.get('/content', (request) => message.execute(request.body as IBody));

		const health = new Health();
		server.get('*', (request) => health.execute(request.body as IBody));
	}

	async start(port: number): Promise<void> {
		await this.server.register(helmet);
		await this.server.register(websocket);
	
		this.server.get('/connect', {websocket: true}, (connection, request) => {
			Logger.info('index', {info: `Connection open ${request.socket.remoteAddress}`});
	
			connection.socket.on('message', (message) => {
				Logger.info('index', {info: `Message ${message.toString()} from ${request.socket.remoteAddress}`});
			});
	
			connection.socket.on('close', () => {
				Logger.info('index', {info: `Connection close ${request.socket.remoteAddress}`});
			});
		});
	
		this.applyRoutes(this.server);
	
		await this.server.listen({
			host: '::',
			port
		});
		Logger.info(this.constructor.name, {info: `web server started on port ${port}`});
	}

	async stop(): Promise<void> {
		Logger.info(this.constructor.name, {info: 'web server stopping'});
		await this.server.close();
	}
}
