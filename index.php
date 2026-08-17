<?php
$page = $_GET['page'] ?? 'lr4';
$page = in_array($page, ['lr4', 'lre', 'lr5-pro'], true) ? $page : 'lr4';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Whisker Simulator</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <header class="top-header">

        <div class="logo-container">
            <img
                src="images/Whisker_Logo.png"
                alt="Whisker Simulator"
                class="logo"
            >
        </div>

        <nav class="model-nav" aria-label="Simulator models">
            <a href="?page=lr4"<?= $page === 'lr4' ? ' class="active" aria-current="page"' : '' ?>>LR4</a>
            <a href="?page=lre"<?= $page === 'lre' ? ' class="active" aria-current="page"' : '' ?>>LRE</a>
            <a href="?page=lr5-pro"<?= $page === 'lr5-pro' ? ' class="active" aria-current="page"' : '' ?>>LR5/LR5 Pro</a>
        </nav>

    </header>

    <main class="box-grid" aria-label="Whisker options">
        <h1 class="simulation-heading">Choose a Simulation</h1>

        <div class="boxes">
            <?php if ($page === 'lr4'): ?>
                <a class="soft-box lr4-red simulation-link" href="lr4-red.php">
                    <span class="box-label">LR4 · Solid Red Light</span>
                </a>
            <?php else: ?>
                <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <?php endif; ?>
            <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <?php if ($page === 'lr4'): ?>
                <a class="soft-box lr4-flash-blue simulation-link" href="lr4-flash-blue.php">
                    <span class="box-label">LR4 · Flashing Blue Light</span>
                </a>
            <?php else: ?>
                <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <?php endif; ?>
            <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
            <div class="soft-box"><span class="coming-soon">Coming Soon</span></div>
        </div>
    </main>

    <script src="script.js"></script>

</body>

</html>
