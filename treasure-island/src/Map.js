import React, { useState, useEffect } from "react";

export default function Map() {
  const token = "xxx";

  const [map, setMap] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/map");
  });

  return <div>Map</div>;
}
