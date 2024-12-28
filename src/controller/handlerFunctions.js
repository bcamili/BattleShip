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
            view.renderBoard(game.showUnattackedBoard(), null);
            //sleep(1000);
            //view.renderBoard(game.showCurrentlyAttackedBoard(), cellHandlers)
            
        }

        return {emptyCellHandler}
    })();
    
    return {
        cellHandlers
    }
})();