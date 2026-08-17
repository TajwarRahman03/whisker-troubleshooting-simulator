<section class="sensor-simulation-screen" id="sensorCleaningScreen" hidden>
    <div class="sensor-stage">
        <div class="sensor-canvas">
            <img
                class="sensor-image"
                src="images/LR4_sensor.png"
                alt="Close-up of the Litter-Robot 4 curtain sensors"
            >

            <span class="cleaning-target cleaning-left" data-sensor="left" aria-hidden="true"></span>
            <span class="cleaning-target cleaning-center" data-sensor="center" aria-hidden="true"></span>
            <span class="cleaning-target cleaning-right" data-sensor="right" aria-hidden="true"></span>

            <span class="sensor-debris debris-primary debris-left" data-sensor="left" aria-hidden="true"></span>
            <span class="sensor-debris debris-primary debris-center" data-sensor="center" aria-hidden="true"></span>
            <span class="sensor-debris debris-primary debris-right" data-sensor="right" aria-hidden="true"></span>

            <span class="sensor-debris debris-fine debris-left" data-sensor="left" aria-hidden="true"></span>
            <span class="sensor-debris debris-fine debris-center" data-sensor="center" aria-hidden="true"></span>
            <span class="sensor-debris debris-fine debris-right" data-sensor="right" aria-hidden="true"></span>
        </div>
    </div>

    <div class="sensor-controls">
        <div class="sensor-introduction">
            <h1 id="cleaningStepTitle">Step 1: Wipe the curtain sensors</h1>

            <p id="cleaningStepInstruction">
                Drag the microfiber cloth over each of the three highlighted
                curtain sensors to remove dirt and debris.
            </p>

            <button class="finish-cleaning" id="finishCleaningButton" type="button" hidden>
                Next
            </button>
        </div>

        <div class="tools-panel">
            <div class="tools-heading">Tools</div>

            <div class="tool-options">
                <button class="tool-option" id="clothTool" type="button" aria-label="Microfiber Cloth" aria-pressed="false">
                    <img class="tool-image cloth-image" src="images/cloth.png" alt="" draggable="false">
                </button>

                <button class="tool-option" id="hoseTool" type="button" aria-label="Vacuum Hose, locked" aria-pressed="false" disabled>
                    <img class="tool-image hose-image" src="images/hose.png" alt="" draggable="false">
                </button>
            </div>
        </div>
    </div>
</section>
