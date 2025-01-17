import player1Img from "../resource/assets/img/8fb95578-d76f-4785-b14a-c3ebc4fb28d8.png";
import player2Img from "../resource/assets/img/98f90e3c-5397-4f8a-b14a-9c9eed1f2594.png";
import { boardRenderer } from "./boardRenderer";

export const gameOverPage = (() =>{
    const gameOver = (winnerStats, loserStats, restartHandler) => {

        const gameOverScreen = document.createElement("div");
        gameOverScreen.id = "gameOverScreen";

        let winnerImage;
        let loserImage;
        
        if (winnerStats.name === "Player 1"){
            winnerImage = player1Img;
            loserImage = player2Img;
        }else{
            winnerImage = player2Img;
            loserImage = player1Img;
        }

        const gameOverBG = document.createElement("div");
        gameOverBG.id = "gameOverBG";
        gameOverScreen.appendChild(gameOverBG);

        const winnerBox = document.createElement("div");
        winnerBox.id = "winnerBox";
        gameOverBG.appendChild(winnerBox);

        const winnerHeader = document.createElement("div");
        winnerHeader.id = "winnerHeader";
        winnerHeader.textContent = winnerStats.name + " won!";
        winnerBox.appendChild(winnerHeader);

        const winnerContent = document.createElement("div");
        winnerContent.id = "winnerContent";
        winnerBox.appendChild(winnerContent);

        const winnerAvatarContainer = document.createElement("div");
        winnerAvatarContainer.className = "avatarContainer";
        winnerContent.appendChild(winnerAvatarContainer);
    
        const winnerAvatar = document.createElement("img");
        winnerAvatar.className = "avatar";
        winnerAvatar.src = winnerImage;
        winnerAvatarContainer.appendChild(winnerAvatar);

        const winnerFinalBoardContainer = document.createElement("div");
        winnerFinalBoardContainer.className = "finalBoardContainer";
        winnerFinalBoardContainer.appendChild(boardRenderer.finalBoard(winnerStats.board));
        winnerContent.appendChild(winnerFinalBoardContainer);

        const winnerStatsContainer = document.createElement("div");
        winnerStatsContainer.className = "winnerStatsContainer";
        winnerStatsContainer.innerHTML = `
Shots fired: <span>${winnerStats.shots}</span><br>
Hits: <span>${winnerStats.hits}</span><br>
Misses: <span>${winnerStats.misses}</span><br>
Accuracy: <span>${winnerStats.accuracy}%</span>
        `;
        winnerContent.appendChild(winnerStatsContainer);

        


        const loserBox = document.createElement("div");
        loserBox.id = "loserBox";
        gameOverBG.appendChild(loserBox);

        const loserHeader = document.createElement("div");
        loserHeader.id = "loserHeader";
        loserHeader.textContent = loserStats.name + " lost.";
        loserBox.appendChild(loserHeader);

        const loserContent = document.createElement("div");
        loserContent.id = "loserContent";
        loserBox.appendChild(loserContent);

        const loserAvatarContainer = document.createElement("div");
        loserAvatarContainer.className = "avatarContainer";
        loserContent.appendChild(loserAvatarContainer);
    
        const loserAvatar = document.createElement("img");
        loserAvatar.className = "avatar";
        loserAvatar.src = loserImage;
        loserAvatarContainer.appendChild(loserAvatar);

        const loserFinalBoardContainer = document.createElement("div");
        loserFinalBoardContainer.className = "finalBoardContainer";
        loserFinalBoardContainer.appendChild(boardRenderer.finalBoard(loserStats.board));
        loserContent.appendChild(loserFinalBoardContainer);

        const loserStatsContainer = document.createElement("div");
        loserStatsContainer.className = "loserStatsContainer";
        loserStatsContainer.innerHTML = `
Shots fired: <span>${loserStats.shots}</span><br>
Hits: <span>${loserStats.hits}</span><br>
Misses: <span>${loserStats.misses}</span><br>
Accuracy: <span>${loserStats.accuracy}%</span>
        `;
        loserContent.appendChild(loserStatsContainer);

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "buttonContainer";
        const restartButton = document.createElement("div");
        restartButton.className = "startButton";
        restartButton.textContent = "Restart";

        restartButton.addEventListener("click", ()=>{
            restartHandler();
        });
        buttonContainer.appendChild(restartButton);
        gameOverScreen.appendChild(buttonContainer);

        return gameOverScreen;
    }

    return {gameOver};
})();