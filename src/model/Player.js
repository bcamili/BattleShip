import { Gameboard } from "./Gameboard.js";

export const Player = (name) =>{

    const gameboard = Gameboard();

    return {name, gameboard};
}