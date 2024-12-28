import "../resource/assets/styles/styles.css";
import { cellRenderer } from "./cellRenderer";

export const view = (()=>{

    const appDiv = document.getElementById("app");

    const boardDiv = document.createElement("div");
    boardDiv.className = "boardDiv";
    appDiv.appendChild(boardDiv);

    const renderBoard = (board, cellHandlers) =>{
        boardDiv.innerHTML = "";

        const hits = board[0].toSorted();
        const misses = board[1].toSorted();
    

        let nextHit = hits.shift();

        let nextMiss = misses.shift();
        
        
        
        for(let i = 0; i<10; i++){
            for(let j = 0; j<10; j++){
                if(nextHit !== undefined && (i === nextHit[0] && j === nextHit[1])){
                    boardDiv.appendChild(cellRenderer.renderHitCell());
                    nextHit = hits.shift();
                    
                }else if(nextMiss !== undefined && (i === nextMiss[0] && j === nextMiss[1])){
                    boardDiv.appendChild(cellRenderer.renderMissedCell());
                    nextMiss = misses.shift();
                }else{
                    if(cellHandlers!==null){
                        boardDiv.appendChild(cellRenderer.renderEmptyCell([i,j], cellHandlers.emptyCellHandler));
                    }else{
                        boardDiv.appendChild(cellRenderer.renderEmptyCell([i,j], null));
                    }
                }
            }
        }

    }

    return{
        renderBoard
    }
})();