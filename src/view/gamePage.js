import player1Img from "../resource/assets/img/8fb95578-d76f-4785-b14a-c3ebc4fb28d8.png";
import player2Img from "../resource/assets/img/98f90e3c-5397-4f8a-b14a-9c9eed1f2594.png";
import { boardRenderer } from "./boardRenderer";

export const gamePage = (() => {
    const player1Side = document.createElement("div");
    player1Side.id = "player1Side";
    player1Side.className = "playerSide";

    const player1PicAndShipsContainer = document.createElement("div");
    player1PicAndShipsContainer.className = "player1PicAndShipsContainer";
    player1Side.appendChild(player1PicAndShipsContainer);

    const player1AvatarContainer = document.createElement("div");
    player1AvatarContainer.className = "avatarContainer";
    player1PicAndShipsContainer.appendChild(player1AvatarContainer);

    const player1Avatar = document.createElement("img");
    player1Avatar.className = "avatar";
    player1Avatar.src = player1Img;
    player1AvatarContainer.appendChild(player1Avatar);

    const player1shipContainer = document.createElement("div");
    player1shipContainer.className = "shipContainer";
    player1PicAndShipsContainer.appendChild(player1shipContainer);

    const player1Stats = document.createElement("div");
    player1Stats.id = "player1Stats";
    player1Stats.className = "playerStats";
    player1Stats.textContent = "Player 1"
    player1Side.appendChild(player1Stats);

    const player1SmallBoard = document.createElement("div");
    player1SmallBoard.id = "player1SmallBoard";
    player1SmallBoard.className = "smallBoard";
    player1Side.appendChild(player1SmallBoard);

    const player1LargeBoard = document.createElement("div");
    player1LargeBoard.id = "player1LargeBoard";
    player1LargeBoard.className = "largeBoard";

    const player2LargeBoard = document.createElement("div");
    player2LargeBoard.id = "player2LargeBoard";
    player2LargeBoard.className = "largeBoard";

    const largeBoardsContainer = document.createElement("div");
    largeBoardsContainer.id = "largeBoardsContainer";
    largeBoardsContainer.classList.toggle("player1Focus");
    largeBoardsContainer.appendChild(player1LargeBoard);
    largeBoardsContainer.appendChild(player2LargeBoard);

    const largeBoardsView = document.createElement("div");
    largeBoardsView.id = "largeBoardsView";
    largeBoardsView.appendChild(largeBoardsContainer);

    const player2Side = document.createElement("div");
    player2Side.id = "player2Side";
    player2Side.className = "playerSide";

    const player2PicAndShipsContainer = document.createElement("div");
    player2PicAndShipsContainer.className = "player1PicAndShipsContainer";
    player2Side.appendChild(player2PicAndShipsContainer);

    const player2shipContainer = document.createElement("div");
    player2shipContainer.className = "shipContainer";
    player2PicAndShipsContainer.appendChild(player2shipContainer);

    const player2AvatarContainer = document.createElement("div");
    player2AvatarContainer.className = "avatarContainer";
    player2PicAndShipsContainer.appendChild(player2AvatarContainer);
    
    const player2Avatar = document.createElement("img");
    player2Avatar.className = "avatar";
    player2Avatar.src = player2Img;
    player2AvatarContainer.appendChild(player2Avatar);


    const player2Stats = document.createElement("div");
    player2Stats.id = "player2Stats";
    player2Stats.className = "playerStats";
    player2Stats.textContent = "Player 2"
    player2Side.appendChild(player2Stats);

    const player2SmallBoard = document.createElement("div");
    player2SmallBoard.id = "player2SmallBoard";
    player2SmallBoard.className = "smallBoard";
    player2Side.appendChild(player2SmallBoard);
    
    const renderGame = (player1Board, player1CellHandlers, player2Board, player2CellHandlers) => { 
        const gameContainer = document.createElement("div");
        gameContainer.id = "gameContainer";
        player1shipContainer.innerHTML = "";
        player2shipContainer.innerHTML = "";

        let player1Ships = player1Board[2];
        let player2Ships = player2Board[2];

        for(let i = 0; i< player1Ships.length; i++){
            let p1Ship = player1Ships[i];
            let p2Ship = player2Ships[i];
            let p1ShipCoords = p1Ship.getCoords();
            let p2ShipCoords = p2Ship.getCoords();
            let p1ShipDiv = document.createElement("div");
            p1ShipDiv.className = "previewShip";
            player1shipContainer.appendChild(p1ShipDiv);

            let p2ShipDiv = document.createElement("div");
            p2ShipDiv.className = "previewShip";
            player2shipContainer.appendChild(p2ShipDiv);

            for(let j = 0; j<p1ShipCoords.length; j++){
                let shipPartDiv = document.createElement("div");
                shipPartDiv.className = "previewShipPart";
                let isSunk = p1Ship.isSunk();
                if(isSunk){
                    shipPartDiv.classList.add("sunkShip");
                }
                p1ShipDiv.appendChild(shipPartDiv);
            }

            for(let j = 0; j<p2ShipCoords.length; j++){
                let shipPartDiv = document.createElement("div");
                shipPartDiv.className = "previewShipPart";
                let isSunk = p1Ship.isSunk();
                if(isSunk){
                    shipPartDiv.classList.add("sunkShip");
                }
                p2ShipDiv.appendChild(shipPartDiv);
            }

            
            
        }
        
        gameContainer.appendChild(player1Side);
        gameContainer.appendChild(largeBoardsView);
        gameContainer.appendChild(player2Side);
        renderGameBoard(player1Board, player1CellHandlers, player2Board, player2CellHandlers);
        return gameContainer;
    }

    const renderGameBoard = (player1Board, player1CellHandlers, player2Board, player2CellHandlers) => {
        player1LargeBoard.innerHTML ="";
        player2LargeBoard.innerHTML ="";
        player1LargeBoard.appendChild(boardRenderer.renderBoard(player1Board, player1CellHandlers));
        player2LargeBoard.appendChild(boardRenderer.renderBoard(player2Board, player2CellHandlers));
        player1SmallBoard.innerHTML ="";
        player2SmallBoard.innerHTML ="";
        player1SmallBoard.appendChild(boardRenderer.renderBoard(player2Board, null));
        player2SmallBoard.appendChild(boardRenderer.renderBoard(player1Board, null));

        player1shipContainer.innerHTML = "";
        player2shipContainer.innerHTML = "";

        let player1Ships = player1Board[2];
        let player2Ships = player2Board[2];

        for(let i = 0; i< player1Ships.length; i++){
            let p1Ship = player1Ships[i];
            let p2Ship = player2Ships[i];
            let p1ShipCoords = p1Ship.getCoords();
            let p2ShipCoords = p2Ship.getCoords();
            let p1ShipDiv = document.createElement("div");
            p1ShipDiv.className = "previewShip";
            player1shipContainer.appendChild(p1ShipDiv);

            let p2ShipDiv = document.createElement("div");
            p2ShipDiv.className = "previewShip";
            player2shipContainer.appendChild(p2ShipDiv);

            for(let j = 0; j<p1ShipCoords.length; j++){
                let shipPartDiv = document.createElement("div");
                shipPartDiv.className = "previewShipPart";
                let isSunk = p1Ship.isSunk();
                if(isSunk){
                    shipPartDiv.classList.add("sunkShip");
                }
                p1ShipDiv.appendChild(shipPartDiv);
            }

            for(let j = 0; j<p2ShipCoords.length; j++){
                let shipPartDiv = document.createElement("div");
                shipPartDiv.className = "previewShipPart";
                let isSunk = p2Ship.isSunk();
                if(isSunk){
                    shipPartDiv.classList.add("sunkShip");
                }
                p2ShipDiv.appendChild(shipPartDiv);
            }

            
            
        }

        if(player1CellHandlers===null){
            largeBoardsContainer.classList.remove("player1Focus");
        }else{
            largeBoardsContainer.classList.add("player1Focus");
        }
    }

    return {
        renderGame,
        renderGameBoard
    }
})();