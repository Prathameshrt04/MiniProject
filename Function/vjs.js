// Get references to the input range and display elements
const speedControl = document.getElementById('speed-control');
const speedDisplay = document.getElementById('speed-display');

// Update the display whenever the range slider is adjusted
speedControl.addEventListener('input', function() {
    speedDisplay.textContent = speedControl.value;
});

document.getElementById('start-visualization').addEventListener('click', function () {
    const input = document.getElementById('numbers-input').value;
    const algorithm = document.getElementById('algorithm-select').value;
    const speed = parseInt(document.getElementById('speed-control').value);

    const numbers = input.split(',').map(Number);
    const visualizationContainer = document.getElementById('visualization-container');
    visualizationContainer.innerHTML = '';

    if (algorithm === 'merge') {
        mergeSortVisualize(numbers, speed, visualizationContainer);
    } else if (algorithm === 'quick') {
        quickSortVisualize(numbers, speed, visualizationContainer);
    }
});

// Merge Sort Visualization
async function mergeSortVisualize(arr, speed, container) {
    await mergeSort(arr, 0, arr.length - 1, container, speed);
}

async function mergeSort(arr, left, right, container, speed) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await highlightDivide(arr, left, mid, right, container, speed);
        await mergeSort(arr, left, mid, container, speed);
        await mergeSort(arr, mid + 1, right, container, speed);
        await merge(arr, left, mid, right, container, speed);
    }
}

async function highlightDivide(arr, left, mid, right, container, speed) {
    const row = createArrayRow(arr, container, 'Divide Step');
    for (let i = left; i <= mid; i++) {
        row.children[i].classList.add('left-merge-part');
    }
    for (let i = mid + 1; i <= right; i++) {
        row.children[i].classList.add('right-merge-part');
    }
    await delay(speed);
}

async function merge(arr, left, mid, right, container, speed) {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        await delay(speed);

        // Highlight elements being merged
        const row = createArrayRow(arr, container, `Merging ${leftArray[i]} and ${rightArray[j]}`);
        if (row.children[k]) {
            row.children[k].classList.add('merge-active');
        }

        // Merge logic
        arr[k] = (leftArray[i] <= rightArray[j]) ? leftArray[i++] : rightArray[j++];
        k++;
    }

    while (i < leftArray.length) {
        arr[k++] = leftArray[i++];
    }
    while (j < rightArray.length) {
        arr[k++] = rightArray[j++];
    }

    // Highlight the merged elements as sorted
    const mergedRow = createArrayRow(arr, container, "Merged Step");
    for (let x = left; x <= right; x++) {
        mergedRow.children[x].classList.add('sorted');
    }
}

// Quick Sort Visualization
async function quickSortVisualize(arr, speed, container) {
    await quickSort(arr, 0, arr.length - 1, container, speed);
}

async function quickSort(arr, low, high, container, speed) {
    if (low < high) {
        const pi = await partition(arr, low, high, container, speed);
        await quickSort(arr, low, pi - 1, container, speed);
        await quickSort(arr, pi + 1, high, container, speed);
    } else if (low === high) {
        // Mark single element partitions as sorted
        const row = createArrayRow(arr, container, `Element ${arr[low]} is in sorted position`);
        row.children[low].classList.add('sorted');
    }
}

async function partition(arr, low, high, container, speed) {
    const pivot = arr[low];
    let i = low;

    // Highlight pivot selection step
    const pivotRow = createArrayRow(arr, container, `Selected pivot ${pivot}`);
    pivotRow.children[low].classList.add('pivot');
    await delay(speed);

    for (let j = low + 1; j <= high; j++) {
        await delay(speed);
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            highlightSwap(arr, container, i, j);
        }
    }
    [arr[low], arr[i]] = [arr[i], arr[low]];

    // Show the partitioned array with the pivot in its new position
    const partitionedRow = createArrayRow(arr, container, `Partitioned around pivot ${pivot}`);
    partitionedRow.children[i].classList.add('pivot');

    // Highlight the pivot as sorted and keep it highlighted
    partitionedRow.children[i].classList.add('sorted');
    
    // Keep the sorted element green in future rows
    await markAsSorted(arr, container, i, speed);
    return i;
}

// Mark elements as sorted in the next steps
async function markAsSorted(arr, container, index, speed) {
    const sortedRow = createArrayRow(arr, container, `Element ${arr[index]} in sorted position`);
    sortedRow.children[index].classList.add('sorted');
    await delay(speed);
}

// Utility Functions
function createArrayRow(arr, container, explanation) {
    const stepContainer = document.createElement('div');
    stepContainer.className = 'step-container';

    const arrayRow = document.createElement('div');
    arrayRow.className = 'array-row';

    arr.forEach((num, i) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = num;
        
        // Check if the element is already sorted to keep it highlighted
        if (element.classList.contains('sorted')) {
            element.classList.add('sorted');
        }

        arrayRow.appendChild(element);
    });

    const explanationEl = document.createElement('div');
    explanationEl.className = 'explanation';
    explanationEl.textContent = explanation;

    stepContainer.appendChild(arrayRow);
    stepContainer.appendChild(explanationEl);
    container.appendChild(stepContainer);

    return arrayRow;
}

function highlightSwap(arr, container, indexA, indexB) {
    const row = createArrayRow(arr, container, `Swapping ${arr[indexA]} and ${arr[indexB]}`);
    row.children[indexA].classList.add('swap');
    row.children[indexB].classList.add('swap');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
