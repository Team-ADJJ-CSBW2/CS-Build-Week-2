const express = require("express");

const Maps = require("../models/maps");

const router = express.Router();

// GET
router
  .route("/")
  .get(async (req, res) => {
    try {
      // get all rooms and sort by room id
      const rooms = await Maps.find();
      rooms.sort((a, b) => a.room_id - b.room_id);

      // build graph of map
      let graph = {};
      // loop through rooms, turn coordinates string to coordinate array [x, y]
      rooms.forEach(r => {
        graph[r.room_id] = {};
        let coords = r.coordinates
          .slice(1, r.coordinates.length - 1)
          .split(",")
          .map(Number);
        let x = coords[0];
        let y = coords[1];
        // find rooms with coordinates matching destination
        let n = rooms.find(r => r.coordinates === `(${x},${y + 1})`);
        let s = rooms.find(r => r.coordinates === `(${x},${y - 1})`);
        let e = rooms.find(r => r.coordinates === `(${x + 1},${y})`);
        let w = rooms.find(r => r.coordinates === `(${x - 1},${y})`);
        // if room exists return room id, else return question mark
        r.exits.forEach(ex => {
          if (ex === "n" && n) graph[r.room_id][ex] = n.room_id;
          else if (ex === "s" && s) graph[r.room_id][ex] = s.room_id;
          else if (ex === "e" && e) graph[r.room_id][ex] = e.room_id;
          else if (ex === "w" && w) graph[r.room_id][ex] = w.room_id;
          else graph[r.room_id][ex] = "?";
        });
      });
      res.status(200).json({ rooms, graph });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "The listing of rooms could not be retrieved."
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { room_id, title, description, coordinates, exits } = req.body;
      if (room_id && title && description && coordinates && exits) {
        const newRoom = { room_id, title, description, coordinates, exits };
        const newMap = await Maps.add(newRoom);
        res.status(201).json({
          newMap
        });
      } else {
        res.status(400).json({
          message:
            "Field missing: room_id, title, description, coordinates, and exits are all required"
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "There was an error while adding the room to the map" });
    }
  });

module.exports = router;
