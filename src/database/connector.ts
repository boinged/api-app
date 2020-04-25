import { MongoClient , Db } from 'mongodb';

export class Connector {
	client: MongoClient;

	constructor(uri: string) {
		this.client = new MongoClient(uri, { useUnifiedTopology: true });
	}

	async connect(): Promise<Db> {
		let db = await this.client.connect();
		return db.db();
	}
}
