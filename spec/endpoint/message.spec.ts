import {FastifyRequest} from 'fastify';
import {MongoMemoryServer} from 'mongodb-memory-server-core';

import {Message} from '../../src/endpoint/message';
import {MessageResult} from '../../src/model/messageResult';
import {Connector} from '../../src/database/connector';

describe('message', () => {
	let endpoint: Message;
	let request: FastifyRequest;

	beforeAll(async () => {
		let mongod = new MongoMemoryServer();
		let uri = await mongod.getUri();
		let connector = new Connector(uri);
		let db = await connector.connect();
		endpoint = new Message(db);
		await db.collection('message').insertOne({message: 'hello'});
	});

	beforeEach(() => {
		request = {} as FastifyRequest;
	});

	describe('execute', () => {
		it('replies with a message result', async () => {
			let result = await endpoint.execute(request);
			expect(result).toBeInstanceOf(MessageResult);
			expect(result.message).toBeDefined();
		});
	});
});
