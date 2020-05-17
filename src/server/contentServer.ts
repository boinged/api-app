import {ServerUnaryCall, sendUnaryData} from '@grpc/grpc-js';
import {Db} from 'mongodb';

import {ContentResponse, ContentRequest} from '../proto/content_pb';
import {IContentServer} from '../proto/content_grpc_pb';

export class ContentServer implements IContentServer {
	db: Db;

	constructor(db: Db) {
		this.db = db;
	}

	async getContent(call: ServerUnaryCall<ContentRequest, ContentResponse>, callback: sendUnaryData<ContentResponse>): Promise<void> {
		let collection = this.db.collection('message');
		let message = await collection.findOne({});

		let response = new ContentResponse();
		response.setContent(message.message);
		callback(null, response);
	}
}
