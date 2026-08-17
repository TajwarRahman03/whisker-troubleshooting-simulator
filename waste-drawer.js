function createWasteDrawerSimulation({ onNext = () => {} } = {}) {
    const screen = document.getElementById("wasteDrawerScreen");
    const stepTitle = document.getElementById("drawerStepTitle");
    const stepInstruction = document.getElementById("drawerStepInstruction");
    const stepPrompt = document.getElementById("drawerStepPrompt");
    const nextButton = document.getElementById("drawerNextButton");
    const handTool = document.getElementById("drawerHandTool");
    const clothTool = document.getElementById("drawerClothTool");
    const paperTool = document.getElementById("drawerPaperTool");
    const handImage = handTool.querySelector(".tool-image");
    const clothImage = clothTool.querySelector(".tool-image");
    const paperImage = paperTool.querySelector(".tool-image");
    const drawerImage = document.getElementById("drawerImage");
    const wasteDrawerLinerTarget = document.getElementById("drawerLiner");
    const paperPlacementTarget = document.getElementById("paperPlacementTarget");
    const debrisTargets = screen.querySelectorAll(".drawer-debris");

    const drawerDebrisCleaned = {
        first: false,
        second: false,
        third: false
    };

    let activeTool = null;
    let draggedToolImage = null;
    let dragging = false;
    let interactionInProgress = false;
    let linerRemoved = false;
    let paperPlaced = false;

    function start() {
        activeTool = null;
        dragging = false;
        interactionInProgress = false;
        linerRemoved = false;
        paperPlaced = false;

        Object.keys(drawerDebrisCleaned).forEach((target) => {
            drawerDebrisCleaned[target] = false;
        });

        stepTitle.textContent = "Clean the Waste Drawer";
        stepInstruction.textContent =
            "Remove the waste drawer liner, then wipe the drawer clean to remove any remaining dirt and debris.";
        stepPrompt.textContent =
            "Start by selecting the hand tool and removing the waste drawer liner.";

        nextButton.hidden = true;
        nextButton.disabled = false;
        nextButton.textContent = "Next";
        drawerImage.src = "images/wasted1.png";
        drawerImage.alt = "Open Litter-Robot waste drawer with liner";
        wasteDrawerLinerTarget.hidden = false;
        wasteDrawerLinerTarget.classList.remove("removing");
        paperPlacementTarget.hidden = true;

        handTool.disabled = false;
        handTool.classList.remove("is-active");
        handTool.classList.add("needs-selection");
        handTool.setAttribute("aria-pressed", "false");
        clothTool.disabled = true;
        clothTool.classList.remove("is-active", "needs-selection");
        clothTool.setAttribute("aria-label", "Microfiber Cloth, locked");
        clothTool.setAttribute("aria-pressed", "false");
        paperTool.disabled = true;
        paperTool.classList.remove("is-active", "needs-selection");
        paperTool.setAttribute("aria-label", "White paper, locked");
        paperTool.setAttribute("aria-pressed", "false");

        debrisTargets.forEach((debris) => {
            debris.hidden = true;
            debris.classList.remove("cleaning", "is-clean");
        });
    }

    function selectHandTool() {
        if (handTool.disabled) {
            return;
        }

        activeTool = "hand";
        handTool.classList.add("is-active");
        handTool.classList.remove("needs-selection");
        handTool.setAttribute("aria-pressed", "true");
    }

    function selectDrawerCloth() {
        if (clothTool.disabled) {
            return;
        }

        activeTool = "cloth";
        clothTool.classList.add("is-active");
        clothTool.classList.remove("needs-selection");
        clothTool.setAttribute("aria-pressed", "true");
    }

    function selectPaperTool() {
        if (paperTool.disabled) {
            return;
        }

        activeTool = "paper";
        paperTool.classList.add("is-active");
        paperTool.classList.remove("needs-selection");
        paperTool.setAttribute("aria-pressed", "true");
    }

    function startDrag(tool, event) {
        if (interactionInProgress) {
            return;
        }

        event.preventDefault();

        if (tool === "hand") {
            selectHandTool();
            draggedToolImage = handImage;
        } else if (tool === "cloth") {
            selectDrawerCloth();
            draggedToolImage = clothImage;
        } else {
            selectPaperTool();
            draggedToolImage = paperImage;
        }

        if (activeTool !== tool) {
            return;
        }

        dragging = true;
        draggedToolImage.classList.add("dragging");
        positionTool(event.clientX, event.clientY);
    }

    function positionTool(x, y) {
        if (!draggedToolImage) {
            return;
        }

        draggedToolImage.style.left = `${x}px`;
        draggedToolImage.style.top = `${y}px`;
    }

    function pointIntersects(element, x, y, forgiveness = 20) {
        const bounds = element.getBoundingClientRect();

        return x >= bounds.left - forgiveness &&
            x <= bounds.right + forgiveness &&
            y >= bounds.top - forgiveness &&
            y <= bounds.bottom + forgiveness;
    }

    function handlePointerMove(event) {
        if (!dragging || interactionInProgress) {
            return;
        }

        event.preventDefault();
        positionTool(event.clientX, event.clientY);

        if (activeTool === "hand" && !linerRemoved && pointIntersects(wasteDrawerLinerTarget, event.clientX, event.clientY, 16)) {
            removeWasteDrawerLiner();
            return;
        }

        if (activeTool === "cloth") {
            const target = Array.from(debrisTargets).find((debris) => {
                return !drawerDebrisCleaned[debris.dataset.debris] &&
                    pointIntersects(debris, event.clientX, event.clientY, 22);
            });

            if (target) {
                runDrawerScrubAnimation(target);
            }
        }

        if (activeTool === "paper" && !paperPlaced && pointIntersects(paperPlacementTarget, event.clientX, event.clientY, 16)) {
            placeWhitePaper();
        }
    }

    function removeWasteDrawerLiner() {
        interactionInProgress = true;
        dragging = false;
        handImage.classList.remove("dragging");
        handImage.classList.add("interacting");
        wasteDrawerLinerTarget.classList.add("removing");

        window.setTimeout(completeLinerRemoval, 1200);
    }

    function completeLinerRemoval() {
        linerRemoved = true;
        wasteDrawerLinerTarget.hidden = true;
        drawerImage.src = "images/wasted.png";
        drawerImage.alt = "Open, empty Litter-Robot waste drawer";
        resetDraggedTool();
        interactionInProgress = false;

        handTool.disabled = true;
        handTool.classList.remove("is-active");
        handTool.setAttribute("aria-pressed", "false");
        clothTool.disabled = false;
        clothTool.classList.add("needs-selection");
        clothTool.setAttribute("aria-label", "Microfiber Cloth");

        debrisTargets.forEach((debris) => {
            debris.hidden = false;
        });
    }

    function runDrawerScrubAnimation(target) {
        interactionInProgress = true;
        dragging = false;
        const bounds = target.getBoundingClientRect();
        positionTool(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        clothImage.classList.remove("dragging");
        clothImage.classList.add("interacting");
        target.classList.add("cleaning");

        window.setTimeout(() => completeDrawerDebris(target), 1200);
    }

    function completeDrawerDebris(target) {
        drawerDebrisCleaned[target.dataset.debris] = true;
        target.classList.remove("cleaning");
        target.classList.add("is-clean");
        resetDraggedTool();
        interactionInProgress = false;

        if (Object.values(drawerDebrisCleaned).every(Boolean)) {
            unlockPaperStep();
        }
    }

    function resetDraggedTool() {
        if (!draggedToolImage) {
            return;
        }

        draggedToolImage.classList.remove("dragging", "interacting");
        draggedToolImage.style.removeProperty("left");
        draggedToolImage.style.removeProperty("top");
        draggedToolImage = null;
    }

    function handlePointerUp() {
        if (interactionInProgress) {
            return;
        }

        dragging = false;
        resetDraggedTool();
    }

    function unlockPaperStep() {
        activeTool = null;
        clothTool.disabled = true;
        clothTool.classList.remove("is-active", "needs-selection");
        clothTool.setAttribute("aria-pressed", "false");
        debrisTargets.forEach((debris) => debris.classList.add("is-clean"));

        paperTool.disabled = false;
        paperTool.classList.add("needs-selection");
        paperTool.setAttribute("aria-label", "White paper");
        paperPlacementTarget.hidden = false;

        stepTitle.textContent = "Add White Paper";
        stepInstruction.textContent =
            "Add a piece of plain white paper to the bottom of the drawer. For example, half a sheet of printer paper.";
        stepPrompt.textContent =
            "The purpose of the white paper is to provide a reflective surface for the drawer full indicator sensor.";
    }

    function placeWhitePaper() {
        interactionInProgress = true;
        dragging = false;
        const bounds = paperPlacementTarget.getBoundingClientRect();
        positionTool(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        paperImage.classList.remove("dragging");
        paperImage.classList.add("interacting");

        window.setTimeout(completePaperPlacement, 800);
    }

    function completePaperPlacement() {
        paperPlaced = true;
        paperPlacementTarget.hidden = true;
        drawerImage.src = "images/wastedpaper.png";
        drawerImage.alt = "Litter-Robot waste drawer with white paper inside";
        resetDraggedTool();
        interactionInProgress = false;
        activeTool = null;
        paperTool.disabled = true;
        paperTool.classList.remove("is-active", "needs-selection");
        paperTool.setAttribute("aria-pressed", "false");

        stepTitle.textContent = "Insert the Waste Drawer";
        stepInstruction.textContent =
            "Insert the waste drawer again. Do not add a waste drawer liner yet.";
        stepPrompt.textContent = "";
        nextButton.textContent = "Insert waste drawer";
        nextButton.hidden = false;
    }

    handTool.addEventListener("click", selectHandTool);
    clothTool.addEventListener("click", selectDrawerCloth);
    paperTool.addEventListener("click", selectPaperTool);
    handTool.addEventListener("pointerdown", (event) => startDrag("hand", event));
    clothTool.addEventListener("pointerdown", (event) => startDrag("cloth", event));
    paperTool.addEventListener("pointerdown", (event) => startDrag("paper", event));
    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    nextButton.addEventListener("click", onNext);

    return { start };
}
