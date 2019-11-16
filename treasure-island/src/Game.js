import React, { useState, useEffect } from "react";
import axios from "axios";
import GameStyles from "./GameStyles.js";
import Map from "./Map.js";

const Game = () => {
  const classes = GameStyles();
  const token = "3c0bafec5baddbb3fa7a8ca7c72c2b9b3b3062a9";

  const [player, setPlayer] = useState({
    name: "Unknown",
    room_id: 0,
    title: "A brightly lit room",
    description:
      "You are standing in the center of a brightly lit room. You notice a shop to the west and exits to the north, south and east.",
    coordinates: "(60,60)",
    elevation: 0,
    terrain: "NORMAL",
    players: [],
    items: [],
    exits: ["n", "s", "e", "w"],
    cooldown: 100.0,
    errors: [],
    messages: []
  });

  const [location, setLocation] = useState("(60,60)");

  useEffect(() => {
    const init = async () => {
      const res = await axios.get(
        "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/",
        {
          headers: {
            authorization: `Token ${token}`
          }
        }
      );
      setPlayer({ ...player, ...res.data });
      setLocation(res.data.coordinates);
      console.log(res.data);
    };
    const status = async () => {
      const res = await axios.post(
        "https://lambda-treasure-hunt.herokuapp.com/api/adv/status/",
        {
          headers: {
            authorization: `Token ${token}`
          }
        }
      );
      setPlayer({ ...player, ...res.data });
      console.log(res.data);
    };
    init();
    status();
  }, [player]);

  const move = direction => {
    if (player.exits.includes(direction)) {
      console.log(`you tried to move ${direction}`);
    } else {
      alert(`You can't move ${direction.toUpperCase()}!`);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <h1 className={classes.header}>Treasure Island</h1>
        <h2 className={classes.instructions}>
          Use Navigation Keys Below To Move.
        </h2>
        <div className={classes.headerAndText}>
          <h2 className={classes.headertwo}>Name: </h2>
          <p className={classes.text}> {player.name}</p>
        </div>
        <div className={classes.headerAndText}>
          <h2 className={classes.headertwo}>Current Location:</h2>
          <p className={classes.text}> Room: {player.room_id}</p>
          <p className={classes.text}> Coords: {player.coordinates}</p>
        </div>
        <div className={classes.errorContainer}>
          <div
            className={
              player.errors ? classes.headerAndTextError : classes.hidden
            }
          >
            <h2 className={classes.headertwoError}>Error:</h2>
            {player.errors.map(msg => {
              return <p className={classes.textError}> {msg} </p>;
            })}
          </div>
        </div>
        <h2 className={classes.headertwo}>Movement</h2>
        <div className={classes.navigation}>
          <button onClick={() => move("n")}>North</button>
          <div>
            <button onClick={() => move("w")}>West</button>
            <button onClick={() => move("s")}>South</button>
            <button onClick={() => move("e")}>East</button>
          </div>
        </div>
      </div>
      <div className={classes.mainSection}>
        <div className={classes.mapSection}>
          <Map currentRoom={player.room_id} current_coordinates={location} />
        </div>
      </div>
    </div>
  );
};

export default Game;
