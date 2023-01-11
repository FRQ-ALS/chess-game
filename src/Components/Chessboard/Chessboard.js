import React, { useState, useEffect } from "react";
import Pawn from "./Pawn/Pawn";
import "./Chessboard.css";

export default function Chessboard() {
  const [grid, setGrid] = useState(Array(8).fill(Array(8).fill(0)));
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState([-1, -1]);
  const [finalPosition, setFinalPosition] = useState(8,8);
  const [highlightedCell, setHighlightedCell] = useState([-1,-1])
  
  const handleMouseMove = (e, position) => {
    setMousePosition(position);
  };
  

  const handleMouseClick = (e, position) =>{
    setHighlightedCell(position)

    e.preventDefault()

    if(!mouseDown){
      setMouseDown(true)
      setCurrentPosition(position)
      return
    }

    if(mouseDown){
      setFinalPosition(position)
      updatePiecePosition(currentPosition, position)
      setMouseDown(false)
    }
  }

  function updatePiecePosition(currentPosition, finalPosition) {
    console.log(currentPosition + " " + finalPosition)
    const newGrid = grid.map((row) => [...row]);
    var temporary = newGrid[currentPosition[0]][currentPosition[1]];
    console.log(temporary)
    newGrid[currentPosition[0]][currentPosition[1]] = newGrid[finalPosition[0]][finalPosition[1]];
    newGrid[finalPosition[0]][finalPosition[1]] = temporary;
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
      position[1] === highlightedCell[1] &&
      position[0] === highlightedCell[0]
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
                  onClick={event => handleMouseClick(event, mousePosition)}
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
