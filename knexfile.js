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
			directory: './src/db/migrations'
		}
	},

	production: {
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
			directory: './src/db/migrations'
		}
	}

};
