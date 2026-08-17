function createSensorCleaningSimulation({ onNext = () => {}, nextLabel = "Next" } = {}) {
    const screen = document.getElementById("sensorCleaningScreen");
    const stepTitle = document.getElementById("cleaningStepTitle");
    const stepInstruction = document.getElementById("cleaningStepInstruction");
    const nextButton = document.getElementById("finishCleaningButton");
    const targets = screen.querySelectorAll(".cleaning-target");
    const debrisLayers = screen.querySelectorAll(".sensor-debris");
    const clothTool = document.getElementById("clothTool");
    const hoseTool = document.getElementById("hoseTool");
    const clothImage = clothTool.querySelector(".tool-image");
    const hoseImage = hoseTool.querySelector(".tool-image");

    const clothCleaned = { left: false, center: false, right: false };
    const vacuumCleaned = { left: false, center: false, right: false };

    let activeTool = null;
    let draggedToolImage = null;
    let dragging = false;
    let cleaningInProgress = false;

    function start() {
        activeTool = null;
        dragging = false;
        cleaningInProgress = false;

        Object.keys(clothCleaned).forEach((sensor) => {
            clothCleaned[sensor] = false;
            vacuumCleaned[sensor] = false;
        });

        stepTitle.textContent = "Step 1: Wipe the curtain sensors";
        stepInstruction.textContent =
            "Drag the microfiber cloth over each of the three highlighted curtain sensors to remove dirt and debris.";

        nextButton.hidden = true;
        nextButton.disabled = false;
        nextButton.textContent = nextLabel;
        clothTool.disabled = false;
        clothTool.setAttribute("aria-pressed", "false");
        hoseTool.disabled = true;
        hoseTool.setAttribute("aria-label", "Vacuum Hose, locked");
        hoseTool.setAttribute("aria-pressed", "false");
        clothTool.classList.remove("is-active");
        clothTool.classList.add("needs-selection");
        hoseTool.classList.remove("is-active", "needs-selection");

        targets.forEach((target) => target.classList.remove("is-clean"));
        debrisLayers.forEach((debris) => {
            debris.classList.remove("removed", "vacuuming");
        });
    }

    function selectCloth() {
        if (clothTool.disabled) {
            return;
        }

        activeTool = "cloth";
        clothTool.classList.add("is-active");
        clothTool.classList.remove("needs-selection");
        clothTool.setAttribute("aria-pressed", "true");
        hoseTool.classList.remove("is-active");
        hoseTool.setAttribute("aria-pressed", "false");
    }

    function selectVacuum() {
        if (hoseTool.disabled) {
            return;
        }

        activeTool = "hose";
        hoseTool.classList.add("is-active");
        hoseTool.classList.remove("needs-selection");
        hoseTool.setAttribute("aria-pressed", "true");
    }

    function startToolDrag(tool, event) {
        if (cleaningInProgress) {
            return;
        }

        event.preventDefault();

        if (tool === "cloth") {
            selectCloth();
            draggedToolImage = clothImage;
        } else {
            selectVacuum();
            draggedToolImage = hoseImage;
        }

        if (activeTool !== tool) {
            return;
        }

        dragging = true;
        draggedToolImage.classList.add("dragging");
        positionDraggedTool(event.clientX, event.clientY);
    }

    function positionDraggedTool(x, y) {
        if (!draggedToolImage) {
            return;
        }

        draggedToolImage.style.left = `${x}px`;
        draggedToolImage.style.top = `${y}px`;
    }

    function findSensorAtPoint(x, y) {
        const completionState = activeTool === "cloth" ? clothCleaned : vacuumCleaned;

        return Array.from(targets).find((target) => {
            const sensor = target.dataset.sensor;

            if (completionState[sensor]) {
                return false;
            }

            const bounds = target.getBoundingClientRect();
            const forgiveness = 18;

            return x >= bounds.left - forgiveness &&
                x <= bounds.right + forgiveness &&
                y >= bounds.top - forgiveness &&
                y <= bounds.bottom + forgiveness;
        });
    }

    function handlePointerMove(event) {
        if (!dragging || cleaningInProgress) {
            return;
        }

        event.preventDefault();
        positionDraggedTool(event.clientX, event.clientY);

        const target = findSensorAtPoint(event.clientX, event.clientY);

        if (target) {
            runCleaningAnimation(target);
        }
    }

    function runCleaningAnimation(target) {
        cleaningInProgress = true;
        dragging = false;

        const bounds = target.getBoundingClientRect();
        positionDraggedTool(
            bounds.left + bounds.width / 2,
            bounds.top + bounds.height / 2
        );
        draggedToolImage.classList.remove("dragging");
        draggedToolImage.classList.add("interacting");

        if (activeTool === "hose") {
            const fineDebris = screen.querySelector(
                `.debris-fine[data-sensor="${target.dataset.sensor}"]`
            );
            fineDebris.classList.add("vacuuming");
        }

        window.setTimeout(() => completeSensor(target), 1200);
    }

    function completeSensor(target) {
        const sensor = target.dataset.sensor;
        const completionState = activeTool === "cloth" ? clothCleaned : vacuumCleaned;
        completionState[sensor] = true;
        target.classList.add("is-clean");

        const debrisSelector = activeTool === "cloth" ? ".debris-primary" : ".debris-fine";
        const debris = screen.querySelector(
            `${debrisSelector}[data-sensor="${sensor}"]`
        );
        debris.classList.add("removed");

        resetDraggedTool();
        cleaningInProgress = false;

        if (Object.values(completionState).every(Boolean)) {
            if (activeTool === "cloth") {
                unlockVacuum();
            } else {
                finish();
            }
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
        if (cleaningInProgress) {
            return;
        }

        dragging = false;
        resetDraggedTool();
    }

    function unlockVacuum() {
        activeTool = null;
        clothTool.disabled = true;
        clothTool.classList.remove("is-active");
        clothTool.setAttribute("aria-pressed", "false");
        hoseTool.disabled = false;
        hoseTool.setAttribute("aria-label", "Vacuum Hose");
        hoseTool.classList.add("needs-selection");

        targets.forEach((target) => target.classList.remove("is-clean"));
        stepTitle.textContent = "Step 2: Vacuum the curtain sensors";
        stepInstruction.textContent =
            "Great. Now use the vacuum hose to remove any remaining dust and debris around each curtain sensor.";
    }

    function finish() {
        activeTool = null;
        dragging = false;
        clothTool.disabled = true;
        hoseTool.disabled = true;
        hoseTool.classList.remove("is-active", "needs-selection");
        hoseTool.setAttribute("aria-pressed", "false");
        targets.forEach((target) => target.classList.add("is-clean"));
        debrisLayers.forEach((debris) => debris.classList.add("removed"));

        stepTitle.textContent = "Curtain sensors cleaned";
        stepInstruction.textContent =
            "Great job. You have cleaned all three curtain sensors and removed the remaining debris.";
        nextButton.hidden = false;
    }

    clothTool.addEventListener("click", selectCloth);
    hoseTool.addEventListener("click", selectVacuum);
    clothTool.addEventListener("pointerdown", (event) => startToolDrag("cloth", event));
    hoseTool.addEventListener("pointerdown", (event) => startToolDrag("hose", event));
    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    nextButton.addEventListener("click", onNext);

    return { start };
}
