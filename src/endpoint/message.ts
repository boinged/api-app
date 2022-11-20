import {Db} from 'mongodb';

import {IBody} from '../model/body';
import {MessageResult} from '../model/messageResult';
import {IMessageSchema} from '../model/messageSchema';

import {IEndpoint} from './endpoint';

export class Message implements IEndpoint {
	db: Db;

	constructor(db: Db) {
		this.db = db;
	}

	async execute(body: IBody): Promise<MessageResult> {
		const collection = this.db.collection<IMessageSchema>('message');
		const message = await collection.findOne({});

		return new MessageResult(message?.message ?? 'Message missing');
	}
}
