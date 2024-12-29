import { Player } from "./Player.js";

export const game = (() => {
    const players = [Player("Player 1"), Player("Player 2")];
    let attackedPlayer = 1;

    /* Board Layout:
         0   1   2   3   4   5   6   7   8   9
      0 [ ] [ ] [ ] [ ] [S] [S] [S] [ ] [ ] [ ]
      1 [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [S] [ ]
      2 [S] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [S] [ ]
      3 [S] [ ] [ ] [ ] [S] [S] [ ] [ ] [S] [ ]
      4 [S] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [S] [ ]
      5 [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [S] [ ]
      6 [ ] [ ] [ ] [S] [ ] [ ] [ ] [ ] [ ] [ ]
      7 [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
      8 [S] [ ] [S] [S] [S] [S] [ ] [ ] [ ] [S]
      9 [S] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    */

    players.forEach(player => {
        player.gameboard.placeShip([3,0], 3, 1);
        player.gameboard.placeShip([9,0], 2, 1);
        player.gameboard.placeShip([6,3], 1, 0);
        player.gameboard.placeShip([8,4], 4, 0);
        player.gameboard.placeShip([0,5], 3, 0);
        player.gameboard.placeShip([3,5], 2, 0);
        player.gameboard.placeShip([3,8], 5, 1);
        player.gameboard.placeShip([8,9], 1, 1);
    });

    const turn = (coords) =>{
        let valid = players[attackedPlayer].gameboard.receiveAttack(coords);
        if (valid){
            attackedPlayer = attackedPlayer == 0 ? 1 : 0;
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

    const showPlayer1Board = () =>{
        const player = players[0];
        const board = [player.gameboard.getHits(), player.gameboard.getMisses()];
        return board;
    }

    const showPlayer2Board = () =>{
        const player = players[1];
        const board = [player.gameboard.getHits(), player.gameboard.getMisses()];
        return board;
    }

    const getAttackedPlayer = () => attackedPlayer;
    

    return {
        players, 
        turn, 
        showCurrentlyAttackedBoard, 
        showUnattackedBoard, 
        showPlayer1Board,
        showPlayer2Board,
        getAttackedPlayer,
        gameOver
    };
})();