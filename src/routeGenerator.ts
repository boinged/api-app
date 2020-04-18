import express, {Router} from 'express';
import { Health } from './endpoint/health';
import { Content } from './endpoint/content';

export class RouteGenerator {
	router: Router;

	constructor() {
		this.router = express.Router();

		let endpoints = [new Health(), new Content()];
		endpoints.forEach((endpoint) => this.router.get('/' + endpoint.constructor.name, endpoint.execute.bind(endpoint)));
	}
}
