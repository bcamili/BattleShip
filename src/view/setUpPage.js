import player1Img from "../resource/assets/img/8fb95578-d76f-4785-b14a-c3ebc4fb28d8.png";
import player2Img from "../resource/assets/img/98f90e3c-5397-4f8a-b14a-9c9eed1f2594.png";
import { boardRenderer } from "./boardRenderer";

export const setUpPage = (() => {
    const setUpContainer = document.createElement("div");
    setUpContainer.id = "setUpContainer";

    const player1Side = document.createElement("div");
    player1Side.id = "player1Side";
    player1Side.className = "playerSide";

    const player1AvatarContainer = document.createElement("div");
    player1AvatarContainer.className = "avatarContainer";
    player1Side.appendChild(player1AvatarContainer);

    const player1Avatar = document.createElement("img");
    player1Avatar.className = "avatar";
    player1Avatar.src = player1Img;
    player1AvatarContainer.appendChild(player1Avatar);

    const player1Stats = document.createElement("div");
    player1Stats.id = "player1Stats";
    player1Stats.className = "playerStats";
    player1Stats.textContent = "Player 1"
    player1Side.appendChild(player1Stats);

    const player1LargeBoard = document.createElement("div");
    player1LargeBoard.id = "player1LargeBoard";
    player1LargeBoard.className = "largeBoard";

    const player2LargeBoard = document.createElement("div");
    player2LargeBoard.id = "player2LargeBoard";
    player2LargeBoard.className = "largeBoard";

    const player2Side = document.createElement("div");
    player2Side.id = "player2Side";
    player2Side.className = "playerSide";

    const player2AvatarContainer = document.createElement("div");
    player2AvatarContainer.className = "avatarContainer";
    player2Side.appendChild(player2AvatarContainer);

    const player2Avatar = document.createElement("img");
    player2Avatar.className = "avatar";
    player2Avatar.src = player2Img;
    player2AvatarContainer.appendChild(player2Avatar);

    const player2Stats = document.createElement("div");
    player2Stats.id = "player2Stats";
    player2Stats.className = "playerStats";
    player2Stats.textContent = "Player 2"
    player2Side.appendChild(player2Stats);
    
    const player1SetUp = (player1Ships, shipCellHandler, readyButtonHandler, boardRect) => {
        setUpContainer.innerHTML = "";
        setUpContainer.appendChild(player1Side);
        setUpContainer.appendChild(player1LargeBoard);
        const readyButton = document.createElement("div");
        readyButton.id = "readyButton";
        readyButton.textContent = "Ready";
        readyButton.className = "startButton readyButton";
        readyButton.addEventListener("click", () => {
            readyButtonHandler();
        });
        player1Side.appendChild(readyButton);

        renderSetUpBoard(player1Ships, shipCellHandler, 0, boardRect);
        return setUpContainer;
    }

    const player2SetUp = (player2Ships, shipCellHandler, readyHandler) => {
        setUpContainer.innerHTML = "";
        setUpContainer.appendChild(player2LargeBoard);
        setUpContainer.appendChild(player2Side);
        const readyButton = document.createElement("div");
        readyButton.id = "readyButton";
        readyButton.textContent = "Ready";
        readyButton.className = "startButton readyButton";
        readyButton.addEventListener("click", () => {
            readyHandler();
        });
        player2Side.appendChild(readyButton);

        renderSetUpBoard(player2Ships, shipCellHandler, 1);
        return setUpContainer;
    }

    const playerBoards = [player1LargeBoard, player2LargeBoard];

    const renderSetUpBoard = (board, shipCellHandler, playerNum, boardRect) => {
            const playerBoard = playerBoards[playerNum];
            playerBoard.innerHTML ="";
            if(boardRect===undefined){
                boardRect = playerBoard.getBoundingClientRect();
            }
            playerBoard.appendChild(boardRenderer.renderSetUpBoard(board, shipCellHandler, boardRect, playerNum));
    
    }

    return {player1SetUp, player2SetUp, renderSetUpBoard}
})();