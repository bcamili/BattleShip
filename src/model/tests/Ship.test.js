import { Ship } from "../Ship.js";

describe("Ship", () => {

    let ship;

    beforeEach(()=>{
        ship = Ship(4);
    });
    

    it("isSunk() checks if hits < length, here false", ()=>{
        expect(ship.isSunk()).toBe(false);
    })

    it("checks that one hit doesn't kill the ship",()=>{
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    })

    it("checks if hits kill the ship", () =>{
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
})