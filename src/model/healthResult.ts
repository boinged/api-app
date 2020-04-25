import { Result } from './result';

export class HealthResult extends Result {
	health: string;

	constructor() {
		super();
		this.health = 'OK';
	}
}
