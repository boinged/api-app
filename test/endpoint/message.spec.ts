import * as assert from 'node:assert/strict';
import {after, before, beforeEach, describe, it} from 'node:test';

import {FastifyRequest} from 'fastify';
import {MongoMemoryServer} from 'mongodb-memory-server';

import {Connector} from '../../src/database/connector';
import {Message} from '../../src/endpoint/message';
import {MessageResult} from '../../src/model/messageResult';

describe('message', () => {
	let connector: Connector;
	let endpoint: Message;
	let mongod: MongoMemoryServer;
	let request: FastifyRequest;

	describe('execute', () => {
		after(async () => {
			await connector.close();
			await mongod.stop();
		});

		before(async () => {
			mongod = await MongoMemoryServer.create();
			const uri = mongod.getUri();
			connector = new Connector(uri);
			const db = await connector.connect();
			endpoint = new Message(db);
			await db.collection('message').insertOne({message: 'hello'});
		});
	
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
