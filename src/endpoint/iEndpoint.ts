import fastify from 'fastify';

import { Result } from '../model/result';

export interface IEndpoint {
	execute(request: fastify.FastifyRequest): Promise<Result>;
}
