import fastify from 'fastify';

import { Health } from '../../src/endpoint/health';
import { HealthResult } from '../../src/model/healthResult';

describe('health', () => {
	let endpoint: Health;
	let request: fastify.FastifyRequest;

	beforeEach(() => {
		endpoint = new Health();
		request = {} as fastify.FastifyRequest;
	});

	describe('execute', () => {
		it('replies with a health result', async () => {
			let result = await endpoint.execute(request);
			expect(result).toBeInstanceOf(HealthResult);
			expect(result.health).toEqual('OK');
		});
	});
});
