import React from "react";
import './Knight.css'

import { pointInGrid } from "../Bishop/Bishop";

export default function Knight(){

    return(<div id="knightPiece"></div>)
}

export function knightMovement(currentPosition, grid){
    const moveSet = []
    const possibleMoves = []

    possibleMoves.push([currentPosition[0]+2, currentPosition[1]+1])//backwardBackwardRight
    possibleMoves.push([currentPosition[0]+2, currentPosition[1]-1])//backwardBackwardLeft

    possibleMoves.push([currentPosition[0]-2, currentPosition[1]+1])//forwardForwardRight
    possibleMoves.push([currentPosition[0]-2, currentPosition[1]-1])//forwardForwardLeft

    possibleMoves.push([currentPosition[0]+1, currentPosition[1]+2])//forwardRightRight
    possibleMoves.push([currentPosition[0]+1, currentPosition[1]-2])//forwarLeftLeft

    possibleMoves.push([currentPosition[0]-1, currentPosition[1]+2])//backwardRightRight
    possibleMoves.push([currentPosition[0]-1, currentPosition[1]-2])//backWardLeftLeft

    for(let i =0; i< possibleMoves.length; i++){
        if(!pointInGrid(grid, possibleMoves[i])){
            continue;
        }
        if(grid[possibleMoves[i][0]][possibleMoves[i][1]]<=0){
            moveSet.push(possibleMoves[i])
        }
    }
    return moveSet
}