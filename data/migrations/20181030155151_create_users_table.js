
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (tb) {
    tb.increments();
    tb.string('username', 255).notNullable();
    tb.string('password', 255).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
