import React, { useState } from 'react';

import './Chessboard.css'

export default function Chessboard(){
  const [grid, setGrid] = useState(Array(8).fill(Array(8).fill(0)));

  const handleClick = (i, j) => {
    console.log(`Clicking at ${i},${j}`)
    const newGrid = grid.map((row) => [...row]);
    newGrid[i][j] = newGrid[i][j] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

 
  function blackOrNot(i,j){
    if(i%2==0){
        if(j%2==0){
            return "black"
        }
    }else{
        if(j%2!=0){
            return  "black"
        }
    }
  }


  return (
    <div id='chessboardContainer'>
    <table>
      <tbody>
        {grid.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} onClick={() => handleClick(i, j)} className={blackOrNot(i,j)}>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

