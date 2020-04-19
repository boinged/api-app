import fastify from 'fastify';
import http from 'http';

export interface IEndpoint {
	execute(request: fastify.FastifyRequest, reply: fastify.FastifyReply<http.ServerResponse>): Promise<void>;
}
