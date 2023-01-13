import React from "react";
import './Bishop.css'

export default function Bishop(){

    return(<div id="bishopPiece"></div>)
}


export function bishopMovement(currentPosition, grid){
    const moveSet =[];
    // counterDiagonal movement
    //rightForward
    let rf = [currentPosition[0]-1, currentPosition[1]+1]
    let rfWallHit = false;
    //leftBackwards
    let lb = [currentPosition[0]+1, currentPosition[1]-1]
    let lbWallHit = false;
    while(!rfWallHit || !lbWallHit){
        if(!pointInGrid(grid, rf) || grid[rf[0]][rf[1]]>0){
            rfWallHit = true
        }
        if(!pointInGrid(grid, lb) || grid[lb[0]][lb[1]]>0){
            lbWallHit = true;
        }
        if(!rfWallHit && grid[rf[0]][rf[1]]<=0){
            moveSet.push(rf)
            if(grid[rf[0]][rf[1]]<0){
                rfWallHit = true
            }
        }
        if(!lbWallHit && grid[lb[0]][lb[1]]<=0){
            moveSet.push(lb)
            if(grid[lb[0]][lb[1]]<0){
                lbWallHit = true
            }
        }
        rf = [rf[0]-1, rf[1]+1]
        lb = [lb[0]+1, lb[1]-1]
    }

    // leadingDiagonal movement
    //leftForward
    let lf = [currentPosition[0]-1, currentPosition[1]-1]
    let lfWallHit = false
    //rightBackward
    let rb = [currentPosition[0]+1, currentPosition[1]+1]
    let rbWallHit = false

    while(!lfWallHit || !rbWallHit){
        if(!pointInGrid(grid, lf) || grid[lf[0]][lf[1]]>0){
            lfWallHit = true
        }
        if(!pointInGrid(grid, rb) || grid[rb[0]][rb[1]]>0){
            rbWallHit = true
        }
        if(!lfWallHit && grid[lf[0]][lf[1]]<=0){
            moveSet.push(lf)

            if(grid[lf[0]][lf[1]]<0){
                lfWallHit =true
            }
        }
        if(!rbWallHit && grid[rb[0]][rb[1]]<=0){
            moveSet.push(rb)

            if(grid[rb[0]][rb[1]]<0){
                rbWallHit =true
            }
        }
        lf = [lf[0]-1, lf[1]-1]
        rb = [rb[0]+1, rb[1]+1]
    }
    return moveSet;
}

export function pointInGrid(grid, point){
    const positions =[]
    for(let i = 0; i< grid[0].length; i++){
        for(let j =0; j < grid[0].length; j++){
            positions.push([i,j])
        }
    }

    let gridPositions = JSON.stringify(positions)
    let pointPosition = JSON.stringify(point)
    let index = gridPositions.indexOf(pointPosition)

    if(index!=-1){
        return true
    }

    return false
}