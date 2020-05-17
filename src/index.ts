import fastify from 'fastify';
import helmet from 'fastify-helmet';

import {Logger} from './util/logger';
import {Router} from './router/router';
import {Config} from './config/config';
import {Connector} from './database/connector';
import {GrpcServer} from './server/grpcServer';

const start = async (): Promise<void> => {
	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}
	let connector = new Connector(Config.databaseUri);
	let db = await connector.connect();

	let grpcServer = new GrpcServer(db);
	await grpcServer.start();

	const webServer = fastify({logger: Logger});
	webServer.register(helmet);

	let router = new Router(db);
	webServer.register(router.applyRoutes.bind(router));

	await webServer.listen(Config.port, '::');
};

start();
