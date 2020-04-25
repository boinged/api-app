import fastify from 'fastify';
import http from 'http';

import { MessageResult } from '../model/messageResult';

import { IEndpoint } from './iEndpoint';

export class Message implements IEndpoint {
	async execute(request: fastify.FastifyRequest): Promise<MessageResult> {
		return new MessageResult('Hello world!');
	}
}
