import {ServerUnaryCall, sendUnaryData} from '@grpc/grpc-js';
import {ContentResponse, ContentRequest, IContentServer} from 'api-proto';
import {Db} from 'mongodb';

import {IMessageSchema} from '../model/messageModel';

export class ContentServer implements IContentServer {
	db: Db;

	constructor(db: Db) {
		this.db = db;
	}

	async getContent(call: ServerUnaryCall<ContentRequest, ContentResponse>, callback: sendUnaryData<ContentResponse>): Promise<void> {
		const collection = this.db.collection<IMessageSchema>('message');
		const message = await collection.findOne({});

		const response = new ContentResponse();
		if (message) {
			response.setContent(message.message);
		}
		callback(null, response);
	}
}
