const db = require("../data/db-config");

module.exports = {
  add,
  find,
  update,
  remove
};

async function add(room) {
  return db("map")
    .insert(room, ["*"])
    .then(() => find());
}

function find(filters) {
  if (filters) {
    return db("map")
      .select("*")
      .where(filters);
  } else {
    return db("map").select("*");
  }
}

function update(filters, changes) {
  // only allow one update at a time, so uses .first()
  return db("map")
    .update(changes, ["*"])
    .where(filters)
    .then(m =>
      find({
        id: m[0].id
      }).first()
    );
}

function remove(filters) {
  // only returns the number of deleted entries
  return db("map")
    .where(filters)
    .del();
}
