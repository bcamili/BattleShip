import "../resource/assets/styles/styles.css";

import { startPage } from "./startPage";
import { setUpPage } from "./setUpPage";
import { gamePage } from "./gamePage";
import { gameOverPage } from "./gameOverPage";

export const view = (()=>{

    const appDiv = document.getElementById("app");

    const titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";
    appDiv.appendChild(titleDiv);
    const titleContainer = document.createElement("div");
    titleContainer.id = "titleContainer";
    titleDiv.appendChild(titleContainer);
    const titleText = document.createElement("div");
    titleText.id = "titleText";
    titleText.textContent = "Battle Ship";
    titleText.setAttribute("data-text","Battle Ship");
    titleContainer.appendChild(titleText);
    const subtitleText = document.createElement("div");
    subtitleText.id = "subtitleText";
    subtitleText.textContent = "by Benjamin Camili"
    titleContainer.appendChild(subtitleText);

    const gameView = document.createElement("div");
    gameView.id = "gameView";
    appDiv.appendChild(gameView);

    const initializeAppView = (startHandler) => {
        gameView.innerHTML = "";
        gameView.appendChild(startPage(startHandler));
    }

    const initializeSetUpPlayer1 = (player1Ships, shipCellHandler, readyButtonHandler) => {
        gameView.innerHTML = "";
        const div = document.createElement("div");
        div.className = "largeBoard";
        div.style.justifySelf = "center";
        div.style.marginLeft = "124px";
        gameView.appendChild(div);
        const boardRect = div.getBoundingClientRect();
        div.remove();
        gameView.appendChild(setUpPage.player1SetUp(player1Ships, shipCellHandler, readyButtonHandler, boardRect));
    }

    const initializeSetUpPlayer2 = (player2Ships, shipCellHandler, readyButtonHandler) => {
        
        gameView.appendChild(setUpPage.player2SetUp(player2Ships, shipCellHandler, readyButtonHandler));
    }

    const renderSetUpBoard = (board, shipCellHandler, playerNum) => {
        setUpPage.renderSetUpBoard(board, shipCellHandler, playerNum);
    }

    const initializeGameView = (player1Board, player1CellHandlers, player2Board, player2CellHandlers) => {
        gameView.innerHTML = "";
        gameView.appendChild(gamePage.renderGame(player1Board, player1CellHandlers, player2Board, player2CellHandlers));
    }

    const renderGameBoard = (player1Board, player1CellHandlers, player2Board, player2CellHandlers) => {
        
        gamePage.renderGameBoard(player1Board, player1CellHandlers, player2Board, player2CellHandlers);
    }

    const gameOverScreen = (winnerStats, loserStats, restartHandler) =>{
        gameView.innerHTML = "";
        gameView.appendChild(gameOverPage.gameOver(winnerStats, loserStats, restartHandler));
    }

    return {
        initializeAppView,
        initializeSetUpPlayer1,
        initializeSetUpPlayer2,
        initializeGameView,
        renderGameBoard,
        renderSetUpBoard,
        gameOverScreen
    }
})();