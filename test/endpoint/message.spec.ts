import * as assert from 'node:assert/strict';
import {before, beforeEach, describe, it} from 'node:test';

import {FastifyRequest} from 'fastify';
import {MongoMemoryServer} from 'mongodb-memory-server-core';

import {Connector} from '../../src/database/connector';
import {Message} from '../../src/endpoint/message';
import {MessageResult} from '../../src/model/messageResult';

describe('message', () => {
	let endpoint: Message;
	let request: FastifyRequest;

	describe('execute', () => {
		before(async () => {
			const mongod = await MongoMemoryServer.create();
			const uri = mongod.getUri();
			const connector = new Connector(uri);
			const db = await connector.connect();
			endpoint = new Message(db);
			await db.collection('message').insertOne({message: 'hello'});
		}, {timeout: 10000});
	
		beforeEach(() => {
			request = {} as FastifyRequest;
		});

		it('replies with a message result', async () => {
			const result = await endpoint.execute(request);
			assert(result instanceof MessageResult);
			assert(result.message);
		});
	});
});
