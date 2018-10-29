
exports.up = function (knex, Promise) {
  return knex.schema.createTable('notes', function (tb) {
    tb.increments();
    tb.string('title', 255).notNullable();
    tb.string('text', 255).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
