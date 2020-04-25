import fastify from 'fastify';

import { Message } from '../../src/endpoint/message';
import { MessageResult } from '../../src/model/messageResult';

describe('message', () => {
	let endpoint: Message;
	let request: fastify.FastifyRequest;

	beforeEach(() => {
		endpoint = new Message();
		request = {} as fastify.FastifyRequest;
	});

	describe('execute', () => {
		it('replies with a message result', async () => {
			const result = await endpoint.execute(request);
			expect(result).toBeInstanceOf(MessageResult);
			expect(result.message).toBeDefined();
		});
	});
});
