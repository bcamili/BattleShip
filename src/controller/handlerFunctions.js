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
            
            const gameOver = game.gameOver();

            if(gameOver!==false){
                gameOverHandler(gameOver);
            }
        }

        const compTurn = () =>{
            let coords = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            let valid = game.turn(coords);
            while(!valid[0]){
                coords = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                valid = game.turn(coords);
            }
            if(valid[1] && !game.gameOver()){
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
        const lengths = [5, 4, 3, 3, 2, 2];
        //const lengths = [1];
        

        const onePlayerMode = () =>{
            game.setShipsRandomly(lengths);
            vsComp = true;
            view.initializeSetUpPlayer1(game.showPlayerBoard(0), cellHandlers.shipCellHandler, startGameHandler);
        }

        const twoPlayerMode = () =>{
            game.setShipsRandomly(lengths);
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
    
    const gameOverHandler = (players) =>{

        let winner = players[0];
        let loser = players[1];

        let winnerBoard = [];

        for(let i = 0; i<10; i++){
            let row = [];
            for(let j=0; j<10; j++){
                row.push(0);
            }
            winnerBoard.push(row);
        }

        let winnerMisses = winner.gameboard.getMisses();

        for(let i = 0; i<winnerMisses.length; i++){
            winnerBoard[winnerMisses[i][0]][winnerMisses[i][1]] = -1;
        }
        
        let winnerShips = winner.gameboard.getShips();
        for(let i = 0; i<winnerShips.length; i++){
            let shipCoords = winnerShips[i].getCoords();
            for(let j = 0; j< shipCoords.length; j++){
                winnerBoard[shipCoords[j][0]][shipCoords[j][1]] = 1;
            }
        }

        let winnerHits = winner.gameboard.getHits();
        for(let i = 0; i<winnerHits.length; i++){
            winnerBoard[winnerHits[i][0]][winnerHits[i][1]] = 2;
        }

        let loserBoard = [];

        for(let i = 0; i<10; i++){
            let row = [];
            for(let j=0; j<10; j++){
                row.push(0);
            }
            loserBoard.push(row);
        }

        let loserMisses = loser.gameboard.getMisses();

        for(let i = 0; i<loserMisses.length; i++){
            loserBoard[loserMisses[i][0]][loserMisses[i][1]] = -1;
        }
        
        let loserShips = loser.gameboard.getShips();
        for(let i = 0; i<loserShips.length; i++){
            let shipCoords = loserShips[i].getCoords();
            for(let j = 0; j< shipCoords.length; j++){
                loserBoard[shipCoords[j][0]][shipCoords[j][1]] = 1;
            }
        }

        let loserHits = loser.gameboard.getHits();
        for(let i = 0; i<loserHits.length; i++){
            loserBoard[loserHits[i][0]][loserHits[i][1]] = 2;
        }

        let loserStats = {
            name: loser.name,
            hits: winner.gameboard.getHits().length,
            misses: winner.gameboard.getMisses().length,
            shots: winner.gameboard.getHits().length + winner.gameboard.getMisses().length,
            accuracy: (100 * winner.gameboard.getHits().length / (winner.gameboard.getHits().length + winner.gameboard.getMisses().length)).toPrecision(3),
            board: loserBoard
        };

        let winnerStats = {
            name: winner.name,
            hits: loser.gameboard.getHits().length,
            misses: loser.gameboard.getMisses().length,
            shots: loser.gameboard.getHits().length + loser.gameboard.getMisses().length,
            accuracy: (100 * loser.gameboard.getHits().length / (loser.gameboard.getHits().length + loser.gameboard.getMisses().length)).toPrecision(3),
            board: winnerBoard
        };

        view.gameOverScreen(winnerStats, loserStats, restartHandler);
    }

    const restartHandler = () =>{
        game.restart();
        view.initializeAppView(handlerFunctions.startHandler);
    }

    return {
        cellHandlers,
        startHandler,
        startGameHandler
    }

})();