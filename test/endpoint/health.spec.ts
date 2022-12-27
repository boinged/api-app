import * as assert from 'node:assert/strict';
import {before, beforeEach, describe, it} from 'node:test';

import {HealthEndpoint} from '../../src/endpoint/healthEndpoint';
import {IBody} from '../../src/model/body';
import {HealthResult} from '../../src/model/healthResult';

describe('health', () => {
	let endpoint: HealthEndpoint;
	let body: IBody;

	describe('execute', () => {
		before(() => {
			endpoint = new HealthEndpoint();
		});

		beforeEach(() => {
			body = {};
		});

		it('replies with a health result', async () => {
			const result = await endpoint.execute(body);
			assert(result instanceof HealthResult);
			assert.equal(result.health, 'OK');
		});
	});
});
