import fastify from 'fastify';
import http from 'http';

import { HealthResult } from '../model/healthResult';

import { IEndpoint } from './iEndpoint';

export class Health implements IEndpoint {
	async execute(request: fastify.FastifyRequest): Promise<HealthResult> {
		return new HealthResult();
	}
}
