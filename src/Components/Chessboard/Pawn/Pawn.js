import React, { useState, useEffect } from "react";

import "./Pawn.css";

export default function Pawn(props) {
  const [coordinates, setCoordinates] = useState(Array(2));

  useEffect(()=>{
  setCoordinates(props.coordinates)
  },[])

  return (
    <div
      id="pawn"
      className={props.className}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
    ></div>
  );
}
