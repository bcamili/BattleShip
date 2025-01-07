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

    const rotate = () =>{
        let midIndex = Math.floor(coords.length/2);
        let midCoords = coords[midIndex];
        let newCoords = [];
        for(let i = 0; i<coords.length ; i++){
            let oldCoords = coords[i];
            let coordsToPush = [oldCoords[1] - midCoords[1] + midCoords[0], oldCoords[0] - midCoords[0] + midCoords[1]];
            newCoords.push(coordsToPush);
        }

        setCoords(newCoords);
    }

    return { hit, setCoords, getCoords, isSunk, rotate };
}