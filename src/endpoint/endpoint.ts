import {IBody} from '../model/body';
import {Result} from '../model/result';

export interface IEndpoint {
	execute(body: IBody): Promise<Result>;
}
