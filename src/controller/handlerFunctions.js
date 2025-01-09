import { game } from "../model/GameModel.js";
import { view } from "../view/view.js";

export const handlerFunctions = (()=>{

    let vsComp = false;

    const cellHandlers = (() => {

        const emptyCellHandler = (coords) => {
            game.turn(coords);
            if(game.getAttackedPlayer() === 0){
                view.renderGameBoard(game.showPlayerBoard(0),cellHandlers, game.showPlayerBoard(1), null);
            }else{
                view.renderGameBoard(game.showPlayerBoard(0),null, game.showPlayerBoard(1), cellHandlers);
            }

            if(game.getAttackedPlayer() === 0 && vsComp){
                compTurn();
            }
            
        }

        const compTurn = () =>{
            let coords = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            let valid = game.turn(coords);
            while(!valid[0]){
                coords = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                valid = game.turn(coords);
            }
            if(valid[1]){
                compTurn();
            }
            if(game.getAttackedPlayer() === 0){
                view.renderGameBoard(game.showPlayerBoard(0),cellHandlers, game.showPlayerBoard(1), null);
            }else{
                view.renderGameBoard(game.showPlayerBoard(0),null, game.showPlayerBoard(1), cellHandlers);
            }
        }
        

        const shipCellHandler = (() =>{

            let justNow = new Date().getTime();

            const shipMovementHandler = (ship, target, playerNum) => {
                let shipCoords = ship.getCoords();
                let start = shipCoords[Math.floor(shipCoords.length/2)];
                let direction = [target[0]-start[0], target[1]-start[1]];
                let ghostShipCoords = [];
                

                for(let i = 0; i < shipCoords.length; i++){
                    ghostShipCoords.push([shipCoords[i][0] + direction[0], shipCoords[i][1] + direction[1]]);
                }

                game.players[playerNum].gameboard.setGhostShip(ghostShipCoords);

                let now = new Date().getTime();
                if(now-justNow>100){
                    
                    view.renderSetUpBoard(game.showPlayerBoard(playerNum), shipCellHandler, playerNum); 
                    justNow = now;
                }
            }
            
            const shipRotationHandler = (ship, playerNum) => {  
               ship.rotate(game.players[playerNum].gameboard.getShips());
               game.players[playerNum].gameboard.updateBoard();
               view.renderSetUpBoard(game.showPlayerBoard(playerNum), shipCellHandler, playerNum); 
               
            }

            const shipTranslateHandler = (ship, playerNum) =>{
                const ghostShipCoords = game.players[playerNum].gameboard.getGhostShip();
                if(ghostShipCoords.length > 0){
                    
                    ship.setCoords(ghostShipCoords);
                    game.players[playerNum].gameboard.updateBoard();
                    game.players[playerNum].gameboard.setGhostShip([]);
                    view.renderSetUpBoard(game.showPlayerBoard(playerNum), shipCellHandler, playerNum); 
                }else{
                    view.renderSetUpBoard(game.showPlayerBoard(playerNum), shipCellHandler, playerNum); 
                }


            }


            return {shipRotationHandler, shipMovementHandler, shipTranslateHandler};
        })();

        return {emptyCellHandler, shipCellHandler}
    })();

    const startHandler =(() =>{
        const lengths = [5, 4, 3, 3, 2, 2, 1, 1];
        game.setShipsRandomly(lengths);

        const onePlayerMode = () =>{
            vsComp = true;
            view.initializeSetUpPlayer1(game.showPlayerBoard(0), cellHandlers.shipCellHandler, startGameHandler);
        }

        const twoPlayerMode = () =>{
            view.initializeSetUpPlayer1(game.showPlayerBoard(0), cellHandlers.shipCellHandler, player2SetupHandler);
        }

        return {onePlayerMode, twoPlayerMode};
    })()

    const player2SetupHandler = () =>{
        view.initializeSetUpPlayer2(game.showPlayerBoard(1), cellHandlers.shipCellHandler, startGameHandler);
    }

    const startGameHandler = () =>{
        view.initializeGameView(game.showPlayerBoard(0), null, game.showPlayerBoard(1), handlerFunctions.cellHandlers);
    }
    
    return {
        cellHandlers,
        startHandler,
        startGameHandler
    }
})();