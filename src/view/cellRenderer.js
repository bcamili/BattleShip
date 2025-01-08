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

    let justNow = new Date().getTime();
    let interval = 0;

    const renderShipCell = (ship, shipCellHandler, boardRect, playerNum) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.draggable = true;
        cellDiv.classList.add("shipCell");
        if(ship.getOrientation() === 1){
            cellDiv.classList.add("vertical");
        }

        cellDiv.addEventListener("dragstart", (e) => {
            var img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
            e.dataTransfer.setDragImage(img, 0, 0);        });

        cellDiv.addEventListener("dblclick", () =>{
            shipCellHandler.shipRotationHandler(ship, playerNum);
        });

        document.addEventListener("drop", (e)=>{
            e.preventDefault();
        });

        document.addEventListener("dragover", (e)=>{
            e.preventDefault();
        });

        cellDiv.addEventListener("drag", (e)=>{
            cellDiv.style.cursor = "grabbing";
            if(interval === 200){
                let now = new Date().getTime();
                if(now-justNow>200){
                    const target = [Math.floor((e.clientY - boardRect.top)/30), Math.floor((e.clientX - boardRect.left)/30)];
                    shipCellHandler.shipMovementHandler(ship, target, playerNum);
                    justNow = now;
                }
                interval = 0;
            }else{
                interval++;
            }
        });

        cellDiv.addEventListener("dragend", (e) =>{
            shipCellHandler.shipTranslateHandler(ship, playerNum);
        });



        return cellDiv;
    }

    const renderGhostCell = () => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("ghostCell");
        return cellDiv;
    }

    

    return {
        renderHitCell,
        renderMissedCell,
        renderEmptyCell,
        renderShipCell,
        renderGhostCell,
    }
    
})();