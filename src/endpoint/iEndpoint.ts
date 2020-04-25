import { FastifyRequest } from 'fastify';

import { Result } from '../model/result';

export interface IEndpoint {
	execute(request: FastifyRequest): Promise<Result>;
}
