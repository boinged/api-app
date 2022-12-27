import {Collection, Db, Document, WithId} from 'mongodb';

export class Model<T extends Document> {
	collection: Collection<T>;

	constructor(db: Db, collectionName: string) {
		this.collection = db.collection<T>(collectionName);
	}

	async findOne(query: object): Promise<WithId<T> | null> {
		return this.collection.findOne(query);
	}
}
