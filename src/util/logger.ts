export class Logger {
	static info(source: string, message: Record<string, unknown>): void {
		const log = JSON.stringify({source, ...message});
		console.info(log);
	}
}
