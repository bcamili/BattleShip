import { Ship } from "./Ship.js"

export const Gameboard = () => {
    const board = [];
    const ships = [];
    const hits = [];
    const misses = [];

    for(let i = 0; i<10; i++){
        board.push([]);
    }
    const shipCoords = [];

    const clamp = (num, min, max) => {
        return Math.max(min, Math.min(num, max));
    }

    const getValidMidpoint = (coords, shipLength, orientation)=>{
        let midpoint = [];

        if(orientation === 0){
            midpoint.push(clamp(coords[0], 0, 9));
            if(shipLength % 2  !== 0){
                midpoint.push(clamp(coords[1], Math.floor(shipLength/2), 9 - Math.floor(shipLength/2)));
            }else{
                midpoint.push(clamp(coords[1], Math.floor(shipLength/2), 9 - (Math.floor(shipLength/2)-1)));
            }
        }else{
            
            if(shipLength % 2  !== 0){
                midpoint.push(clamp(coords[0], Math.floor(shipLength/2), 9 - Math.floor(shipLength/2)));
            }else{
                midpoint.push(clamp(coords[0], Math.floor(shipLength/2), 9 - (Math.floor(shipLength/2)-1)));
            }
            midpoint.push(clamp(coords[1], 0, 9));
        }

        return midpoint;
    }

    const placeShip = (coords, shipLength, orientation) => {
        const newShip = Ship(shipLength);
        const newShipCoords = [];
        let midpoint = getValidMidpoint(coords, shipLength, orientation);
        let halfLength = Math.floor(shipLength/2);

        if(orientation === 0){

            for(let i = halfLength; i>=1;i--){
                newShipCoords.push([midpoint[0], midpoint[1]-i]);
            }
    
            newShipCoords.push(midpoint);
    
            if(shipLength%2==0){
                halfLength--;
            }
    
            for(let i = 1; i<=halfLength;i++){
                newShipCoords.push([midpoint[0], midpoint[1]+i]);
            }

        }else{

            for(let i = halfLength; i>=1;i--){
                newShipCoords.push([midpoint[0]-i, midpoint[1]]);
            }
    
            newShipCoords.push(midpoint);
    
            if(shipLength%2==0){
                halfLength--;
            }
    
            for(let i = 1; i<=halfLength;i++){
                newShipCoords.push([midpoint[0]+i, midpoint[1]]);
            }
        }

        if(shipCoords.length > 0){
            let blocked = false;

            for(let i = 0; i<newShipCoords.length; i++){
                let newShipCoord = newShipCoords[i];
                for(let j = 0; j<shipCoords.length; j++){
                    let ship = shipCoords[j];
                    for(let k = 0; k<ship.length; k++){
                        let shipCoord = ship[k];
                        if(shipCoord[0] === newShipCoord[0] && shipCoord[1] === newShipCoord[1]){
                            blocked = true;
                            break;
                        }
                    }
                    if(blocked) break;
                }
                if(blocked) break;
            }

            if(blocked){
                return false;
            }else{
                pushShip(newShip, newShipCoords);
            }

        }else{
            pushShip(newShip, newShipCoords);
        }
    }

    const pushShip = (newShip, newShipCoords) => {
        shipCoords.push(newShipCoords);
        newShipCoords.forEach(coord => {
            board[coord[0]][coord[1]] = newShip;
        });
        ships.push(newShip);
    }

    const getShipCoords = () => shipCoords;

    const receiveAttack = (coords) => {
        let shotAlready = false;
        for(let i = 0; i<hits.length; i++){
            let hitCoords = hits[i];
            if(hitCoords[0]===coords[0] && hitCoords[1]===coords[1]){
                shotAlready = true;
            }
        }

        for(let i = 0; i<misses.length; i++){
            let missedCoords = misses[i];
            if(missedCoords[0]===coords[0] && missedCoords[1]===coords[1]){
                shotAlready = true;
            }
        }

        if(!shotAlready){
            const hitShip = board[coords[0]][[coords[1]]];
            if(hitShip !== undefined){
                hitShip.hit();
                hits.push(coords);
                return true;
            }else{
                misses.push(coords);
                return true;
            }
        }else{
            return false;
        }
    }

    const allSunk = () =>{
        let allShipsSunk = true;

        for(let i = 0; i<ships.length; i++){
            let ship = ships[i];
            if(!ship.isSunk()){
                allShipsSunk = false;
                break;
            }
        }
        

        if(allShipsSunk){
            return true;
        }else{
            return false;
        }
    }

    const getHits = () => {
        return hits;
    }

    const getMisses = () => {
        return misses;
    }

    const getShips = () =>{
        return ships;
    }

    return {
        placeShip,
        getShipCoords,
        receiveAttack,
        allSunk,
        getHits,
        getMisses,
        getShips
    }
}