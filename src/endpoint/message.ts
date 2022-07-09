import {Db} from 'mongodb';

import {IBody} from '../model/iBody';
import {MessageResult} from '../model/messageResult';

import {IEndpoint} from './iEndpoint';

export class Message implements IEndpoint {
	db: Db;

	constructor(db: Db) {
		this.db = db;
	}

	async execute(body: IBody): Promise<MessageResult> {
		const collection = this.db.collection('message');
		const message = await collection.findOne({});

		return new MessageResult(message?.message);
	}
}
