import {MongoClient, Db} from 'mongodb';

import {Logger} from '../util/logger';

export class Connector {
	client: MongoClient;

	constructor(uri: string) {
		this.client = new MongoClient(uri, {
		});
	}

	async connect(): Promise<Db> {
		await this.client.connect();
		const db = this.client.db();
		Logger.info(this.constructor.name, {info: `Connected to db ${db.databaseName}`});
		return db;
	}

	async close(): Promise<void> {
		await this.client.close();
	}
}
