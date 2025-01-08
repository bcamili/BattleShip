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

    const renderShipCell = (ship, shipCellHandler, boardRect) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.draggable = true;
        cellDiv.classList.add("shipCell");
        if(ship.getOrientation() === 1){
            cellDiv.classList.add("vertical");
        }

        cellDiv.addEventListener("dblclick", () =>{
            shipCellHandler.shipRotationHandler(ship);
        });

        document.addEventListener("drop", (e)=>{
            e.preventDefault();
        });

        document.addEventListener("dragover", (e)=>{
            e.preventDefault();
        });

        cellDiv.addEventListener("drag", (e)=>{
            if(interval === 200){
                let now = new Date().getTime();
                if(now-justNow>200){
                    const target = [Math.floor((e.clientY - boardRect.top)/30), Math.floor((e.clientX - boardRect.left)/30)];
                    shipCellHandler.shipMovementHandler(ship, target);
                    justNow = now;
                }
                interval = 0;
            }else{
                interval++;
            }
        });

        cellDiv.addEventListener("dragend", (e) =>{
            shipCellHandler.shipTranslateHandler(ship);
        });



        return cellDiv;
    }

    const renderGhostCell = () => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("ghostCell");
        return cellDiv;
    }

    const renderSetUpCell = (coords, placeSelection) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.classList.add("setupCell");

        cellDiv.addEventListener("dragleave", (e) => {
            e.preventDefault();
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
        renderGhostCell,
        renderSetUpCell
    }
    
})();