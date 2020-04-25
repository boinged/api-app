import { FastifyRequest } from 'fastify';

import { HealthResult } from '../model/healthResult';

import { IEndpoint } from './iEndpoint';


export class Health implements IEndpoint {
	async execute(request: FastifyRequest): Promise<HealthResult> {
		return new HealthResult();
	}
}
