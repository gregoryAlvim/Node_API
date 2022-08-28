exports.up = knex => knex.schema.createTable("movie_notes", table => {
   table.increments("id");

   table.text("title");
   table.text("description");
   table.text("rating");
   table.integer("user_id").references("id").inTable("users");

   table.timestamp("created_at").defaultTo(knex.fn.now());
   table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("movie_notes");
