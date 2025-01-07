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

            const shipMovementHandler = (ship, direction) => {
                console.log(direction);
            }
            
            const shipRotationHandler = (ship) => {
                /* const shipCoords = ship.getCoords();
                const newShipCoords = [];
                
                for(let i = 0; i<shipCoords.length; i++){
                    const coord = [shipCoords[i][0], shipCoords[i][1] + 1];
                newShipCoords.push(coord);
                }
                
                ship.setCoords(newShipCoords);
                */
               ship.rotate();
               view.renderSetUpBoard(game.showPlayer1Board()[2], shipCellHandler); 
               
            }
            return {shipRotationHandler, shipMovementHandler};
        })();

        return {emptyCellHandler, setupCellHandler, shipCellHandler}
    })();

    const startHandler =() =>{
        const lengths = [5, 4, 3, 3, 2, 2, 1, 1];
        game.setShipsRandomly(lengths);
        view.initializeSetUpPlayer1(game.showPlayer1Board()[2], cellHandlers.shipCellHandler);
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