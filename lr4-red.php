<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LR4 Solid Red Light</title>
    <link rel="stylesheet" href="lr4-red.css">
</head>

<body>
    <a class="page-home-link" href="index.php">Return Home</a>

    <main class="simulation-page">
        <p id="simulationInstruction" hidden></p>

        <div class="simulation-layout" id="redLightScreen">
            <div class="robot-stage" id="robotStage">
                <img class="robot-image" src="images/LR4.png" alt="Litter-Robot 4 with a solid red light">

                <button
                    class="red-light-hotspot"
                    id="redLightHotspot"
                    type="button"
                    aria-label="Select the highlighted red light"
                ></button>

                <button class="red-light-callout" id="redLightCallout" type="button">
                    Click here
                </button>

                <span class="sensor-hotspot sensor-left" aria-hidden="true" hidden></span>
                <span class="sensor-hotspot sensor-center" aria-hidden="true" hidden></span>
                <span class="sensor-hotspot sensor-right" aria-hidden="true" hidden></span>
            </div>

            <section class="simulation-info" id="redLightInfo" aria-live="polite" hidden>
                <h1>Red Solid</h1>

                <p>
                    If your unit’s light bar is solid red, this indicates that the
                    cat sensor has been triggered (kitty entered globe).
                </p>

                <p>
                    The unit will cycle once the cycle delay countdown is up or if
                    you press the <strong>Reset</strong> button.
                </p>

                <p>
                    However, if the issue is still persisting, take a closer look
                    at the three sensors, called <strong>curtain sensors</strong>,
                    located in the bezel.
                </p>

                <p>
                    Debris, such as dust or cat fur, can interfere with the
                    operation of these sensors.
                </p>

                <p>
                    This can cause the unit to inaccurately measure the waste
                    drawer level and litter level, as well as cause false cat detects.
                </p>

                <p>Next, take a closer look at the three highlighted curtain sensors.</p>

                <button type="button" id="continueButton">Continue</button>
            </section>
        </div>

        <?php include __DIR__ . '/includes/sensor-cleaning.php'; ?>

        <section class="control-simulation-screen" id="controlSimulationScreen" hidden>
            <div class="controls-stage">
                <div class="controls-canvas">
                    <img
                        class="controls-image"
                        id="troubleshootingImage"
                        src="images/Controls_LR4.jpg"
                        alt="Litter-Robot 4 control panel"
                    >

                    <button
                        class="control-hotspot reset-hotspot"
                        id="resetHotspot"
                        type="button"
                        aria-label="Reset button"
                    ></button>

                    <button
                        class="control-hotspot cycle-hotspot"
                        id="cycleHotspot"
                        type="button"
                        aria-label="Cycle button"
                        hidden
                    ></button>

                </div>
            </div>

            <div class="control-information">
                <h1 id="controlStepTitle">Reset the Litter-Robot</h1>

                <div id="controlStepContent">
                    <p>
                        The curtain sensors have been cleaned. Next, perform a short
                        press of the <strong>Reset</strong> button on the control panel.
                    </p>

                    <p>This will reset the unit and prepare it for a test cycle.</p>

                    <p><strong>Select the highlighted Reset button to continue.</strong></p>
                </div>

                <div class="completion-actions" id="completionActions" hidden>
                    <a class="completion-action completion-primary" href="index.php">
                        Return Home
                    </a>

                    <button
                        class="completion-action completion-secondary"
                        id="resetSimulationButton"
                        type="button"
                    >
                        Reset Simulation
                    </button>
                </div>
            </div>
        </section>
    </main>

    <script src="sensor-cleaning.js"></script>
    <script src="lr4-red.js"></script>
</body>

</html>
