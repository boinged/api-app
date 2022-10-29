export class Logger {
	static info(source: string, message: Record<string, unknown>): void {
		console.info({source, ...message});
	}
}
