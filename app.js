let currentGridSize = 0;

function setGridSize(size) {
    currentGridSize = size * size;
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';

    // Set grid style for seamless layout
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 50px)`;

    // Create grid cells
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.textContent = i + 1;
        gridContainer.appendChild(cell);
    }
}

function submitData() {
    const wager = parseFloat(document.getElementById('betAmount').value);
    const mines = parseInt(document.getElementById('minesAmount').value);

    // Check for valid input
    if (isNaN(wager) || wager < 0.1) {
        alert('Please enter a valid wager amount (minimum 0.1).');
        return;
    }

    if (isNaN(mines) || mines < 1 || mines > currentGridSize - 1) {
        alert('Invalid format: Mines Amount Greater Than Grid Size');
        return;
    }

    simulatePayouts(currentGridSize, mines, wager);
}

function getPayout(wager, click, mines, gridSize, houseEdgePercent) {
    let probability = 1;

    for (let i = 0; i < click; ++i) {
        const availableFields = gridSize - i;
        const safeFields = availableFields - mines;
        const clickProbability = safeFields / availableFields;
        probability *= clickProbability;
    }

    const fairMultiplier = 1 / probability;
    const expectedValuePercent = 100 - houseEdgePercent;
    const multiplier = (fairMultiplier * expectedValuePercent) / 100;

    return wager * multiplier;
}

function simulatePayouts(gridSize, mines, wager, houseEdgePercent = 7) {
    const maxClicks = gridSize - mines;
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    for (let click = 1; click <= maxClicks; ++click) {
        const payout = getPayout(wager, click, mines, gridSize, houseEdgePercent);
        resultsContainer.innerHTML += `<p>After ${click} click(s): Payout = ${payout.toFixed(2)}</p>`;
    }

    resultsContainer.innerHTML += `<p>Mines Filled</p>`;
    openModal();
}

function openModal() {
    document.getElementById('resultsModal').style.display = 'block';
}


function closeModal() {
    document.getElementById('resultsModal').style.display = 'none';
}
