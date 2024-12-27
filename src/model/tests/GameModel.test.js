import { game } from "../GameModel.js";

describe("Game", ()=>{

    it("Player.gameboard.getShips() returns 8", () => {
        expect(game.players[0].gameboard.getShips().length).toBe(8);
    });
});