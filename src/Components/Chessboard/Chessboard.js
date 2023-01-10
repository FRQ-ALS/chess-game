import React, { useState } from "react";
import Pawn from "./Pawn/Pawn";
import "./Chessboard.css";

export default function Chessboard() {
  const [grid, setGrid] = useState(Array(8).fill(Array(8).fill(0)));

  // const handleClick = (i, j) => {
  //   console.log(`Clicking at ${i},${j}`);
  //   const newGrid = grid.map((row) => [...row]);
  //   newGrid[i][j] = newGrid[i][j] === 0 ? 1 : 0;
  //   setGrid(newGrid);
  // };

  function blackOrNot(i, j) {
    if (i % 2 == 0) {
      if (j % 2 == 0) {
        return "black";
      }
    } else {
      if (j % 2 != 0) {
        return "black";
      }
    }
  }


  function updatePiecePosition(){
    
  }

  return (
    <div id="chessboardContainer">
      <table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  id="gridCell"
                  key={j}
                  className={blackOrNot(i, j)}
                >
                  {i === 6 ? <Pawn coordinates={[i,j]} className="player1" /> : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
