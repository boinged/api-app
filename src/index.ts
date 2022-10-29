import {Config} from './config/config';
import {Connector} from './database/connector';
import {GrpcServer} from './server/grpcServer';
import {WebServer} from './server/webServer';

const start = async (): Promise<void> => {
	if (!Config.databaseUri) {
		throw new Error('missing database uri');
	}
	const connector = new Connector(Config.databaseUri);
	const db = await connector.connect();

	const grpcServer = new GrpcServer(db);
	await grpcServer.start();

	const webServer = new WebServer(db);
	await webServer.start(Config.port);
};

start();
