import {FastifyRequest} from 'fastify';
import {MongoMemoryServer} from 'mongodb-memory-server-core';

import {Connector} from '../../src/database/connector';
import {Message} from '../../src/endpoint/message';
import {MessageResult} from '../../src/model/messageResult';

describe('message', () => {
	let endpoint: Message;
	let request: FastifyRequest;

	beforeAll(async () => {
		const mongod = new MongoMemoryServer();
		const uri = await mongod.getUri();
		const connector = new Connector(uri);
		const db = await connector.connect();
		endpoint = new Message(db);
		await db.collection('message').insertOne({message: 'hello'});
	});

	beforeEach(() => {
		request = {} as FastifyRequest;
	});

	describe('execute', () => {
		it('replies with a message result', async () => {
			const result = await endpoint.execute(request);
			expect(result).toBeInstanceOf(MessageResult);
			expect(result.message).toBeDefined();
		});
	});
});
