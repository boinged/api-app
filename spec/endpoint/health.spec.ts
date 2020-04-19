import { Health } from '../../src/endpoint/health';
import fastify from 'fastify';
import http from 'http';

describe('health', () => {
	let endpoint: Health;
	let request: fastify.FastifyRequest;
	let response: fastify.FastifyReply<http.ServerResponse>;

	beforeEach(() => {
		endpoint = new Health();
		request = {} as fastify.FastifyRequest;
		response = jasmine.createSpyObj('response', ['send']);
	});

	describe('execute', () => {
		it('responds successfully', () => {
			endpoint.execute(request, response);
			expect(response.send).toHaveBeenCalledWith('OK');
		});
	});
});
