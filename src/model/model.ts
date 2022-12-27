import {Collection, Document, Db} from 'mongodb';

export class Model<T extends Document> {
	collection: Collection<T>;

	constructor(db: Db, collectionName: string) {
		this.collection = db.collection<T>(collectionName);
	}
}
