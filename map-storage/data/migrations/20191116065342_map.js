exports.up = function(knex) {
  return knex.schema.createTable("map", map => {
    map.increments();

    map.integer("room_id");

    map.string("title", 256);
    map.string("description", 256);
    map.string("coordinates", 256);

    map.integer("elevation");
    map.string("terrain", 256);

    map.specificType("items", "text ARRAY");

    map.specificType("exits", "text ARRAY");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("map");
};
