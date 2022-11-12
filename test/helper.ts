import {Db} from 'mongodb';
import {MongoMemoryServer} from 'mongodb-memory-server';

import {Connector} from '../src/database/connector';

export class Helper {
	static connector: Connector;

	static mongod = new MongoMemoryServer();

	static async closeDb(): Promise<void> {
		await Helper.connector.close();
		await Helper.mongod.stop();
	}

	static async openDb(): Promise<Db> {
		await Helper.mongod.start();
		const uri = Helper.mongod.getUri();
		Helper.connector = new Connector(uri);
		const db = Helper.connector.connect();
		return db;
	}
}
