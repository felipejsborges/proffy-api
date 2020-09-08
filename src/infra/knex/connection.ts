import knex from 'knex';

const db = knex({
	client: 'pg',
	connection: {
		host: '172.17.0.2',
		port: 5432,
		user: 'proffyuser',
		password: 'proffypass',
		database: 'proffydb',
	},
	useNullAsDefault: true,
});

export default db;
