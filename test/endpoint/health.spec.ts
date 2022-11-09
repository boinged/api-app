import * as assert from 'node:assert/strict';
import {before, beforeEach, describe, it} from 'node:test';

import {FastifyRequest} from 'fastify';

import {Health} from '../../src/endpoint/health';
import {HealthResult} from '../../src/model/healthResult';

describe('health', () => {
	let endpoint: Health;
	let request: FastifyRequest;

	describe('execute', () => {
		before(() => {
			endpoint = new Health();
		});

		beforeEach(() => {
			request = {} as FastifyRequest;
		});

		it('replies with a health result', async () => {
			const result = await endpoint.execute(request);
			assert(result instanceof HealthResult);
			assert.equal(result.health, 'OK');
		});
	});
});
