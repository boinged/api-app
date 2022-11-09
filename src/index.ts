import {Config} from './config/config';
import {Connector} from './database/connector';
import {GrpcServer} from './server/grpcServer';
import {WebServer} from './server/webServer';
import {Logger} from './util/logger';

let connector: Connector;

const start = async (): Promise<void> => {
	Logger.info('index', {info: 'start'});

	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}
	connector = new Connector(Config.databaseUri);
	const db = await connector.connect();

	const grpcServer = new GrpcServer(db);
	await grpcServer.start();

	const webServer = new WebServer(db);
	await webServer.start(Config.port);

	process.once('SIGTERM', stop);
};

const stop = async(): Promise<void> => {
	Logger.info('index', {info: 'stop'});
	await connector?.close();
};

start();
