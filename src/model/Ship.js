export const Ship = (length) => {
    let numHits = 0;

    const hit = () => {
        numHits++;
    };

    const isSunk = () => {
        return numHits === length;
    };

    return { hit, isSunk };
}