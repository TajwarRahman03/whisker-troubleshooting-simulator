const redLightHotspot = document.getElementById("redLightHotspot");
const redLightCallout = document.getElementById("redLightCallout");
const pageHomeLink = document.querySelector(".page-home-link");
const redLightInfo = document.getElementById("redLightInfo");
const simulationInstruction = document.getElementById("simulationInstruction");
const continueButton = document.getElementById("continueButton");
const sensorHotspots = document.querySelectorAll(".sensor-hotspot");
const redLightScreen = document.getElementById("redLightScreen");
const sensorCleaningScreen = document.getElementById("sensorCleaningScreen");
const controlSimulationScreen = document.getElementById("controlSimulationScreen");
const controlsStage = document.querySelector(".controls-stage");
const troubleshootingImage = document.getElementById("troubleshootingImage");
const resetHotspot = document.getElementById("resetHotspot");
const cycleHotspot = document.getElementById("cycleHotspot");
const controlStepTitle = document.getElementById("controlStepTitle");
const controlStepContent = document.getElementById("controlStepContent");
const completionActions = document.getElementById("completionActions");
const resetSimulationButton = document.getElementById("resetSimulationButton");

const sensorCleaning = createSensorCleaningSimulation({
    onNext: showControlPanelStep
});

function showSensorHighlights() {
    sensorHotspots.forEach((sensor) => {
        sensor.hidden = false;
    });
}

function hideSensorHighlights() {
    sensorHotspots.forEach((sensor) => {
        sensor.hidden = true;
    });
}

hideSensorHighlights();

function completeRedLightStep() {
    pageHomeLink.classList.add("is-hidden");
    redLightHotspot.classList.add("completed");
    redLightHotspot.disabled = true;
    redLightCallout.classList.add("completed");
    redLightCallout.disabled = true;
    redLightInfo.hidden = false;
    simulationInstruction.textContent = "Red light selected.";
    showSensorHighlights();
}

redLightHotspot.addEventListener("click", completeRedLightStep);
redLightCallout.addEventListener("click", completeRedLightStep);

continueButton.addEventListener("click", () => {
    redLightScreen.hidden = true;
    sensorCleaningScreen.hidden = false;
    sensorCleaning.start();
});

function showControlPanelStep() {
    sensorCleaningScreen.hidden = true;
    controlSimulationScreen.hidden = false;
    troubleshootingImage.src = "images/Controls_LR4.jpg";
    troubleshootingImage.alt = "Litter-Robot 4 control panel";
    controlsStage.classList.remove("is-complete");
    completionActions.hidden = true;
    cycleHotspot.hidden = true;
    cycleHotspot.disabled = true;
    resetHotspot.hidden = false;
    resetHotspot.disabled = false;
    activateResetStep();
}

function activateResetStep() {
    controlStepTitle.textContent = "Reset the Litter-Robot";
    controlStepContent.innerHTML = `
        <p>
            The curtain sensors have been cleaned. Next, perform a short
            press of the <strong>Reset</strong> button on the control panel.
        </p>
        <p>This will reset the unit and prepare it for a test cycle.</p>
        <p><strong>Select the highlighted Reset button to continue.</strong></p>
    `;
}

function completeResetStep() {
    resetHotspot.disabled = true;
    resetHotspot.hidden = true;
    activateCycleStep();
}

function activateCycleStep() {
    controlStepTitle.textContent = "Start a Test Cycle";
    controlStepContent.innerHTML = `
        <p>The five blue lights indicate that the unit is ready.</p>
        <p>
            Perform a short press of the <strong>Cycle</strong> button to
            initiate a test cycle.
        </p>
        <p>
            This will help confirm that the obstruction has been cleared and
            that the curtain sensors are operating correctly.
        </p>
        <p><strong>Select the highlighted Cycle button to continue.</strong></p>
    `;
    cycleHotspot.hidden = false;
    cycleHotspot.disabled = false;
}

function startTestCycle() {
    resetHotspot.disabled = true;
    cycleHotspot.disabled = true;
    cycleHotspot.hidden = true;
    troubleshootingImage.src = "images/Cycle.gif";
    troubleshootingImage.alt = "Litter-Robot running a test cycle";

    controlStepTitle.textContent = "Test Cycle in Progress";
    controlStepContent.innerHTML = `
        <p>The Litter-Robot is now running a test cycle.</p>
        <p>
            Please wait while the unit checks that the curtain sensor
            obstruction has been cleared.
        </p>
    `;

    window.setTimeout(completeTestCycle, 7000);
}

function completeTestCycle() {
    showTroubleshootingSuccess();
}

function showTroubleshootingSuccess() {
    troubleshootingImage.src = "images/LR4_blue.png";
    troubleshootingImage.alt = "Litter-Robot 4 ready for normal operation";
    controlsStage.classList.add("is-complete");
    controlStepTitle.textContent = "Troubleshooting Complete";
    controlStepContent.innerHTML = `
        <p>The test cycle completed successfully.</p>
        <p>
            The obstruction has been cleared and the curtain sensors are now
            operating correctly.
        </p>
        <p>Your Litter-Robot is ready for normal operation.</p>
    `;
    completionActions.hidden = false;
}

resetHotspot.addEventListener("click", completeResetStep);
cycleHotspot.addEventListener("click", startTestCycle);
resetSimulationButton.addEventListener("click", () => {
    window.location.href = "lr4-red.php";
});
