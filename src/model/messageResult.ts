import {Result} from './result';

export class MessageResult extends Result {
	message: string;

	constructor(message: string) {
		super();
		this.message = message;
	}
}
