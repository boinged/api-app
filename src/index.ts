import * as fastify from 'fastify';
import * as helmet from 'fastify-helmet';

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

	const router = new Router(db);
	webServer.register(router.applyRoutes.bind(router));

	await webServer.listen(Config.port, '::');
};

start();
