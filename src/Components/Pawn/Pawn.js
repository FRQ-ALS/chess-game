import React, { useState, useEffect } from "react";
import "./Pawn.css";
import pieceIsEnemy from "../Functions/isPieceEnemy";
import pawnImage from "../../Pieces/pawn.png"

export default function Pawn(props) {
  return (
    <div
      id="pawn"
      // className={props.className}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
    >
      <img id="pawnimage" 
      className={props.className}
       src={pawnImage}></img>
    </div>
  );
}

export function pawnMovement(currentPosition, grid) {
  var moveSet = [];
  var leftDiagonal = grid[currentPosition[0] - 1][currentPosition[1] - 1];
  var rightDiagonal = grid[currentPosition[0] - 1][currentPosition[1] + 1];

  if (grid[currentPosition[0] - 1][currentPosition[1]] == 0) {
    var moveOneCell = [currentPosition[0] - 1, currentPosition[1]];
    moveSet.push(moveOneCell);
  }

  if (pieceIsEnemy(leftDiagonal)) {
    var leftDiagonalMove = [currentPosition[0] - 1, currentPosition[1] - 1];
    moveSet.push(leftDiagonalMove);
  }

  if (pieceIsEnemy(rightDiagonal)) {
    var rightDiagonalMove = [currentPosition[0] - 1, currentPosition[1] + 1];
    moveSet.push(rightDiagonalMove);
  }

  if (currentPosition[0] == 6 && grid[currentPosition[0] - 1][currentPosition[1]] == 0){
    var moveTwoCells = [currentPosition[0] - 2, currentPosition[1]];
    if (grid[moveTwoCells[0]][moveTwoCells[1]] != 0) {
      return moveSet;
    }
    moveSet.push(moveTwoCells);
  }
  
  return moveSet;
}
