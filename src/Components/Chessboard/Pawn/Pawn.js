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
      onClick={() => console.log(coordinates)}
      className={props.className}
    ></div>
  );
}
