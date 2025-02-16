let array = [];
let speed = 100;  // Default speed for animations

// Generate an array with random values
function generateArray(size = 50) {
  array = [];
  const arrayContainer = document.getElementById('array-container');
  arrayContainer.innerHTML = '';  // Clear previous bars

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
    
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${array[i] * 3}px`;  // Fixed template literal
    arrayContainer.appendChild(bar);
  }
}

// Set speed for sorting animation
function setSpeed(newSpeed) {
  speed = newSpeed;
}

// Toggle dark mode theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const heading = document.querySelector('h1');
  heading.classList.toggle('dark-mode-heading');
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
      
      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
      }
      
      bars[j].style.backgroundColor = 'teal';
      bars[j + 1].style.backgroundColor = 'teal';
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[i].style.backgroundColor = 'red';

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    
    await swap(i, minIndex);
    bars[i].style.backgroundColor = 'teal';
  }
}

// Quick Sort
async function quickSort(left, right) {
  if (left < right) {
    let pivotIndex = await partition(left, right);
    await Promise.all([
      quickSort(left, pivotIndex - 1),
      quickSort(pivotIndex + 1, right)
    ]);
  }
}

async function partition(left, right) {
  const pivot = array[right];
  const bars = document.getElementsByClassName('bar');
  bars[right].style.backgroundColor = 'yellow';  // Highlight pivot
  
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    bars[j].style.backgroundColor = 'red';

    if (array[j] < pivot) {
      i++;
      bars[i].style.backgroundColor = 'red';
      await swap(i, j);
      bars[i].style.backgroundColor = 'teal';
    }
    bars[j].style.backgroundColor = 'teal';
  }

  await swap(i + 1, right);
  bars[right].style.backgroundColor = 'teal';
  bars[i + 1].style.backgroundColor = 'green';  // Sorted pivot
  
  return i + 1;
}

// Merge Sort
async function mergeSort(l, r) {
  if (l >= r) return;
  const mid = Math.floor((l + r) / 2);
  await mergeSort(l, mid);
  await mergeSort(mid + 1, r);
  await merge(l, mid, r);
}

async function merge(l, mid, r) {
  const bars = document.getElementsByClassName('bar');
  let leftArr = array.slice(l, mid + 1);
  let rightArr = array.slice(mid + 1, r + 1);
  let i = l, j = 0, k = 0;

  while (j < leftArr.length && k < rightArr.length) {
    if (leftArr[j] <= rightArr[k]) {
      array[i] = leftArr[j];
      bars[i].style.height = `${array[i] * 3}px`;
      j++;
    } else {
      array[i] = rightArr[k];
      bars[i].style.height = `${array[i] * 3}px`;
      k++;
    }
    i++;
    await sleep(speed);
  }

  while (j < leftArr.length) {
    array[i] = leftArr[j];
    bars[i].style.height = `${array[i] * 3}px`;
    i++; j++;
    await sleep(speed);
  }

  while (k < rightArr.length) {
    array[i] = rightArr[k];
    bars[i].style.height = `${array[i] * 3}px`;
    i++; k++;
    await sleep(speed);
  }
}

// Swap function
async function swap(i, j) {
  return new Promise(resolve => {
    setTimeout(() => {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      const bars = document.getElementsByClassName('bar');
      bars[i].style.height = `${array[i] * 3}px`;  // Fixed template literal
      bars[j].style.height = `${array[j] * 3}px`;

      resolve();
    }, speed);
  });
}

// Sleep function for delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Display sorting algorithm info
function displayAlgorithmInfo(algorithm) {
  const infoPanel = document.getElementById('info-panel');
  let infoText = '';

  switch (algorithm) {
    case 'Bubble Sort':
      infoText = `<strong>Bubble Sort</strong><br>Time: O(n²)<br>Space: O(1)<br>Compares adjacent elements & swaps if needed.`;
      break;
    case 'Merge Sort':
      infoText = `<strong>Merge Sort</strong><br>Time: O(n log n)<br>Space: O(n)<br>Divides & merges sorted subarrays.`;
      break;
    case 'Quick Sort':
      infoText = `<strong>Quick Sort</strong><br>Time: O(n log n)<br>Space: O(log n)<br>Pivots & partitions array recursively.`;
      break;
    case 'Selection Sort':
      infoText = `<strong>Selection Sort</strong><br>Time: O(n²)<br>Space: O(1)<br>Finds min/max & swaps sequentially.`;
      break;
    default:
      infoText = `Select an algorithm to see details.`;
  }

  infoPanel.innerHTML = infoText;
}

// Initialize with a default array
window.onload = () => generateArray();
