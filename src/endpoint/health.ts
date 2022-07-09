
import {HealthResult} from '../model/healthResult';
import {IBody} from '../model/iBody';

import {IEndpoint} from './iEndpoint';

export class Health implements IEndpoint {
	async execute(body: IBody): Promise<HealthResult> {
		return new HealthResult();
	}
}
