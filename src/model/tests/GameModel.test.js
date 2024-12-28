import { game } from "../GameModel.js";

describe("Game", ()=>{

    it("Player.gameboard.getShips() returns 8", () => {
        expect(game.players[0].gameboard.getShips().length).toBe(8);
    });

    it("plays a turn at [3,5], hits, and returns true", () => {
        expect(game.turn([3,5])).toBe(true);
    });

    it("plays another turn at [0,0], misses and returns false", () => {
        expect(game.turn([0,0])).toBe(true);
    });

    it("plays 3 more rounds, board should display all hits and misses", () => {
        game.turn([3,4]);
        game.turn([7,6]);
        game.turn([0,4]);
        game.turn([5,1]);
        game.turn([0,5]);
        game.turn([5,3]);
        expect(game.showCurrentlyAttackedBoard()).toEqual([[[3,5], [3,4], [0,4], [0,5]],[]]);
    });

    it("plays 2 other turns at [0,0], misses and returns false", () => {
        game.turn([5,3]);
        game.turn([4,8]);
        expect(game.showCurrentlyAttackedBoard()).toEqual([[[3,5], [3,4], [0,4], [0,5]],[[5,3]]]);
    });

    it("plays remaining rounds until player 1 wins on the next turn, gameover is false", () => {
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

        expect(game.gameOver()).toBe(false);
    })

    it("makes the last turn, gameOver is true", () => {
        game.turn([9,0]);
        expect(game.gameOver()).toBe(true);
    });
});