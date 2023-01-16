import React from "react";
import './Queen.css'
import queenImage from "../../Pieces/queen.png"


import { bishopMovement } from "../Bishop/Bishop";
import { rookMovement } from "../Rook/Rook";

export default function Queen(props){
    return(<div id="queenPiece">
        <img src={queenImage} className={props.className} id="queenimage"></img>
    </div>)
}


export function queenMovement(currentPosition, grid){
    return bishopMovement(currentPosition, grid).concat(rookMovement(currentPosition, grid))
}