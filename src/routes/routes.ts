import fastify from 'fastify';

import { Health } from '../endpoint/health';
import { Message } from '../endpoint/message';

export async function routes(server: fastify.FastifyInstance): Promise<void> {
	const health = new Health();
	server.get('/healthz', health.execute.bind(health));

	const message = new Message();
	server.get('/content', message.execute.bind(message));
}
