import {Server, ServerCredentials} from '@grpc/grpc-js';
import {Db} from 'mongodb';
import {ContentService} from 'api-proto';

import {Logger} from '../util/logger';

import {ContentServer} from './contentServer';

export class GrpcServer {
	server: Server;

	constructor(db: Db) {
		this.server = new Server();
		let contentServer = new ContentServer(db);
		// @ts-ignore
		this.server.addService(ContentService, contentServer);
	}

	async start(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.server.bindAsync('[::]:50051', ServerCredentials.createInsecure(), (error, port) => {
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
