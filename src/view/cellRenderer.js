export const cellRenderer = (() => {

    const renderHitCell = () =>{
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("hitCell");
        return cellDiv;
    }

    const renderMissedCell = () =>{
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("missedCell");

        return cellDiv;
    }

    const renderEmptyCell = (coords, emptyCellHandler) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("emptyCell");
        
        if(emptyCellHandler!==null){
            cellDiv.addEventListener("click", () => {
                emptyCellHandler(coords);
            });
        }

        return cellDiv;
    }

    return {
        renderHitCell,
        renderMissedCell,
        renderEmptyCell
    }
    
})();