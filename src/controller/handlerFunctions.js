import { game } from "../model/GameModel.js";
import { view } from "../view/view.js";

export const handlerFunctions = (()=>{

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
    }

    const cellHandlers = (() => {
        const emptyCellHandler = (coords) => {
            game.turn(coords);
            if(game.getAttackedPlayer() === 0){
                view.renderGameBoard(game.showPlayer1Board(),cellHandlers, game.showPlayer2Board(), null);
            }else{
                view.renderGameBoard(game.showPlayer1Board(),null, game.showPlayer2Board(), cellHandlers);
            }
            
        }

        return {emptyCellHandler}
    })();
    
    return {
        cellHandlers
    }
})();