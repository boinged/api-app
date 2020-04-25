import fastify from 'fastify';
import helmet from 'fastify-helmet';

import { Router } from './router/router';
import { Config } from './config/config';
import { Connector } from './database/connector';

const start = async (): Promise<void> => {
	const server = fastify({logger: true});
	server.register(helmet);

	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}

	let connector = new Connector(Config.databaseUri);
	let db = await connector.connect();

	let router = new Router(db);

	server.register(router.generateRoutes.bind(router));

	await server.listen(Config.port, '::');
};

start();
