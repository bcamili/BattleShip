import { Player } from "./Player.js";

export const game = (() => {
    const players = [Player("Player 1"), Player("Player 2")];
    let attackedPlayer = 1;

    const turn = (coords) =>{
        console.log(attackedPlayer === 1 ? 0 : 1, coords);
        let valid = players[attackedPlayer].gameboard.receiveAttack(coords);
        if (valid[0]){
            if(!valid[1]){
                attackedPlayer = attackedPlayer == 0 ? 1 : 0;
            }

            return valid;
        }
        else{
            return valid;
        }
    }

    const showCurrentlyAttackedBoard = () =>{
        const player = players[attackedPlayer];
        const board = [player.gameboard.getHits(), player.gameboard.getMisses()];
        return board;
    }

    const showUnattackedBoard = () =>{
        const unattacked = attackedPlayer === 0 ? 1 : 0;
        const player = players[unattacked];
        const board = [player.gameboard.getHits(), player.gameboard.getMisses()];
        return board;
    }

    const gameOver = () => {
        return players[0].gameboard.allSunk() || players[1].gameboard.allSunk();
    }

    const showPlayerBoard = (playerNum) =>{
        const player = players[playerNum];
        const board = [player.gameboard.getHits(), player.gameboard.getMisses(), player.gameboard.getShips(), player.gameboard.getGhostShip()];
        return board;
    }

    const getAttackedPlayer = () => attackedPlayer;

    const setShipsRandomly = (shipLengths) =>{
        for(let i = 0; i<shipLengths.length; i++){
            players.forEach(player =>{
                let coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
                let shipSet = player.gameboard.placeShip(coords, shipLengths[i], Math.round(Math.random()));
                while(!shipSet){
                    coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                    shipSet = player.gameboard.placeShip(coords, shipLengths[i], Math.round(Math.random()));
                }
            });
        }
    }
    

    return {
        players, 
        turn, 
        showCurrentlyAttackedBoard, 
        showUnattackedBoard, 
        showPlayerBoard,
        getAttackedPlayer,
        setShipsRandomly,
        gameOver
    };
})();