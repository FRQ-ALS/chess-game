import React, { useState, useEffect } from "react";
import Pawn, {pawnMovement} from "../Pawn/Pawn";
import Rook, {rookMovement} from "../Rook/Rook";
import Bishop, {bishopMovement} from "../Bishop/Bishop"
import Knight, {knightMovement} from "../Knight/Knight";
import Queen, {queenMovement} from "../Queen/Queen";
import King, { kingMovement } from "../King/King";
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
  const [selectedPiece, setSelectedPiece] = useState(null)

  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })
  
  const handleMouseMove = (e, position) => {
    setCursorPosition({ top: e.clientY, left: e.clientX});
    console.log(cursorPosition)
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
      case 3: 
        return knightMovement(currentPosition, grid)
      case 4:
        return bishopMovement(currentPosition, grid)
      case 5:
        return queenMovement(currentPosition, grid)
      case 6:
        return kingMovement(currentPosition, grid)
    }
  }
  
  //function that determines whether piece is enemy piece
  function pieceIsEnemy(pieceId){
    if(pieceId<0){
      return true
    }
    return false
  }

  const handleMouseDown = (e, position) =>{
    setSelectedPiece(grid[position[0]][position[1]])
    grid[position[0]][position[1]] =0;
  }

  const handleMouseUp =(e, position) =>{
    setSelectedPiece(null)
  }

  //function that handles which piece is clicked on and whether it has any valid moves
  const handleMouseClick = (e, position) =>{
    console.log("Hello")
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
  pieceMap.set(-2, <Rook className="player2"/>)
  pieceMap.set(3, <Knight/>)
  pieceMap.set(-3, <Knight className="player2"/>)
  pieceMap.set(4, <Bishop/>)
  pieceMap.set(-4, <Bishop className="player2"/>)
  pieceMap.set(5, <Queen/>)
  pieceMap.set(-5, <Queen className="player2" />)
  pieceMap.set(6, <King/>)
  pieceMap.set(-6, <King className="player2" />)

  useEffect(() => {
    const newGrid = grid.map((row) => [...row]);
    //Rooks
    newGrid[7][0] = 2;
    newGrid[7][7] = 2;
    newGrid[0][0] = -2;
    newGrid[0][7] =-2;
    //Knight
    newGrid[7][1] = 3;
    newGrid[7][6] = 3;
    newGrid[0][1] =-3;
    newGrid[0][6] =-3
    //Bishop
    newGrid[7][2] = 4;
    newGrid[7][5] = 4;
    newGrid[0][2] = -4;
    newGrid[0][5] = -4;
    //Queen
    newGrid[7][3] = 5;
    newGrid[0][3] = -5;
    //King
    newGrid[7][4] = 6;
    newGrid[0][4] = -6;

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
        {/* {selectedPiece!=null ?  <div onMouseUp={handleMouseUp} id="movingPiece" style={{top: cursorPosition.top, left: cursorPosition.left}}>
           {pieceMap.get(selectedPiece)}
            </div>: null } */}
        <table>
        <tbody id="boardBody">
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  onMouseMove={(event) => handleMouseMove(event, [i, j])}
                  onClick={event => handleMouseClick(event, mousePosition)}
                  // onMouseDown={event => handleMouseDown(event, mousePosition)}
                  // onMouseUp={event => handleMouseUp(event, mousePosition)}
                  highlighted={highlightCell([i, j])}
                  id="gridCell"
                  key={j}
                  className={blackOrNot(i, j)}
                >
                  {/* {j==0 ? <div id="cellNumber" >{i+1}</div>: null} */}
                  {pieceMap.get(grid[i][j])}
                  {highlightMoves([i, j])=="true" && grid[i][j]==0 ? <div id="highlightedEmpty"></div> : null}
                  {highlightMoves([i, j])=="true" && grid[i][j]<0 ? <div id="highlightedEnemy"></div> : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
