import React from "react";
import "./Rook.css";
import pieceIsEnemy from "../Functions/isPieceEnemy";

export default function Rook() {
  return <div id="rookPiece"></div>;
}

export function rookMovement(currentPosition, grid) {
  const moveSet = [];

  let x1 = currentPosition[1] - 1;
  let x2 = currentPosition[1] + 1;

  while (x1 > -1 || x2 < 8) {
    if (grid[currentPosition[0]][x1] <= 0 && x1 >= 0) {
      moveSet.push([currentPosition[0], x1]);

      if (grid[currentPosition[0]][x1] < 0) {
        console.log("enemy found at ", [currentPosition[0], x1]);
        x1 = -1;
      }
    } else {
      x1 = -1;
    }

    if (grid[currentPosition[0]][x2] <= 0 && x2 < 8) {
      moveSet.push([currentPosition[0], x2]);

      if (grid[currentPosition[0]][x2] < 0) {
        x2 = 8;
      }
    } else {
      x2 = 8;
    }
    x1--;
    x2++;
  }

  let y1 = currentPosition[0] - 1;
  let y2 = currentPosition[0] + 1;

  console.log(currentPosition)

  while (y1 > -1 || y2 < 8) {
    if (grid[y1][currentPosition[1]] <= 0 && y1 >= 0) {
      moveSet.push([y1,currentPosition[1]]);

      if (grid[y1][currentPosition[1]] < 0) {
        y1 = -1;
      }
    }else {
      y1 = -1;
    }

    // if (grid[y2][currentPosition[1]]<=0 && y2<=8) {
    //   moveSet.push([y2,currentPosition[1]]);

    //   if (grid[y2][currentPosition[1]] < 0) {
    //     y2 = 8;
    //   }
    // } else {
    //   y2 = 8;
    // }
    y1--;
    y2++;
  }



  return moveSet;
}
