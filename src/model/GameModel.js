import { Player } from "./Player.js";

export const game = (() => {
    const players = [Player("Player 1"), Player("Player 2")];

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
        player.gameboard.placeShip([8,0], 2, 1);
        player.gameboard.placeShip([6,3], 1, 0);
        player.gameboard.placeShip([8,4], 4, 0);
        player.gameboard.placeShip([0,5], 3, 0);
        player.gameboard.placeShip([3,5], 2, 0);
        player.gameboard.placeShip([3,8], 5, 1);
        player.gameboard.placeShip([8,9], 1, 1);
    });

    

    return {players};
})();