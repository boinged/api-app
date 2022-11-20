import {Server, ServerCredentials, UntypedServiceImplementation} from '@grpc/grpc-js';
import {ContentService} from 'api-proto';
import {Db} from 'mongodb';

import {Logger} from '../util/logger';

import {IApiServer} from './apiServer';
import {ContentServer} from './contentServer';

export class GrpcServer implements IApiServer {
	server: Server;

	constructor(db: Db) {
		this.server = new Server();
		const contentServer = new ContentServer(db);
		this.server.addService(ContentService, contentServer as unknown as UntypedServiceImplementation);
	}

	async start(port: number): Promise<void> {
		return new Promise((resolve, reject) => {
			this.server.bindAsync(`[::]:${port}`, ServerCredentials.createInsecure(), (error) => {
				if (error) {
					return reject(error);
				}
				this.server.start();
				Logger.info(this.constructor.name, {info: `grpc server started on port ${port}`});
				resolve();
			});
		});
	}

	async stop(): Promise<void> {
		Logger.info(this.constructor.name, {info: 'grpc server stopping'});
		return new Promise((resolve, reject) => {
			this.server.tryShutdown((error) => {
				if (error) {
					return reject(error);
				}
				resolve();
			});
		});
	}
}
