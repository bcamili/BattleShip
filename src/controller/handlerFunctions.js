import { game } from "../model/GameModel.js";
import { view } from "../view/view.js";

export const handlerFunctions = (()=>{

    const cellHandlers = (() => {

        const emptyCellHandler = (coords) => {
            game.turn(coords);
            if(game.getAttackedPlayer() === 0){
                view.renderGameBoard(game.showPlayer1Board(),cellHandlers, game.showPlayer2Board(), null);
            }else{
                view.renderGameBoard(game.showPlayer1Board(),null, game.showPlayer2Board(), cellHandlers);
            }
            
        }

        const setupCellHandler = (coords) => {

        }

        const shipCellHandler = (() =>{

            let justNow = new Date().getTime();

            const shipMovementHandler = (ship, target) => {
                let shipCoords = ship.getCoords();
                let start = shipCoords[Math.floor(shipCoords.length/2)];
                let direction = [target[0]-start[0], target[1]-start[1]];
                let ghostShipCoords = [];
                
                for(let i = 0; i < shipCoords.length; i++){
                    ghostShipCoords.push([shipCoords[i][0] + direction[0], shipCoords[i][1] + direction[1]]);
                }


                game.players[0].gameboard.setGhostShip(ghostShipCoords);
                let now = new Date().getTime();
                if(now-justNow>100){
                    view.renderSetUpBoard(game.showPlayerBoard(0), shipCellHandler); 
                    justNow = now;
                }
            }
            
            const shipRotationHandler = (ship) => {  
               ship.rotate(game.players[0].gameboard.getShips());
               game.players[0].gameboard.updateBoard();
               view.renderSetUpBoard(game.showPlayerBoard(0), shipCellHandler); 
               
            }

            const shipTranslateHandler = (ship) =>{
                const ghostShipCoords = game.players[0].gameboard.getGhostShip();
                if(ghostShipCoords.length > 0){
                    
                    ship.setCoords(ghostShipCoords);
                    game.players[0].gameboard.updateBoard();
                    game.players[0].gameboard.setGhostShip([]);
                    view.renderSetUpBoard(game.showPlayerBoard(0), shipCellHandler); 
                }else{
                    view.renderSetUpBoard(game.showPlayerBoard(0), shipCellHandler); 
                }


            }


            return {shipRotationHandler, shipMovementHandler, shipTranslateHandler};
        })();

        return {emptyCellHandler, setupCellHandler, shipCellHandler}
    })();

    const startHandler =() =>{
        const lengths = [5, 4, 3, 3, 2, 2, 1, 1];
        //const lengths = [ 3, 2, 1];
        game.setShipsRandomly(lengths);
        view.initializeSetUpPlayer1(game.showPlayerBoard(0), cellHandlers.shipCellHandler);
        //startGameHandler();
    }
    
    const startGameHandler = () =>{
        view.initializeGameView(game.showPlayer1Board(), null, game.showPlayer2Board(), handlerFunctions.cellHandlers);
    }
    
    return {
        cellHandlers,
        startHandler,
        startGameHandler
    }
})();