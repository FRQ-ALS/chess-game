import React from "react";

import './Queen.css'

import { bishopMovement } from "../Bishop/Bishop";
import { rookMovement } from "../Rook/Rook";

export default function Queen(){
    return(<div id="queenPiece">Queen</div>)
}


export function queenMovement(currentPosition, grid){
    return bishopMovement(currentPosition, grid).concat(rookMovement(currentPosition, grid))
}