import {Db} from 'mongodb';

import {Model} from './model';

export interface IMessageSchema {
	message: string;
}

export class MessageModel extends Model<IMessageSchema> {
	constructor(db: Db) {
		super(db, 'message');
	}

	async findOne(query: object): Promise<IMessageSchema | null> {
		return this.collection.findOne(query);
	}
}
