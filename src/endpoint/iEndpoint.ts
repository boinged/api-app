import fastify from 'fastify';
import http from 'http';

import { Result } from '../model/result';

export interface IEndpoint {
	execute(request: fastify.FastifyRequest): Promise<Result>;
}
