export class Config {
	static readonly databaseUri = process.env.DATABASE_URI;

	static readonly port = Number(process.env.PORT) || 8080;
}
