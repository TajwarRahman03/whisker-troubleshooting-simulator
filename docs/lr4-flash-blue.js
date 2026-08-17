const blueLightHotspot = document.getElementById("blueLightHotspot");
const blueLightCallout = document.getElementById("blueLightCallout");
const blueLightInfo = document.getElementById("blueLightInfo");
const continueButton = document.getElementById("continueButton");
const pageHomeLink = document.querySelector(".page-home-link");
const blueLightScreen = document.getElementById("blueLightScreen");
const sensorCleaningScreen = document.getElementById("sensorCleaningScreen");
const wasteDrawerScreen = document.getElementById("wasteDrawerScreen");
const blueControlScreen = document.getElementById("blueControlScreen");
const blueControlsStage = document.getElementById("blueControlsStage");
const blueTroubleshootingImage = document.getElementById("blueTroubleshootingImage");
const blueControlTitle = document.getElementById("blueControlTitle");
const blueControlContent = document.getElementById("blueControlContent");
const blueCompletionActions = document.getElementById("blueCompletionActions");
const resetBlueSimulationButton = document.getElementById("resetBlueSimulationButton");
const bluePowerHotspot = document.getElementById("bluePowerHotspot");
const blueConnectHotspot = document.getElementById("blueConnectHotspot");
const blueResetHotspot = document.getElementById("blueResetHotspot");
const blueEmptyHotspot = document.getElementById("blueEmptyHotspot");
const blueCycleHotspot = document.getElementById("blueCycleHotspot");

const buttonSequence = ["connect", "reset", "connect", "empty", "cycle"];
const sequenceHotspots = {
    connect: blueConnectHotspot,
    reset: blueResetHotspot,
    empty: blueEmptyHotspot,
    cycle: blueCycleHotspot
};

let currentSequenceIndex = 0;

const wasteDrawer = createWasteDrawerSimulation({
    onNext: startControlPanelStep
});

const sensorCleaning = createSensorCleaningSimulation({
    nextLabel: "Remove Waste Drawer",
    onNext: startWasteDrawerStep
});

function startWasteDrawerStep() {
    sensorCleaningScreen.hidden = true;
    wasteDrawerScreen.hidden = false;
    wasteDrawer.start();
}

function hideControlHotspots() {
    bluePowerHotspot.hidden = true;
    Object.values(sequenceHotspots).forEach((hotspot) => {
        hotspot.hidden = true;
        hotspot.disabled = true;
    });
}

function startControlPanelStep() {
    wasteDrawerScreen.hidden = true;
    blueControlScreen.hidden = false;
    blueTroubleshootingImage.src = "images/Controls_LR4.jpg";
    blueTroubleshootingImage.alt = "Litter-Robot 4 control panel";
    blueControlsStage.classList.remove("is-complete");
    blueCompletionActions.hidden = true;
    currentSequenceIndex = 0;
    hideControlHotspots();
    bluePowerHotspot.hidden = false;
    bluePowerHotspot.disabled = false;
    blueControlTitle.textContent = "Turn Off Litter-Robot 4";
    blueControlContent.innerHTML = `
        <p>Next, press the Power button to turn Litter-Robot 4 off.</p>
        <p><strong>Do not unplug the unit.</strong></p>
    `;
}

function handlePowerPress() {
    bluePowerHotspot.disabled = true;
    bluePowerHotspot.hidden = true;
    blueControlTitle.textContent = "Wait Before Starting the Button Sequence";
    blueControlContent.innerHTML = `
        <p>
            Wait at least 5 seconds before beginning the following button press sequence.
        </p>
    `;

    window.setTimeout(startButtonSequence, 5000);
}

function startButtonSequence() {
    blueControlTitle.textContent = "Button Press Sequence";
    blueControlContent.innerHTML = `
        <p>Now press the control panel buttons one at a time in this order:</p>
        <p>
            <strong>
                1) CONNECT<br>
                2) RESET<br>
                3) CONNECT<br>
                4) EMPTY<br>
                5) CYCLE
            </strong>
        </p>
        <p><strong>Select the highlighted button to continue.</strong></p>
    `;
    highlightCurrentSequenceButton();
}

function highlightCurrentSequenceButton() {
    Object.values(sequenceHotspots).forEach((hotspot) => {
        hotspot.hidden = true;
        hotspot.disabled = true;
    });

    const currentButton = buttonSequence[currentSequenceIndex];
    const currentHotspot = sequenceHotspots[currentButton];
    currentHotspot.hidden = false;
    currentHotspot.disabled = false;
}

function handleSequenceButtonPress(buttonName) {
    if (buttonSequence[currentSequenceIndex] !== buttonName) {
        return;
    }

    sequenceHotspots[buttonName].hidden = true;
    sequenceHotspots[buttonName].disabled = true;
    currentSequenceIndex += 1;

    if (currentSequenceIndex === buttonSequence.length) {
        startCycleInProgress();
        return;
    }

    highlightCurrentSequenceButton();
}

function startCycleInProgress() {
    hideControlHotspots();
    blueTroubleshootingImage.src = "images/Cycle.gif";
    blueTroubleshootingImage.alt = "Litter-Robot 4 performing a cycle";
    blueControlTitle.textContent = "Cycle In Progress";
    blueControlContent.innerHTML = `
        <p>Litter-Robot 4 is now performing a test cycle and lamp test.</p>
        <p>
            During the lamp test, the control panel lights may illuminate as
            the unit checks the light bar and control system.
        </p>
        <p>
            Please wait while the unit completes the cycle and verifies that
            the troubleshooting steps were successful.
        </p>
    `;

    window.setTimeout(showFlashingBlueCompletion, 7000);
}

function showFlashingBlueCompletion() {
    blueTroubleshootingImage.src = "images/LR4_blue.png";
    blueTroubleshootingImage.alt = "Litter-Robot 4 operating normally";
    blueControlsStage.classList.add("is-complete");
    blueControlTitle.textContent = "Troubleshooting Complete";
    blueControlContent.innerHTML = `
        <p>The issue has been resolved and Litter-Robot 4 is now operating correctly.</p>
        <p>
            The button sequence was completed successfully and the unit has
            returned to normal operation.
        </p>
    `;
    blueCompletionActions.hidden = false;
}

function completeBlueLightStep() {
    pageHomeLink.classList.add("is-hidden");
    blueLightHotspot.classList.add("completed");
    blueLightHotspot.disabled = true;
    blueLightCallout.classList.add("completed");
    blueLightCallout.disabled = true;
    blueLightInfo.hidden = false;
}

blueLightHotspot.addEventListener("click", completeBlueLightStep);
blueLightCallout.addEventListener("click", completeBlueLightStep);

continueButton.addEventListener("click", () => {
    blueLightScreen.hidden = true;
    sensorCleaningScreen.hidden = false;
    sensorCleaning.start();
});

bluePowerHotspot.addEventListener("click", handlePowerPress);
blueConnectHotspot.addEventListener("click", () => handleSequenceButtonPress("connect"));
blueResetHotspot.addEventListener("click", () => handleSequenceButtonPress("reset"));
blueEmptyHotspot.addEventListener("click", () => handleSequenceButtonPress("empty"));
blueCycleHotspot.addEventListener("click", () => handleSequenceButtonPress("cycle"));
resetBlueSimulationButton.addEventListener("click", () => {
    window.location.href = "lr4-flash-blue.html";
});
