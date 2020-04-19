import fastify from 'fastify';

import { Config } from '../config/config';
import { Health } from '../endpoint/health';
import { Message } from '../endpoint/message';

export async function routes(server: fastify.FastifyInstance) {
	let health = new Health();
	server.get('/healthz', health.execute.bind(health));

	let message = new Message();
	server.get('/content', message.execute.bind(message));
}
