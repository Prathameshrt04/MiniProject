// Predefined lists
const lists = {
    sorted: Array.from({ length: 1000 }, (_, i) => i + 1).join(", "),
    reverseSorted: Array.from({ length: 1000 }, (_, i) => 1000 - i).join(", "),
    nearlySorted: Array.from({ length: 1000 }, (_, i) => (i % 50 === 0 ? i + 5 : i + 1)).join(", "),
    random: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000 + 1)).join(", ")
};

// Function to copy predefined list
function copyList(type) {
    const list = lists[type];
    navigator.clipboard.writeText(list).then(() => {
        alert(`${type.replace(/([A-Z])/g, ' $1')} list copied to clipboard.`);
    });
}

document.getElementById('compare-button').addEventListener('click', function () {
    const input = document.getElementById('compare-numbers').value;
    const numbers = input.split(',').map(Number);

    const mergeTime = measureCPUTime(mergeSort, numbers.slice());
    const quickTime = measureCPUTime(quickSort, numbers.slice());

    document.getElementById('merge-time').textContent = `CPU Time: ${mergeTime} ms`;
    document.getElementById('quick-time').textContent = `CPU Time: ${quickTime} ms`;
});

// Measure CPU time for a given sorting algorithm
function measureCPUTime(sortFunction, arr) {
    const start = performance.now();
    sortFunction(arr);
    const end = performance.now();
    return (end - start).toFixed(2);
}

// Merge Sort Algorithm
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Quick Sort Algorithm
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return (i + 1);
}
