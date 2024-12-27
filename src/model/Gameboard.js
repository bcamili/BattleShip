import { Ship } from "./Ship.js"

export const Gameboard = () => {
    const board = [];
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

            newShipCoords.forEach(coord => {
                if(!blocked){
                    shipCoords.forEach(ship => {
                        if(!blocked){
                            ship.forEach(compCoord => {
                                if(!blocked){
                                    if(coord[0] === compCoord[0] && coord[1] === compCoord[1]){
                                        blocked = true;
                                    }
                                }
                            })
                        }
                    });
                }
            });

            if(blocked){
                return false;
            }else{
                shipCoords.push(newShipCoords);
                newShipCoords.forEach(coord => {
                    board[coord[0]][coord[1]] = newShip;
                });
            }

        }else{
            shipCoords.push(newShipCoords);
            newShipCoords.forEach(coord => {
                board[coord[0]][coord[1]] = newShip;
            });
        }
    }

    const getShipCoords = () => shipCoords;

    const receiveAttack = (coords) => {
        const hitShip = board[coords[0]][[coords[1]]];
        if(hitShip !== undefined){
            hitShip.hit();
            return true;
        }else{
            return false;
        }
    }

    return {
        placeShip,
        getShipCoords,
        receiveAttack
    }
}