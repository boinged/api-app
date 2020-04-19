import fastify from 'fastify';
import http from 'http';

import { MessageResult } from '../model/messageResult';

import { IEndpoint } from './iEndpoint';

export class Message implements IEndpoint {
	async execute(request: fastify.FastifyRequest, reply: fastify.FastifyReply<http.ServerResponse>): Promise<void> {
		let result = new MessageResult('Hello world!');
		reply.send(result);
	}
}
