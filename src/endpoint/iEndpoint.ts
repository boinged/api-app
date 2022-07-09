import {IBody} from '../model/iBody';
import {Result} from '../model/result';

export interface IEndpoint {
	execute(body: IBody): Promise<Result>;
}
