import {strict as assert} from 'node:assert';
import {after, before, beforeEach, describe, it} from 'node:test';

import {MessageEndpoint} from '../../src/endpoint/messageEndpoint';
import {IBody} from '../../src/model/body';
import {MessageResult} from '../../src/model/messageResult';
import {Helper} from '../helper';

describe('message', () => {
	let endpoint: MessageEndpoint;
	let body: IBody;

	describe('execute', () => {
		after(async () => {
			await Helper.closeDb();
		});

		before(async () => {
			const db = await Helper.openDb();
			endpoint = new MessageEndpoint(db);
			await db.collection('message').insertOne({message: 'hello'});
		});
	
		beforeEach(() => {
			body = {};
		});

		it('replies with a message result', async () => {
			const result = await endpoint.execute(body);
			assert(result instanceof MessageResult);
			assert(result.message);
		});
	});
});
