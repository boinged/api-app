import {Config} from './config/config';
import {Connector} from './database/connector';
import {IApiServer} from './server/apiServer';
import {GrpcServer} from './server/grpcServer';
import {WebServer} from './server/webServer';
import {Logger} from './util/logger';

let connector: Connector;
const servers: IApiServer[] = [];

const start = async (): Promise<void> => {
	Logger.info('index', {info: 'start'});

	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}
	connector = new Connector(Config.databaseUri);
	const db = await connector.connect();

	const grpcServer = new GrpcServer(db);
	servers.push(grpcServer);
	await grpcServer.start(Config.grpcPort);

	const webServer = new WebServer(db);
	servers.push(webServer);
	await webServer.start(Config.port);

	process.once('SIGTERM', () => {
		stop;
	});
};

const stop = async(): Promise<void> => {
	Logger.info('index', {info: 'stop'});
	const promises = servers.map((server) => server.stop());
	await Promise.allSettled(promises);
	await connector?.close();
};

start();
