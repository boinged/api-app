import {Db} from 'mongodb';

import {IBody} from '../model/body';
import {MessageModel} from '../model/messageModel';
import {MessageResult} from '../model/messageResult';

import {IEndpoint} from './endpoint';

export class MessageEndpoint implements IEndpoint {
	model: MessageModel;

	constructor(db: Db) {
		this.model = new MessageModel(db);
	}

	async execute(body: IBody): Promise<MessageResult> {
		const message = await this.model.findOne({});

		return new MessageResult(message?.message ?? 'Message missing');
	}
}
