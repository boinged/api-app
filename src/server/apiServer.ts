export interface IApiServer {
	start(port: number): Promise<void>
	stop(): Promise<void>
}
