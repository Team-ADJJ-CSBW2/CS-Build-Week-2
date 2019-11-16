const express = require("express");

const Maps = require("../models/maps");

const router = express.Router();

// GET
router
  .route("/")
  .get(async (req, res) => {
    try {
      const rooms = await Maps.find();
      res.status(200).json({ rooms });
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
