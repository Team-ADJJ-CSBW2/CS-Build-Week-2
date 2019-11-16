exports.up = function(knex) {
  return knex.schema.createTable("map", map => {
    map.increments("room_id");

    map.string("title", 256);
    map.string("description", 256);
    map.string("coordinates", 256);

    map.specificType("exits", "text ARRAY");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("map");
};
