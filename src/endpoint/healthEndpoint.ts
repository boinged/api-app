
import {IBody} from '../model/body';
import {HealthResult} from '../model/healthResult';

import {IEndpoint} from './endpoint';

export class HealthEndpoint implements IEndpoint {
	async execute(body: IBody): Promise<HealthResult> {
		return new HealthResult();
	}
}
