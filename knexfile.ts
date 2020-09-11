import path from 'path';

module.exports = {
	client: 'pg',
	connection: {
		host: '172.17.0.2',
		port: 5432,
		user: 'proffyuser',
		password: 'proffypass',
		database: 'proffydb',
	},
	migrations: {
		directory: path.resolve(__dirname, 'src', 'infra', 'knex', 'migrations'),
	},
	useNullAsDefault: true,
};
