import {Server, ServerCredentials} from '@grpc/grpc-js';
import {Db} from 'mongodb';

import * as ServiceDefinition from '../proto/content_grpc_pb';
import {Logger} from '../util/logger';

import {ContentServer} from './contentServer';

export class GrpcServer {
	server: Server;

	constructor(db: Db) {
		this.server = new Server();
		let contentServer = new ContentServer(db);
		// @ts-ignore
		// eslint-disable-next-line
		this.server.addService(ServiceDefinition.Content, contentServer);
	}

	async start(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.server.bindAsync('localhost:50051', ServerCredentials.createInsecure(), (error, port) => {
				if (error) {
					return reject(error);
				}
				this.server.start();
				Logger.info(`grpc server started on port ${port}`);
				resolve();
			});
		});
	}
}
