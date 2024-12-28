import { Gameboard } from "../Gameboard.js";


describe("Gameboard", () =>{

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
        gameboard.placeShip([4,5],3,0);
        
        expect(gameboard.receiveAttack([4,5])).toBe(true);
    });
    
    it("receiveAttack checks if a ship was hit, returns true at [0,0]", ()=>{
        gameboard.placeShip([4,5],3,0);
        
        expect(gameboard.receiveAttack([0,0])).toBe(true);
    });
    
    it("creates length-3 ship at [4,5], hits it once and the gameboard reports that not all ships are sunk", () =>{
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,4]);
        
        expect(gameboard.allSunk()).toBe(false);
    });
    
    it("creates length-3 ship at [4,5], hits it twice and the gameboard reports that not all ships are sunk", () =>{
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,4]);
        gameboard.receiveAttack([4,5]);
        
        expect(gameboard.allSunk()).toBe(false);
    });
    
    it("creates length-3 ship at [4,5], sinks it and the gameboard reports that all ships are sunk", () =>{
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,4]);
        gameboard.receiveAttack([4,5]);
        gameboard.receiveAttack([4,6]);
        
        expect(gameboard.allSunk()).toBe(true);
    });
    
    it("creates 2 length-3 ship at [4,5] and [0,0], sinks one and the gameboard reports that not all ships are sunk", () =>{
        gameboard.placeShip([0,0], 3, 1);
        
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,4]);
        gameboard.receiveAttack([4,5]);
        gameboard.receiveAttack([4,6]);
        
        expect(gameboard.allSunk()).toBe(false);
    });
    
    it("creates 2 length-3 ship at [4,5] and [0,0], sinks both and the gameboard reports that  all ships are sunk", () =>{
        gameboard.placeShip([0,0], 3, 1);
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,4]);
        gameboard.receiveAttack([4,5]);
        gameboard.receiveAttack([4,6]);
        
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([1,0]);
        gameboard.receiveAttack([2,0]);
        
        expect(gameboard.allSunk()).toBe(true);
    });
    
    it("place a ship at [4,5], hits it, hits returns [4,5], misses return []", () => {
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,5]);
        
        expect(gameboard.getHits()).toEqual([[4,5]]);
        expect(gameboard.getMisses()).toEqual([]);
    });
    
    it("place a ship at [4,5], misses it, hits returns [], misses return [0,0]", () => {
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([0,0]);
        
        expect(gameboard.getHits()).toEqual([]);
        expect(gameboard.getMisses()).toEqual([[0,0]]);
    });
    
    it("place a ship at [4,5], hits it twice, misses it once, hits returns [[4,5], [4,6]], misses return [0,0]", () => {
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([4,5]);
        gameboard.receiveAttack([4,6]);
        
        expect(gameboard.getHits()).toEqual([[4,5], [4,6]]);
        expect(gameboard.getMisses()).toEqual([[0,0]]);
    });
    
    it("places ship at [4,5], hits [4,5] twice, getHits returns [4,5]", () => {
        gameboard.placeShip([4,5], 3, 0);
        gameboard.receiveAttack([4,5]);
        
        expect(gameboard.receiveAttack([4,5])).toBe(false);
        expect(gameboard.getHits()).toEqual([[4,5]]);
        
    });
});