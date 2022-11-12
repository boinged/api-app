import * as assert from 'node:assert/strict';
import {before, beforeEach, describe, it} from 'node:test';

import {Health} from '../../src/endpoint/health';
import {HealthResult} from '../../src/model/healthResult';
import {IBody} from '../../src/model/iBody';

describe('health', () => {
	let endpoint: Health;
	let body: IBody;

	describe('execute', () => {
		before(() => {
			endpoint = new Health();
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
