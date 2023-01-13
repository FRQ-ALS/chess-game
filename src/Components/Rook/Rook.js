import React from "react";
import "./Rook.css";
import pieceIsEnemy from "../Functions/isPieceEnemy";

export default function Rook() {
  return <div id="rookPiece"></div>;
}

export function rookMovement(currentPosition, grid) {
  const moveSet = [];

  //x-axis movement
  let x1 = currentPosition[1] - 1;
  let x2 = currentPosition[1] + 1;

  while (x1 > -1 || x2 < 8) {
    if (grid[currentPosition[0]][x1] <= 0 && x1 >= 0) {
      moveSet.push([currentPosition[0], x1]);

      if (grid[currentPosition[0]][x1] < 0) {
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


  //y-axis movement
  let y1 = currentPosition[0] - 1;
  let y2 = currentPosition[0] + 1;

  let y1WallHit = false;
  let y2WallHit = false;

  while (!y1WallHit || !y2WallHit) {
    if (y1 < 0 || grid[y1][currentPosition[1]] > 0) {
      y1WallHit = true;
    }
    if (y2 > 7 || grid[y2][currentPosition[1]] > 0) {
      y2WallHit = true;
    }

    if (!y1WallHit && grid[y1][currentPosition[1]] <= 0) {
      moveSet.push([y1, currentPosition[1]]);
      if (grid[y1][currentPosition[1]] < 0) {
        y1WallHit = true;
      }
    }
    if (!y2WallHit && grid[y2][currentPosition[1]] <= 0) {
      moveSet.push([y2, currentPosition[1]]);
      if (grid[y2][currentPosition[1]] < 0) {
        y2WallHit = true;
      }
    }

    y1--;
    y2++;
  }

  return moveSet;
}
