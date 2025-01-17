import { cellRenderer } from "./cellRenderer";

export const boardRenderer = (()=>{

    const renderBoard = (board, cellHandlers) =>{
        const boardDiv = document.createElement("div");
        boardDiv.className = "boardDiv";    

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

        const ships = board[2];

        for(let i = 0; i<ships.length;i++){
            let ship = ships[i];
            if(ship.isSunk()){
                let shipCoords = ship.getCoords();
                for(let j = 0; j<shipCoords.length; j++){
                    const shipPartCoords = shipCoords[j];
                    const index = shipPartCoords[0]*10 + shipPartCoords[1];
                    const shipCell = boardDiv.childNodes[index];
                    shipCell.innerHTML = "";
                    boardDiv.childNodes[index].className = "cell shipCell";

                    if(ship.getOrientation() === 1){
                        shipCell.classList.add("vertical");
                    }

                    if(j===0){
                        shipCell.classList.add("shipHead");
                    }
    
                    if(j===shipCoords.length-1){
                        shipCell.classList.add("shipTail");
                    }
                }
            }
        }

        return boardDiv;
    }

    const renderSetUpBoard = (board, shipCellHandler, boardRect, playerNum) =>{
        const boardDiv = document.createElement("div");
        boardDiv.className = "boardDiv"; 

        let ships = board[2];
        let ghostShip = board[3];

        for(let i = 0; i<10; i++){
            for(let j = 0; j<10; j++){
                const cellWrapper = document.createElement("div");
                cellWrapper.className = "cellWrapper";
                cellWrapper.appendChild(cellRenderer.renderEmptyCell([i,j], null));
                boardDiv.appendChild(cellWrapper);
            }
        }
        
        for(let i = 0; i<ships.length; i++){
            const ship = ships[i];
            const shipCoords = ship.getCoords();
            for(let j = 0; j<shipCoords.length; j++){
                const shipPartCoords = shipCoords[j];
                const index = shipPartCoords[0]*10 + shipPartCoords[1];
                boardDiv.childNodes[index].innerHTML = "";
                const shipCell = cellRenderer.renderShipCell(ship, shipCellHandler, boardRect, playerNum);
                if(j===0){
                    shipCell.classList.add("shipHead");
                }

                if(j===shipCoords.length-1){
                    shipCell.classList.add("shipTail");
                }
                
                boardDiv.childNodes[index].appendChild(shipCell);
            }
        }

        
        for(let i = 0; i<ghostShip.length; i++){
            let ghostShipCoord = ghostShip[i];
            let index = ghostShipCoord[0]*10 + ghostShipCoord[1];
            boardDiv.childNodes[index].innerHTML = "";
            boardDiv.childNodes[index].appendChild(cellRenderer.renderGhostCell());
        }
        
        return boardDiv;
    }

    const clamp = (num, min, max) => {
        return Math.max(min, Math.min(num, max));
    }

    const getValidMidpoint = (coords, shipLength, orientation)=>{
        let midpoint = [];

        if(orientation === 0){
            midpoint.push(clamp(coords[0], 0, 9));
            if(shipLength % 2  !== 0){
                midpoint.push(clamp(coords[1], Math.floor(shipLength/2), 9 - Math.floor(shipLength/2)));
            }else{
                midpoint.push(clamp(coords[1], Math.floor(shipLength/2), 9 - (Math.floor(shipLength/2)-1)));
            }
        }else{
            
            if(shipLength % 2  !== 0){
                midpoint.push(clamp(coords[0], Math.floor(shipLength/2), 9 - Math.floor(shipLength/2)));
            }else{
                midpoint.push(clamp(coords[0], Math.floor(shipLength/2), 9 - (Math.floor(shipLength/2)-1)));
            }
            midpoint.push(clamp(coords[1], 0, 9));
        }

        return midpoint;
    }

    const finalBoard = (board) =>{
        let boardDiv = document.createElement("div");
        boardDiv.className = "finalBoardDiv";

        for(let i = 0; i< board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                let newCell = document.createElement("div");
                newCell.className = "finalCell";
                if(board[i][j] === -1){
                    newCell.classList.add("miss");
                }else if(board[i][j] === 1){
                    newCell.classList.add("fail");
                }else if(board[i][j] === 2){
                    newCell.classList.add("hit");
                }else{
                    newCell.classList.add("empty");
                }
                boardDiv.appendChild(newCell)
            }
        }
        return boardDiv;
    }

    return{
        renderBoard,
        renderSetUpBoard,
        finalBoard
    }
})();