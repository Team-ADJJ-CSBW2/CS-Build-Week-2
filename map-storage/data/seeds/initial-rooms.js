exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("map").insert([
    {
      room_id: 0,
      title: "A brightly lit room",
      description:
        "You are standing in the center of a brightly lit room. You notice a shop to the west and exits to the north, south and east.",
      coordinates: "(60,60)",
      elevation: 0,
      terrain: "NORMAL",
      items: [],
      exits: ["n", "s", "e", "w"]
    },
    {
      room_id: 10,
      title: "A misty room",
      description:
        "You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.",
      coordinates: "(60,61)",
      elevation: 0,
      terrain: "NORMAL",
      items: ["tiny treasure"],
      exits: ["n", "s", "w"]
    }
  ]);
};
