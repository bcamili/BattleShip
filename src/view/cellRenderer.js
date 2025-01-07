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

    const renderShipCell = (ship, shipCellHandler) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.draggable = true;
        cellDiv.classList.add("shipCell");
        cellDiv.addEventListener("click", () =>{
            shipCellHandler.shipRotationHandler(ship);
        });

        document.addEventListener("drop", (e)=>{
            e.preventDefault();
        });

        document.addEventListener("dragover", (e)=>{
            e.preventDefault();
        });

        cellDiv.addEventListener("drag", (e)=>{
            
            const direction = {
                x: Math.floor(e.offsetX/30),
                y: Math.floor(e.offsetY/30)
            }

            shipCellHandler.shipMovementHandler(ship, direction);
            
        });



        return cellDiv;
    }

    const renderSetUpCell = (coords, placeSelection) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("setupCell");

        cellDiv.addEventListener("dragleave", (e) => {
            e.preventDefault();
            console.log(coords);
            cellDiv.classList.remove("dragover");
            let selected = [...document.getElementsByClassName("x" + coords[0] + "y" +coords[1])];
            selected.forEach(item => {
                console.log("removed");
                item.classList.remove("selected");
            });
        });

        cellDiv.addEventListener("dragenter", (e) => {
            e.preventDefault();
            cellDiv.classList.add("dragover");
            let shipDiv = document.getElementsByClassName("dragging")[0];
            let shipLength = Number(shipDiv.classList[0].charAt(1));
            
            placeSelection(coords, shipLength);
        });

        cellDiv.addEventListener("dragover", (e) => {
            e.preventDefault();    
        });
        cellDiv.addEventListener("drop", (e) => {
            e.preventDefault();
        });
        
        return cellDiv;
    }

    return {
        renderHitCell,
        renderMissedCell,
        renderEmptyCell,
        renderShipCell,
        renderSetUpCell
    }
    
})();