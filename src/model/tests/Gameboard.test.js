import { Gameboard } from "../Gameboard.js";

let gameboard;

beforeEach(()=>{
    gameboard = Gameboard();
});

it("places a ship horizontally of length 3 at coordinates [4,5] and returns the coordinates [[4,4],[4,5],[4,6]]",()=>{
    gameboard.placeShip([4,5], 3, 0);

    expect(gameboard.getShipCoords()).toEqual([[[4,4],[4,5],[4,6]]]);
});

it("places a ship vertically of length 3 at coordinates [4,5] and returns the coordinates [[3,5],[4,5],[5,5]]",()=>{
    gameboard.placeShip([4,5], 3, 1);

    expect(gameboard.getShipCoords()).toEqual([[[3,5],[4,5],[5,5]]]);
});

it("places ship horizontally with length 4 and out-of-bounds coords at [-1,10] at the correct coords [[0,6],[0,7],[0,8],[0,9]]", () => {
    gameboard.placeShip([-1,10], 4, 0);

    expect(gameboard.getShipCoords()).toEqual([[[0,6],[0,7],[0,8],[0,9]]]);
});

it("places ship vertically with length 4 and out-of-bounds coords at [10,-1] at the correct coords [[6,0],[7,0],[8,0],[9,0]]", () => {
    gameboard.placeShip([10,-1], 4, 1);

    expect(gameboard.getShipCoords()).toEqual([[[6,0],[7,0],[8,0],[9,0]]]);
});

it("trys to place two overlapping ships, one horizontally at [4,5], one vertically at [3,4], doesn't place the second one", () => {
    gameboard.placeShip([4,5], 3, 0);
    gameboard.placeShip([3,4], 3, 1);

    expect(gameboard.getShipCoords()).toEqual([[[4,4],[4,5],[4,6]]]);
});

it("receiveAttack checks if a ship was hit, returns true at [4,5]", ()=>{
    gameboard.placeShip([4,5],3);

    expect(gameboard.receiveAttack([4,5])).toBe(true);
});

it("receiveAttack checks if a ship was hit, returns false at [0,0]", ()=>{
    gameboard.placeShip([4,5],3);

    expect(gameboard.receiveAttack([0,0])).toBe(false);
});