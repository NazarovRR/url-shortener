// Update with your config settings.

module.exports = {

	development: {
		client: 'pg',
		connection: {
			database: 'shortenerdb',
			user:     'urlshortener',
			password: 'umbrella'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './server/src/db/migrations'
		}
	},
	production: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './server/src/db/migrations'
		}
	}

};
