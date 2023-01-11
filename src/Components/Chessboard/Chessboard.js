import React, { useState, useEffect } from "react";
import Pawn from "./Pawn/Pawn";
import "./Chessboard.css";

export default function Chessboard() {
  const [grid, setGrid] = useState(Array(8).fill(Array(8).fill(0)));
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState([-1, -1]);
  const [finalPosition, setFinalPosition] = useState(8,8);
         

  const handleMouseMove = (e, position) => {
    console.log(position)
    setMousePosition(position);
  };

  const handleMouseClick = (e, position) =>{
    if(!mouseDown){
      setMouseDown(true)
      setCurrentPosition(position)
      return
    }

    if(mouseDown){
      setFinalPosition(position)
      // updatePiecePosition(currentPosition, position)
      setMouseDown(false)
    }
  }

  // const handleMouseDown = (e, position) => {
  //   setCurrentPosition(position);
  //   setMouseDown(true);
  // };

  // const handleMouseUp = (e, position) => {
  //   setFinalPosition(position);
  //   setMouseDown(false);
  //   updatePiecePosition(currentPosition, position);
  // };

  function updatePiecePosition(currentPosition, finalPosition) {
    const newGrid = grid.map((row) => [...row]);
    // var temporary = newGrid[currentPosition[0], currentPosition[1]];
    // newGrid[currentPosition[0], currentPosition[1]] = 0;
    // newGrid[finalPosition[0], finalPosition[1]] = 1;

    newGrid[6][0] = 0;
    newGrid[3][0] = 1;
    setGrid(newGrid);
  }

  const pieceMap = new Map();
  pieceMap.set(0, null);
  pieceMap.set(1, <Pawn className="player1" />);

  useEffect(() => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[6][0] = 1;
    newGrid[6][1] = 1;
    setGrid(newGrid);
  }, []);


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

  function highlightCell(position) {
    if (
      position[1] === currentPosition[1] &&
      position[0] === currentPosition[0]
    ) {
      return "true";
    }
    return null;
  }

  return (
    <div id="chessboardContainer">
      <table>
        <tbody id="boardBody">
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  onMouseMove={(event) => handleMouseMove(event, [i, j])}
                  // onMouseUp={(event) => handleMouseUp(event, mousePosition)}
                  // onMouseDown={(event) => handleMouseDown(event, mousePosition)}
                  onClick={handleMouseClick}
                  highlighted={highlightCell([i, j])}
                  id="gridCell"
                  key={j}
                  className={blackOrNot(i, j)}
                >
                  {pieceMap.get(grid[i][j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
