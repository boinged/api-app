export class Config {
	static port = Number(process.env.PORT) || 8080;

	static databaseUri = process.env.DATABASE_URI;
}
