export const Ship = (length) => {
    let numHits = 0;
    let coords = [];

    const hit = () => {
        numHits++;
    };

    const setCoords = (newCoords) =>{
        coords = newCoords;
    }

    const getCoords = () => {
        return coords;
    }

    const isSunk = () => {
        return numHits === length;
    };

    const rotate = (allShips) =>{
        let midIndex = Math.floor(coords.length/2);
        let midCoords = coords[midIndex];
        let newCoords = [];
        for(let i = 0; i<coords.length ; i++){
            let oldCoords = coords[i];
            let coordsToPush = [oldCoords[1] - midCoords[1] + midCoords[0], oldCoords[0] - midCoords[0] + midCoords[1]];
            newCoords.push(coordsToPush);
        }

        for(let i = 0; i<newCoords.length; i++){
            if(newCoords[i][0] < 0 || newCoords[i][0] > 9 || newCoords[i][1] < 0 || newCoords[i][1] > 9){
                return;
            }
        }

        const tempCoords = [...coords];
        tempCoords.splice(midIndex, 1);

        const otherShips = allShips.filter(ship => ship !== this);

        if (!checkCollision(newCoords, otherShips.concat([{ getCoords: () => tempCoords }]))) {
            setCoords(newCoords);
        }   
    }

    const checkCollision = (newCoords, allShips) => {
        
        for (let i = 0; i < newCoords.length; i++) {
            for (let j = 0; j < allShips.length; j++) {
                const shipCoords = allShips[j].getCoords();
                if(shipCoords === coords){
                    continue;
                }else{
                    console.log(shipCoords);
                    for (let k = 0; k < shipCoords.length; k++) {
                        if (newCoords[i][0] === shipCoords[k][0] && newCoords[i][1] === shipCoords[k][1]) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    return { hit, setCoords, getCoords, isSunk, rotate };
}