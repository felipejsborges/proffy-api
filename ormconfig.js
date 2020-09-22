module.exports = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		"./src/infra/typeorm/entities/*.ts"
	],
	migrations: [
		"./src/infra/typeorm/migrations/*.ts"
	],
	cli: {
		migrationsDir: "./src/infra/typeorm/migrations"
	}
}
