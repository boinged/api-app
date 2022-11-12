import * as assert from 'node:assert/strict';
import {after, before, beforeEach, describe, it} from 'node:test';

import {Message} from '../../src/endpoint/message';
import {IBody} from '../../src/model/iBody';
import {MessageResult} from '../../src/model/messageResult';
import {Helper} from '../helper';

describe('message', () => {
	let endpoint: Message;
	let body: IBody;

	describe('execute', () => {
		after(async () => {
			await Helper.closeDb();
		});

		before(async () => {
			const db = await Helper.openDb();
			endpoint = new Message(db);
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
