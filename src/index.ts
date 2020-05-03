import fastify from 'fastify';
import helmet from 'fastify-helmet';

import { Logger } from './util/logger';
import { Router } from './router/router';
import { Config } from './config/config';
import { Connector } from './database/connector';

const start = async (): Promise<void> => {
	const server = fastify({logger: Logger});
	server.register(helmet);

	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}

	let connector = new Connector(Config.databaseUri);
	let db = await connector.connect();

	let router = new Router(db);
	server.register(router.applyRoutes.bind(router));

	await server.listen(Config.port, '::');
};

start();
