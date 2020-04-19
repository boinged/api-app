import fastify from 'fastify';
import helmet from 'fastify-helmet';
import { routes } from './routes/routes';
import { Config } from './config/config';

let server = fastify({logger: true});
server.register(helmet);
server.register(routes);

const start = async () => {
	await server.listen(Config.port);
}

start();