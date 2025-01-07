import { game } from "../model/GameModel.js";
import { view } from "../view/view.js";
import { handlerFunctions } from "./handlerFunctions.js";

export const controller = (()=>{

    
    view.initializeAppView(handlerFunctions.startHandler);
    


    
})();