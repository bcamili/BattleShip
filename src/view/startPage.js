export const startPage = (startHandler) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    const onePlayerButton = document.createElement("div");
    onePlayerButton.className = "startButton";
    onePlayerButton.textContent = "1-Player";

    onePlayerButton.addEventListener("click", ()=>{
        startHandler.onePlayerMode();
    });

    const twoPlayerButton = document.createElement("div");
    twoPlayerButton.className = "startButton";
    twoPlayerButton.textContent = "2-Player";

    twoPlayerButton.addEventListener("click", ()=>{
        startHandler.twoPlayerMode();
    });

    buttonContainer.appendChild(onePlayerButton);
    buttonContainer.appendChild(twoPlayerButton);

    return buttonContainer;
} 