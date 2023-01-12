import React, { useState, useEffect } from "react";
import Pawn, {pawnMovement} from "../Pawn/Pawn";
import Rook, {rookMovement} from "../Rook/Rook";
import "./Chessboard.css";

export default function Chessboard() {
  const [grid, setGrid] = useState(Array(8).fill(Array(8).fill(0)));
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState([-1, -1]);
  const [finalPosition, setFinalPosition] = useState(8,8);
  const [highlightedCell, setHighlightedCell] = useState([-1,-1])
  const [currentMoves, setCurrentMoves] = useState(null)
  const [lostPieces, setLostPieces] = useState([])
  
  const handleMouseMove = (e, position) => {
    setMousePosition(position);
  };

  //function that takes in the id of a piece (1-6) and current position to give all possible positions
  function possibleMoves(pieceId, currentPosition){
    switch(pieceId){
      //pawn
      case 1:
        return pawnMovement(currentPosition, grid)
      case 2:
        return rookMovement(currentPosition, grid)


    }

  }
  
  //function that determines whether piece is enemy piece
  function pieceIsEnemy(pieceId){
    if(pieceId<0){
      return true
    }
    return false
  }

  //function that handles which piece is clicked on and whether it has any valid moves
  const handleMouseClick = (e, position) =>{

    console.log("Lost pieces =" + lostPieces)

    if(!mouseDown && grid[position[0]][position[1]]>0){
      var pieceId = grid[position[0]][position[1]]
      var moves = possibleMoves(pieceId, position)

      if(moves.length===0){
        console.log("no available moves")
        return
      }

      setCurrentMoves(moves)
      setMouseDown(true)
      setHighlightedCell(position)
      setCurrentPosition(position)
      return
    }
//function that handles clicking on pieces

    if(mouseDown && grid[position[0]][position[1]]<=0){
      console.log("lol")
      var moveSet = JSON.stringify(currentMoves)
      var potentialMove = JSON.stringify(position)
      var index = moveSet.indexOf(potentialMove)
      if(index!=-1){
        setFinalPosition(position)
        updatePiecePosition(currentPosition, position)
        setMouseDown(false)
        setCurrentMoves([])
        return
      }
      console.log("invalid Move")
    }
    clearSelectedCell()
    setMouseDown(false)
  }

  //function that updates piece positions
  function updatePiecePosition(currentPosition, finalPosition) {
    if(grid[currentPosition[0]][currentPosition[1]]===0){
      console.log("Cannot move from empty position")
      // clearSelectedCell()
      return
    }

    var targetPiece = grid[finalPosition[0]][finalPosition[1]]

    if(pieceIsEnemy(targetPiece)){
      lostPieces.push(targetPiece)
      targetPiece = 0;
    }
    
    const newGrid = grid.map((row) => [...row]);
    var temporary = newGrid[currentPosition[0]][currentPosition[1]];
    newGrid[currentPosition[0]][currentPosition[1]] = targetPiece;
    newGrid[finalPosition[0]][finalPosition[1]] = temporary;
    setGrid(newGrid);
    clearSelectedCell()
  }

  const pieceMap = new Map();
  pieceMap.set(0, null);
  pieceMap.set(1, <Pawn className="player1"/>);
  pieceMap.set(-1, <Pawn className="player2"/>)
  pieceMap.set(2, <Rook/>)

  useEffect(() => {
    const newGrid = grid.map((row) => [...row]);
    // newGrid[6][0] = 1;
    // newGrid[6][1] = 1;
    // newGrid[5][1] =1;
    // newGrid[5][2] =-1;
    newGrid[7][0] = 2;
    newGrid[7][4] = -1;

    for(var i = 0; i<newGrid[6].length; i++){
      newGrid[6][i] = 1;
      newGrid[1][i] = -1;
    }
    setGrid(newGrid);
  }, []);

//function that colours the chessboard cells
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

  function clearSelectedCell(){
    setHighlightedCell(-1,-1)
    setCurrentMoves([])
  }
//highlights selected cell
  function highlightCell(position) {
    if (
      position[1] === highlightedCell[1] &&
      position[0] === highlightedCell[0]
    ) {
      return "true";
    }
    return null;
  }

//highlights possible moves for piece
function highlightMoves(position) {
  var moveSet = JSON.stringify(currentMoves)
  var currentPos = JSON.stringify(position)
  var index = moveSet.indexOf(currentPos)
  if(index!=-1){
    return "true"
  }
  return null
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
                  possibleMove={highlightMoves([i,j])}
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
