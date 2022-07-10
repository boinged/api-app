import helmet from '@fastify/helmet';
import websocket from '@fastify/websocket';
import fastify from 'fastify';

import {Config} from './config/config';
import {Connector} from './database/connector';
import {Router} from './router/router';
import {GrpcServer} from './server/grpcServer';
import {Logger} from './util/logger';

const start = async (): Promise<void> => {
	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}
	const connector = new Connector(Config.databaseUri);
	const db = await connector.connect();

	const grpcServer = new GrpcServer(db);
	await grpcServer.start();

	const webServer = fastify({logger: Logger});
	webServer.register(helmet);
	webServer.register(websocket);

	webServer.get('/connect', {websocket: true}, (connection, request) => {
		connection.socket.on('open', () => {
			Logger.info(`Connection from ${request.socket.remoteAddress}`);
		});
	});

	const router = new Router(db);
	webServer.register(router.applyRoutes.bind(router));

	await webServer.listen({
		host: '::',
		port: Config.port
	});
};

start();
