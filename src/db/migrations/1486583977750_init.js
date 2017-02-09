exports.up = function(knex, Promise) {
	//before the first start of the server, need to make first migration by knex:migrate latest, to create a columns
	return knex.schema.createTable('urls', function(table) {
		table.increments('id').primary();
		table.string('full_url');
		table.string('encoded');
		table.timestamps();
	})
};

exports.down = function(knex, Promise) {

	return knex.schema.dropTable('urls')
};