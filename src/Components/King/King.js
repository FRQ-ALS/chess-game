import React from "react";
import { pointInGrid } from "../Bishop/Bishop";
import { bishopMovement } from "../Bishop/Bishop";
import { rookMovement } from "../Rook/Rook";
import kingImage from "../../Pieces/king.png"

import './King.css'


export default function King(props){
    return(<div id="kingPiece">
        <img id="kingimage" src={kingImage} className={props.className} ></img>
    </div>)
}


export function kingMovement(currentPosition, grid){
    const moveSet = []
    const bishopRookMovement = bishopMovement(currentPosition, grid).concat(rookMovement(currentPosition, grid))

    for(let i =0; i<bishopRookMovement.length; i++){
        let y_diff = currentPosition[0] - bishopRookMovement[i][0]
        let x_diff = currentPosition[1] - bishopRookMovement[i][1]
        if(y_diff<2 && y_diff>-2 && x_diff<2 && x_diff>-2){
            moveSet.push(bishopRookMovement[i])
        }
    }

    return moveSet
}