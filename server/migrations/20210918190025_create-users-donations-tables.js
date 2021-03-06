
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('username').notNullable().defaultTo('Store Manager');
      table.string('password').notNullable();
      table.string('role').notNullable();
      table.string('phone').notNullable();
      table.string('email').notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('donations', (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.string('description').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('amount').notNullable().defaultTo(0);
      table.integer('available').notNullable().defaultTo(0);
      table.date('expires').notNullable();
      table.string('rest_name').notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('donations').dropTable('users');
};
