import fastify from 'fastify';
import http from 'http';

import { IEndpoint } from './iEndpoint';

export class Health implements IEndpoint {
	async execute(request: fastify.FastifyRequest, reply: fastify.FastifyReply<http.ServerResponse>): Promise<void> {
		reply.send('OK');
	}
}
