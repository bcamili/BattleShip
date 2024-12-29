import { game } from "../model/GameModel.js";
import { view } from "../view/view.js";
import { handlerFunctions } from "./handlerFunctions.js";

export const controller = (()=>{

    /*
    game.turn([3,5]);
    game.turn([0,0]);
    game.turn([3,4]);
    game.turn([7,6]);
    game.turn([0,4]);
    game.turn([5,1]);
    game.turn([0,5]);
    game.turn([5,3]);
    game.turn([5,3]);
    game.turn([4,8]);
    game.turn([0,6]);
    game.turn([0,1]);
    game.turn([1,8]);
    game.turn([0,2]);
    game.turn([2,0]);
    game.turn([0,3]);
    game.turn([2,8]);
    game.turn([0,4]);
    game.turn([3,0]);
    game.turn([0,5]);
    game.turn([3,8]);
    game.turn([0,6]);
    game.turn([4,0]);
    game.turn([0,7]);
    game.turn([4,8]);
    game.turn([0,8]);
    game.turn([5,8]);
    game.turn([0,9]);
    game.turn([6,3]);
    game.turn([1,0]);
    game.turn([8,0]);
    game.turn([1,1]);
    game.turn([8,2]);
    game.turn([1,2]);
    game.turn([8,3]);
    game.turn([1,3]);
    game.turn([8,4]);
    game.turn([1,4]);
    game.turn([8,5]);
    game.turn([1,5]);
    game.turn([8,9]);
    game.turn([1,6]);
    game.turn([9,0]);
    */
    
    view.renderGameBoard(game.showPlayer1Board(), null, game.showPlayer2Board(), handlerFunctions.cellHandlers);


    
})();