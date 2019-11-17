import React, { useEffect } from "react";
import GameStyles from "./GameStyles.js";

const Timer = props => {
  const classes = GameStyles();

  const { setCooldown, cooldown } = props;

  function toggle() {
    setCooldown(5);
  }

  useEffect(() => {
    // exit if we reach 0
    if (cooldown === 0) return;

    const interval = setInterval(() => {
      setCooldown(cooldown => cooldown - 1);
    }, 1000);

    // clean up
    return () => clearInterval(interval);
  }, [cooldown, setCooldown]);

  return (
    <>
      <div className={cooldown > 0 ? classes.timerStart : classes.timer}>
        {cooldown}s
      </div>
      <div className="row">
        <button onClick={toggle}>Set to 5 (for testing)</button>
      </div>
    </>
  );
};

export default Timer;