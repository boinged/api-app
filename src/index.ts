import express from 'express';
import helmet from 'helmet';
import { RouteGenerator } from './routeGenerator';

let app = express();

app.use(helmet());

let routeGenerator = new RouteGenerator();
app.use('/', routeGenerator.router);

let port = 8080;
app.listen(port, () => {
	console.info('Server', process.pid, 'listening on port', port);
});
