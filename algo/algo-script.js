// algo-script.js - Скрипт для визуализатора алгоритмов

document.addEventListener('DOMContentLoaded', function() {
    // Основные переменные
    let currentAlgorithm = 'bubble';
    let arraySize = 20;
    let animationSpeed = 5;
    let array = [];
    let isVisualizing = false;
    let isPaused = false;
    let visualizationStep = null;
    let currentStep = 0;
    let totalSteps = 0;
    let comparisons = 0;
    let swaps = 0;
    let startTime = 0;
    let timer = null;
    
    // Элементы DOM
    const algorithmTabs = document.getElementById('algorithmTabs');
    const arraySizeSlider = document.getElementById('arraySize');
    const arraySizeValue = document.getElementById('arraySizeValue');
    const animationSpeedSlider = document.getElementById('animationSpeed');
    const speedValue = document.getElementById('speedValue');
    const arrayVisualization = document.getElementById('arrayVisualization');
    const currentAlgorithmTitle = document.getElementById('currentAlgorithm');
    const comparisonCount = document.getElementById('comparisonCount');
    const swapCount = document.getElementById('swapCount');
    const timeElapsed = document.getElementById('timeElapsed');
    const pseudocode = document.getElementById('pseudocode');
    const codeHighlight = document.getElementById('codeHighlight');
    
    // Кнопки
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stepBtn = document.getElementById('stepBtn');
    const resetBtn = document.getElementById('resetBtn');
    const generateRandomBtn = document.getElementById('generateRandomBtn');
    const generateNearlySortedBtn = document.getElementById('generateNearlySortedBtn');
    const generateReverseBtn = document.getElementById('generateReverseBtn');
    const generateFewUniqueBtn = document.getElementById('generateFewUniqueBtn');
    const useCustomArrayBtn = document.getElementById('useCustomArrayBtn');
    const customArrayInput = document.getElementById('customArrayInput');
    const compareBtn = document.getElementById('compareBtn');
    const comparisonSection = document.getElementById('comparisonSection');
    const runComparisonBtn = document.getElementById('runComparisonBtn');
    const comparisonResults = document.getElementById('comparisonResults');
    const comparisonChart = document.getElementById('comparisonChart');
    const timeChart = document.getElementById('timeChart');
    
    // Инициализация
    init();

    function init() {
        generateRandomArray();
        updateArrayDisplay();
        updatePseudocode();
        setupEventListeners();
        updateStats();
    }

    function setupEventListeners() {
        // Выбор алгоритма
        algorithmTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('algo-tab') || e.target.closest('.algo-tab')) {
                const tab = e.target.classList.contains('algo-tab') ? e.target : e.target.closest('.algo-tab');
                const algorithm = tab.dataset.algorithm;
                
                document.querySelectorAll('.algo-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                currentAlgorithm = algorithm;
                updateAlgorithmTitle();
                updatePseudocode();
                resetVisualization();
            }
        });

        // Слайдеры
        arraySizeSlider.addEventListener('input', function() {
            arraySize = parseInt(this.value);
            arraySizeValue.textContent = arraySize;
            generateRandomArray();
            updateArrayDisplay();
            resetVisualization();
        });

        animationSpeedSlider.addEventListener('input', function() {
            animationSpeed = parseInt(this.value);
            speedValue.textContent = animationSpeed;
        });

        // Кнопки генерации данных
        generateRandomBtn.addEventListener('click', () => {
            generateRandomArray();
            updateArrayDisplay();
            resetVisualization();
        });

        generateNearlySortedBtn.addEventListener('click', () => {
            generateNearlySortedArray();
            updateArrayDisplay();
            resetVisualization();
        });

        generateReverseBtn.addEventListener('click', () => {
            generateReverseArray();
            updateArrayDisplay();
            resetVisualization();
        });

        generateFewUniqueBtn.addEventListener('click', () => {
            generateFewUniqueArray();
            updateArrayDisplay();
            resetVisualization();
        });

        useCustomArrayBtn.addEventListener('click', () => {
            useCustomArray();
        });

        customArrayInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                useCustomArray();
            }
        });

        // Управление визуализацией
        startBtn.addEventListener('click', startVisualization);
        pauseBtn.addEventListener('click', togglePause);
        stepBtn.addEventListener('click', stepVisualization);
        resetBtn.addEventListener('click', resetVisualization);
        compareBtn.addEventListener('click', toggleComparisonSection);
        runComparisonBtn.addEventListener('click', runComparison);

        // Таймер
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
    }

    // Генерация массивов
    function generateRandomArray() {
        array = [];
        for (let i = 0; i < arraySize; i++) {
            array.push(Math.floor(Math.random() * 100) + 1);
        }
    }

    function generateNearlySortedArray() {
        generateRandomArray();
        array.sort((a, b) => a - b);
        
        // Добавляем немного хаоса
        for (let i = 0; i < Math.floor(arraySize / 10); i++) {
            const idx1 = Math.floor(Math.random() * arraySize);
            const idx2 = Math.floor(Math.random() * arraySize);
            [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
    }

    function generateReverseArray() {
        array = [];
        for (let i = 0; i < arraySize; i++) {
            array.push(arraySize - i);
        }
        array = array.map(val => val * Math.floor(100 / arraySize));
    }

    function generateFewUniqueArray() {
        const uniqueValues = [1, 2, 3, 4, 5];
        array = [];
        for (let i = 0; i < arraySize; i++) {
            array.push(uniqueValues[Math.floor(Math.random() * uniqueValues.length)] * 10);
        }
    }

    function useCustomArray() {
        const input = customArrayInput.value.trim();
        if (!input) return;
        
        try {
            const newArray = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
            if (newArray.length > 0) {
                array = newArray;
                arraySize = array.length;
                arraySizeSlider.value = arraySize;
                arraySizeValue.textContent = arraySize;
                updateArrayDisplay();
                resetVisualization();
                customArrayInput.value = '';
            }
        } catch (error) {
            alert('Пожалуйста, введите числа через запятую (например: 5, 3, 8, 1, 9)');
        }
    }

    // Отображение массива
    function updateArrayDisplay() {
        arrayVisualization.innerHTML = '';
        const maxValue = Math.max(...array);
        
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.dataset.index = index;
            element.dataset.value = value;
            
            const height = (value / maxValue) * 250;
            element.style.height = `${height}px`;
            
            const valueLabel = document.createElement('div');
            valueLabel.className = 'value';
            valueLabel.textContent = value;
            
            element.appendChild(valueLabel);
            arrayVisualization.appendChild(element);
        });
    }

    function highlightElements(indices, className) {
        document.querySelectorAll('.array-element').forEach((el, idx) => {
            el.classList.remove('comparing', 'swapping', 'sorted', 'pivot', 'target');
            if (indices.includes(idx)) {
                el.classList.add(className);
            }
        });
    }

    // Алгоритмы сортировки
    async function bubbleSort() {
        const n = array.length;
        let sorted = false;
        
        for (let i = 0; i < n - 1 && !sorted; i++) {
            sorted = true;
            
            for (let j = 0; j < n - i - 1; j++) {
                if (!isVisualizing || isPaused) return;
                
                comparisons++;
                highlightElements([j, j + 1], 'comparing');
                updateStats();
                
                await delay();
                
                if (array[j] > array[j + 1]) {
                    swaps++;
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    
                    highlightElements([j, j + 1], 'swapping');
                    updateArrayDisplay();
                    updateStats();
                    
                    await delay();
                    sorted = false;
                }
            }
            
            highlightElements([n - i - 1], 'sorted');
        }
        
        // Отмечаем все элементы как отсортированные
        for (let i = 0; i < n; i++) {
            highlightElements([i], 'sorted');
            await delay(100);
        }
    }

    async function selectionSort() {
        const n = array.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            for (let j = i + 1; j < n; j++) {
                if (!isVisualizing || isPaused) return;
                
                comparisons++;
                highlightElements([minIdx, j], 'comparing');
                updateStats();
                
                await delay();
                
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            
            if (minIdx !== i) {
                swaps++;
                [array[i], array[minIdx]] = [array[minIdx], array[i]];
                
                highlightElements([i, minIdx], 'swapping');
                updateArrayDisplay();
                updateStats();
                
                await delay();
            }
            
            highlightElements([i], 'sorted');
        }
        
        highlightElements([n - 1], 'sorted');
    }

    async function insertionSort() {
        const n = array.length;
        
        for (let i = 1; i < n; i++) {
            const key = array[i];
            let j = i - 1;
            
            highlightElements([i], 'target');
            await delay();
            
            while (j >= 0 && array[j] > key) {
                if (!isVisualizing || isPaused) return;
                
                comparisons++;
                highlightElements([j], 'comparing');
                updateStats();
                
                await delay();
                
                array[j + 1] = array[j];
                swaps++;
                
                highlightElements([j, j + 1], 'swapping');
                updateArrayDisplay();
                updateStats();
                
                await delay();
                j--;
            }
            
            array[j + 1] = key;
            updateArrayDisplay();
            highlightElements([j + 1], 'sorted');
            
            await delay();
        }
        
        // Отмечаем все элементы как отсортированные
        for (let i = 0; i < n; i++) {
            highlightElements([i], 'sorted');
        }
    }

    async function quickSort(low = 0, high = array.length - 1) {
        if (low < high) {
            if (!isVisualizing || isPaused) return;
            
            const pivotIndex = await partition(low, high);
            await quickSort(low, pivotIndex - 1);
            await quickSort(pivotIndex + 1, high);
        } else if (low === high) {
            highlightElements([low], 'sorted');
        }
    }

    async function partition(low, high) {
        const pivot = array[high];
        let i = low - 1;
        
        highlightElements([high], 'pivot');
        
        for (let j = low; j < high; j++) {
            if (!isVisualizing || isPaused) return;
            
            comparisons++;
            highlightElements([j], 'comparing');
            updateStats();
            
            await delay();
            
            if (array[j] < pivot) {
                i++;
                
                if (i !== j) {
                    swaps++;
                    [array[i], array[j]] = [array[j], array[i]];
                    
                    highlightElements([i, j], 'swapping');
                    updateArrayDisplay();
                    updateStats();
                    
                    await delay();
                }
            }
        }
        
        swaps++;
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        
        highlightElements([i + 1, high], 'swapping');
        updateArrayDisplay();
        updateStats();
        
        await delay();
        
        highlightElements([i + 1], 'sorted');
        return i + 1;
    }

    async function mergeSort() {
        await mergeSortRecursive(0, array.length - 1);
    }

    async function mergeSortRecursive(left, right) {
        if (left < right) {
            if (!isVisualizing || isPaused) return;
            
            const mid = Math.floor((left + right) / 2);
            
            await mergeSortRecursive(left, mid);
            await mergeSortRecursive(mid + 1, right);
            await merge(left, mid, right);
        }
    }

    async function merge(left, mid, right) {
        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length) {
            if (!isVisualizing || isPaused) return;
            
            comparisons++;
            highlightElements([left + i, mid + 1 + j], 'comparing');
            updateStats();
            
            await delay();
            
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
                swaps++;
            }
            
            updateArrayDisplay();
            updateStats();
            
            await delay();
            k++;
        }
        
        while (i < leftArray.length) {
            array[k] = leftArray[i];
            i++;
            k++;
            updateArrayDisplay();
            await delay();
        }
        
        while (j < rightArray.length) {
            array[k] = rightArray[j];
            j++;
            k++;
            updateArrayDisplay();
            await delay();
        }
        
        // Отмечаем отсортированный сегмент
        for (let idx = left; idx <= right; idx++) {
            highlightElements([idx], 'sorted');
        }
    }

    async function linearSearch(target = Math.floor(Math.random() * 100) + 1) {
        highlightElements([], 'target');
        
        for (let i = 0; i < array.length; i++) {
            if (!isVisualizing || isPaused) return;
            
            comparisons++;
            highlightElements([i], 'comparing');
            updateStats();
            
            await delay();
            
            if (array[i] === target) {
                highlightElements([i], 'target');
                return i;
            }
        }
        
        return -1;
    }

    async function binarySearch(target = Math.floor(Math.random() * 100) + 1) {
        // Сначала сортируем массив
        const sortedArray = [...array].sort((a, b) => a - b);
        array = sortedArray;
        updateArrayDisplay();
        
        let left = 0;
        let right = array.length - 1;
        
        while (left <= right) {
            if (!isVisualizing || isPaused) return;
            
            const mid = Math.floor((left + right) / 2);
            
            comparisons++;
            highlightElements([mid], 'comparing');
            updateStats();
            
            await delay();
            
            if (array[mid] === target) {
                highlightElements([mid], 'target');
                return mid;
            } else if (array[mid] < target) {
                highlightElements([mid], 'comparing');
                left = mid + 1;
            } else {
                highlightElements([mid], 'comparing');
                right = mid - 1;
            }
            
            await delay();
        }
        
        return -1;
    }

    // Управление визуализацией
    function startVisualization() {
        if (isVisualizing) return;
        
        isVisualizing = true;
        isPaused = false;
        comparisons = 0;
        swaps = 0;
        currentStep = 0;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stepBtn.disabled = false;
        resetBtn.disabled = false;
        
        // Запускаем выбранный алгоритм
        switch (currentAlgorithm) {
            case 'bubble':
                visualizationStep = bubbleSort();
                break;
            case 'selection':
                visualizationStep = selectionSort();
                break;
            case 'insertion':
                visualizationStep = insertionSort();
                break;
            case 'quick':
                visualizationStep = quickSort();
                break;
            case 'merge':
                visualizationStep = mergeSort();
                break;
            case 'linear':
                visualizationStep = linearSearch();
                break;
            case 'binary':
                visualizationStep = binarySearch();
                break;
        }
        
        visualizationStep.then(() => {
            finishVisualization();
        }).catch(() => {
            finishVisualization();
        });
    }

    function togglePause() {
        if (!isVisualizing) return;
        
        isPaused = !isPaused;
        pauseBtn.innerHTML = isPaused ? 
            '<i class="fas fa-play"></i> Продолжить' : 
            '<i class="fas fa-pause"></i> Пауза';
        
        if (isPaused) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    async function stepVisualization() {
        // Реализация пошагового выполнения
        isPaused = true;
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Продолжить';
        
        // Для простоты - продолжаем на один шаг
        isPaused = false;
        await delay();
        isPaused = true;
    }

    function resetVisualization() {
        isVisualizing = false;
        isPaused = false;
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stepBtn.disabled = true;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
        
        comparisons = 0;
        swaps = 0;
        updateStats();
        highlightElements([], '');
    }

    function finishVisualization() {
        isVisualizing = false;
        isPaused = false;
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stepBtn.disabled = true;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
    }

    // Таймер
    function startTimer() {
        startTime = Date.now();
        timer = setInterval(updateTimer, 100);
    }

    function pauseTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function resetTimer() {
        pauseTimer();
        timeElapsed.textContent = '0 мс';
    }

    function updateTimer() {
        const elapsed = Date.now() - startTime;
        timeElapsed.textContent = `${elapsed} мс`;
    }

    // Вспомогательные функции
    function delay() {
        const speed = 1000 / animationSpeed;
        return new Promise(resolve => setTimeout(resolve, speed));
    }

    function updateAlgorithmTitle() {
        const algorithmNames = {
            'bubble': 'Пузырьковая сортировка',
            'selection': 'Сортировка выбором',
            'insertion': 'Сортировка вставками',
            'quick': 'Быстрая сортировка',
            'merge': 'Сортировка слиянием',
            'linear': 'Линейный поиск',
            'binary': 'Бинарный поиск'
        };
        
        currentAlgorithmTitle.textContent = algorithmNames[currentAlgorithm];
    }

    function updateStats() {
        comparisonCount.textContent = comparisons;
        swapCount.textContent = swaps;
    }

    function updatePseudocode() {
        const pseudocodes = {
            'bubble': `procedure bubbleSort(A: list)
    n = length(A)
    for i = 0 to n-1
        for j = 0 to n-i-2
            if A[j] > A[j+1]
                swap(A[j], A[j+1])
            end if
        end for
    end for
end procedure`,
            'selection': `procedure selectionSort(A: list)
    n = length(A)
    for i = 0 to n-2
        min = i
        for j = i+1 to n-1
            if A[j] < A[min]
                min = j
            end if
        end for
        swap(A[i], A[min])
    end for
end procedure`,
            'insertion': `procedure insertionSort(A: list)
    n = length(A)
    for i = 1 to n-1
        key = A[i]
        j = i-1
        while j >= 0 and A[j] > key
            A[j+1] = A[j]
            j = j-1
        end while
        A[j+1] = key
    end for
end procedure`,
            'quick': `procedure quickSort(A: list, low, high)
    if low < high
        pivot = partition(A, low, high)
        quickSort(A, low, pivot-1)
        quickSort(A, pivot+1, high)
    end if
end procedure

procedure partition(A: list, low, high)
    pivot = A[high]
    i = low-1
    for j = low to high-1
        if A[j] < pivot
            i = i+1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i+1], A[high])
    return i+1
end procedure`,
            'merge': `procedure mergeSort(A: list, left, right)
    if left < right
        mid = floor((left + right) / 2)
        mergeSort(A, left, mid)
        mergeSort(A, mid+1, right)
        merge(A, left, mid, right)
    end if
end procedure

procedure merge(A: list, left, mid, right)
    L = A[left..mid]
    R = A[mid+1..right]
    i = j = 0
    k = left
    
    while i < length(L) and j < length(R)
        if L[i] <= R[j]
            A[k] = L[i]
            i = i+1
        else
            A[k] = R[j]
            j = j+1
        end if
        k = k+1
    end while
    
    while i < length(L)
        A[k] = L[i]
        i = i+1
        k = k+1
    end while
    
    while j < length(R)
        A[k] = R[j]
        j = j+1
        k = k+1
    end while
end procedure`,
            'linear': `procedure linearSearch(A: list, target)
    for i = 0 to length(A)-1
        if A[i] == target
            return i
        end if
    end for
    return -1
end procedure`,
            'binary': `procedure binarySearch(A: list, target)
    left = 0
    right = length(A)-1
    
    while left <= right
        mid = floor((left + right) / 2)
        if A[mid] == target
            return mid
        else if A[mid] < target
            left = mid + 1
        else
            right = mid - 1
        end if
    end while
    return -1
end procedure`
        };
        
        pseudocode.textContent = pseudocodes[currentAlgorithm];
    }

    // Сравнение алгоритмов
    function toggleComparisonSection() {
        comparisonSection.style.display = 
            comparisonSection.style.display === 'none' ? 'block' : 'none';
    }

    async function runComparison() {
        const size = parseInt(document.getElementById('comparisonSize').value);
        const dataType = document.getElementById('comparisonDataType').value;
        
        // Генерируем тестовые данные
        let testArray;
        switch (dataType) {
            case 'random':
                testArray = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
                break;
            case 'nearlySorted':
                testArray = Array.from({length: size}, (_, i) => i + 1);
                // Перемешиваем несколько элементов
                for (let i = 0; i < size / 10; i++) {
                    const idx1 = Math.floor(Math.random() * size);
                    const idx2 = Math.floor(Math.random() * size);
                    [testArray[idx1], testArray[idx2]] = [testArray[idx2], testArray[idx1]];
                }
                break;
            case 'reverse':
                testArray = Array.from({length: size}, (_, i) => size - i);
                break;
            case 'fewUnique':
                const uniqueValues = [1, 2, 3, 4, 5];
                testArray = Array.from({length: size}, () => 
                    uniqueValues[Math.floor(Math.random() * uniqueValues.length)] * 10);
                break;
        }
        
        const algorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge'];
        const results = [];
        
        for (const algo of algorithms) {
            const arrayCopy = [...testArray];
            const result = await benchmarkAlgorithm(algo, arrayCopy);
            results.push(result);
        }
        
        displayComparisonResults(results);
        drawCharts(results);
    }

    async function benchmarkAlgorithm(algorithm, arr) {
        const start = performance.now();
        let comparisons = 0;
        let swaps = 0;
        
        // Создаем копию алгоритмов для бенчмарка
        const array = [...arr];
        
        switch (algorithm) {
            case 'bubble':
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        comparisons++;
                        if (array[j] > array[j + 1]) {
                            swaps++;
                            [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        }
                    }
                }
                break;
                
            case 'selection':
                for (let i = 0; i < array.length - 1; i++) {
                    let minIdx = i;
                    for (let j = i + 1; j < array.length; j++) {
                        comparisons++;
                        if (array[j] < array[minIdx]) {
                            minIdx = j;
                        }
                    }
                    if (minIdx !== i) {
                        swaps++;
                        [array[i], array[minIdx]] = [array[minIdx], array[i]];
                    }
                }
                break;
                
            case 'insertion':
                for (let i = 1; i < array.length; i++) {
                    const key = array[i];
                    let j = i - 1;
                    while (j >= 0 && array[j] > key) {
                        comparisons++;
                        swaps++;
                        array[j + 1] = array[j];
                        j--;
                    }
                    comparisons++; // Последнее сравнение
                    array[j + 1] = key;
                }
                break;
                
            case 'quick':
                const quickSort = (arr, low, high) => {
                    if (low < high) {
                        const pivotIndex = partition(arr, low, high);
                        quickSort(arr, low, pivotIndex - 1);
                        quickSort(arr, pivotIndex + 1, high);
                    }
                };
                
                const partition = (arr, low, high) => {
                    const pivot = arr[high];
                    let i = low - 1;
                    for (let j = low; j < high; j++) {
                        comparisons++;
                        if (arr[j] < pivot) {
                            i++;
                            swaps++;
                            [arr[i], arr[j]] = [arr[j], arr[i]];
                        }
                    }
                    swaps++;
                    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                    return i + 1;
                };
                
                quickSort(array, 0, array.length - 1);
                break;
                
            case 'merge':
                const mergeSort = (arr) => {
                    if (arr.length <= 1) return arr;
                    
                    const mid = Math.floor(arr.length / 2);
                    const left = mergeSort(arr.slice(0, mid));
                    const right = mergeSort(arr.slice(mid));
                    
                    return merge(left, right);
                };
                
                const merge = (left, right) => {
                    const result = [];
                    let i = 0, j = 0;
                    
                    while (i < left.length && j < right.length) {
                        comparisons++;
                        if (left[i] < right[j]) {
                            result.push(left[i]);
                            i++;
                        } else {
                            result.push(right[j]);
                            j++;
                            swaps++;
                        }
                    }
                    
                    return result.concat(left.slice(i)).concat(right.slice(j));
                };
                
                mergeSort(array);
                break;
        }
        
        const time = performance.now() - start;
        
        const algorithmNames = {
            'bubble': 'Пузырьковая',
            'selection': 'Выбором',
            'insertion': 'Вставками',
            'quick': 'Быстрая',
            'merge': 'Слиянием'
        };
        
        const complexities = {
            'bubble': 'O(n²)',
            'selection': 'O(n²)',
            'insertion': 'O(n²)',
            'quick': 'O(n log n)',
            'merge': 'O(n log n)'
        };
        
        return {
            name: algorithmNames[algorithm],
            algorithm,
            comparisons,
            swaps,
            time: Math.round(time),
            complexity: complexities[algorithm]
        };
    }

    function displayComparisonResults(results) {
        comparisonResults.innerHTML = '';
        
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${result.name}</strong></td>
                <td>${result.comparisons.toLocaleString()}</td>
                <td>${result.swaps.toLocaleString()}</td>
                <td>${result.time} мс</td>
                <td>${result.complexity}</td>
            `;
            comparisonResults.appendChild(row);
        });
    }

    function drawCharts(results) {
        // График сравнений
        comparisonChart.innerHTML = '';
        const maxComparisons = Math.max(...results.map(r => r.comparisons));
        
        results.forEach(result => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${(result.comparisons / maxComparisons) * 150}px`;
            bar.style.background = getAlgorithmColor(result.algorithm);
            
            const label = document.createElement('div');
            label.className = 'chart-bar-label';
            label.textContent = result.name;
            
            bar.appendChild(label);
            comparisonChart.appendChild(bar);
        });
        
        // График времени
        timeChart.innerHTML = '';
        const maxTime = Math.max(...results.map(r => r.time));
        
        results.forEach(result => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${(result.time / maxTime) * 150}px`;
            bar.style.background = getAlgorithmColor(result.algorithm);
            
            const label = document.createElement('div');
            label.className = 'chart-bar-label';
            label.textContent = result.name;
            
            bar.appendChild(label);
            timeChart.appendChild(bar);
        });
    }

    function getAlgorithmColor(algorithm) {
        const colors = {
            'bubble': '#6c63ff',
            'selection': '#36d1dc',
            'insertion': '#ff6584',
            'quick': '#9d4edd',
            'merge': '#4cc9f0'
        };
        return colors[algorithm] || '#6c63ff';
    }

    // Инициализация теста
    initTest();

    function initTest() {
        const testQuestions = [
            {
                question: "Какой алгоритм сортировки имеет сложность O(n²) в худшем случае?",
                options: [
                    "Быстрая сортировка",
                    "Сортировка слиянием",
                    "Пузырьковая сортировка",
                    "Сортировка подсчетом"
                ],
                correct: 2,
                algorithm: 'bubble'
            },
            {
                question: "Какой алгоритм использует подход 'разделяй и властвуй'?",
                options: [
                    "Сортировка вставками",
                    "Быстрая сортировка",
                    "Сортировка выбором",
                    "Пузырьковая сортировка"
                ],
                correct: 1,
                algorithm: 'quick'
            },
            {
                question: "Какой алгоритм наиболее эффективен для почти отсортированных массивов?",
                options: [
                    "Быстрая сортировка",
                    "Сортировка вставками",
                    "Сортировка слиянием",
                    "Сортировка выбором"
                ],
                correct: 1,
                algorithm: 'insertion'
            },
            {
                question: "Какой алгоритм находит минимальный элемент и ставит его в начало?",
                options: [
                    "Пузырьковая сортировка",
                    "Сортировка выбором",
                    "Сортировка вставками",
                    "Быстрая сортировка"
                ],
                correct: 1,
                algorithm: 'selection'
            },
            {
                question: "Какой алгоритм имеет временную сложность O(n log n) в среднем случае?",
                options: [
                    "Пузырьковая сортировка",
                    "Быстрая сортировка",
                    "Сортировка вставками",
                    "Сортировка выбором"
                ],
                correct: 1,
                algorithm: 'quick'
            }
        ];

        const testContent = document.getElementById('testContent');
        const startTestBtn = document.getElementById('startTestBtn');
        const nextQuestionBtn = document.getElementById('nextQuestionBtn');
        const resetTestBtn = document.getElementById('resetTestBtn');
        const questionCount = document.getElementById('questionCount');
        const correctCount = document.getElementById('correctCount');
        const scorePercentage = document.getElementById('scorePercentage');

        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];

        startTestBtn.addEventListener('click', startTest);
        nextQuestionBtn.addEventListener('click', nextQuestion);
        resetTestBtn.addEventListener('click', resetTest);

        function startTest() {
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            updateTestStats();
            showQuestion(currentQuestion);
            startTestBtn.disabled = true;
            nextQuestionBtn.disabled = false;
        }

        function showQuestion(index) {
            if (index >= testQuestions.length) {
                showResults();
                return;
            }

            const question = testQuestions[index];
            testContent.innerHTML = '';

            // Показываем анимацию алгоритма
            showAlgorithmAnimation(question.algorithm);

            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `
                <h4>Вопрос ${index + 1} из ${testQuestions.length}</h4>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <div class="option" data-index="${i}">
                            <div class="option-label">${String.fromCharCode(65 + i)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            testContent.appendChild(questionDiv);

            // Добавляем обработчики для вариантов ответа
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    userAnswers[index] = parseInt(this.dataset.index);
                });
            });
        }

        function showAlgorithmAnimation(algorithm) {
            // Здесь можно добавить мини-анимацию алгоритма
            const animationDiv = document.createElement('div');
            animationDiv.className = 'algorithm-animation';
            animationDiv.innerHTML = `
                <div class="animation-header">
                    <h5>Алгоритм: ${getAlgorithmName(algorithm)}</h5>
                </div>
                <div class="mini-visualization" id="miniVisualization">
                    <!-- Мини-визуализация будет здесь -->
                </div>
            `;

            testContent.appendChild(animationDiv);
            
            // Создаем мини-визуализацию
            createMiniVisualization(algorithm);
        }

        function getAlgorithmName(algo) {
            const names = {
                'bubble': 'Пузырьковая сортировка',
                'selection': 'Сортировка выбором',
                'insertion': 'Сортировка вставками',
                'quick': 'Быстрая сортировка',
                'merge': 'Сортировка слиянием'
            };
            return names[algo] || algo;
        }

        function createMiniVisualization(algorithm) {
            const miniVis = document.getElementById('miniVisualization');
            if (!miniVis) return;
            
            const smallArray = [5, 3, 8, 1, 2];
            miniVis.innerHTML = '';
            
            smallArray.forEach(value => {
                const element = document.createElement('div');
                element.className = 'mini-element';
                element.textContent = value;
                element.style.height = `${value * 10}px`;
                miniVis.appendChild(element);
            });
            
            // Простая анимация (для демонстрации)
            setTimeout(() => {
                const elements = miniVis.querySelectorAll('.mini-element');
                if (algorithm === 'bubble') {
                    // Простая анимация пузырьковой сортировки
                    elements[0].style.background = 'var(--warning)';
                    elements[1].style.background = 'var(--warning)';
                }
            }, 500);
        }

        function nextQuestion() {
            if (userAnswers[currentQuestion] === undefined) {
                alert('Пожалуйста, выберите ответ');
                return;
            }

            // Проверяем ответ
            const question = testQuestions[currentQuestion];
            const isCorrect = userAnswers[currentQuestion] === question.correct;
            
            if (isCorrect) {
                score++;
            }

            // Показываем правильный ответ
            const options = document.querySelectorAll('.option');
            options.forEach((option, i) => {
                if (i === question.correct) {
                    option.classList.add('correct');
                } else if (i === userAnswers[currentQuestion] && !isCorrect) {
                    option.classList.add('incorrect');
                }
                option.style.pointerEvents = 'none';
            });

            currentQuestion++;
            updateTestStats();

            if (currentQuestion >= testQuestions.length) {
                nextQuestionBtn.textContent = 'Показать результаты';
                nextQuestionBtn.addEventListener('click', showResults, { once: true });
            } else {
                setTimeout(() => {
                    showQuestion(currentQuestion);
                }, 2000);
            }
        }

        function showResults() {
            testContent.innerHTML = '';
            
            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'test-results';
            resultsDiv.innerHTML = `
                <div class="results-header">
                    <i class="fas fa-trophy" style="font-size: 3rem; color: var(--accent);"></i>
                    <h3>Тест завершен!</h3>
                </div>
                <div class="results-stats">
                    <div class="stat-result">
                        <div class="stat-value">${score} / ${testQuestions.length}</div>
                        <div class="stat-label">Правильных ответов</div>
                    </div>
                    <div class="stat-result">
                        <div class="stat-value">${Math.round((score / testQuestions.length) * 100)}%</div>
                        <div class="stat-label">Результат</div>
                    </div>
                </div>
                <div class="results-details">
                    <h4>Детализация:</h4>
                    ${testQuestions.map((q, i) => `
                        <div class="result-item ${userAnswers[i] === q.correct ? 'correct' : 'incorrect'}">
                            <span>Вопрос ${i + 1}:</span>
                            <span>${userAnswers[i] === q.correct ? '✓' : '✗'}</span>
                        </div>
                    `).join('')}
                </div>
            `;

            testContent.appendChild(resultsDiv);
            nextQuestionBtn.disabled = true;
            startTestBtn.disabled = false;
            startTestBtn.textContent = 'Пройти тест еще раз';
        }

        function resetTest() {
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            updateTestStats();
            
            testContent.innerHTML = `
                <div class="test-ready">
                    <div class="ready-icon">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h3>Готовы проверить знания?</h3>
                    <p>Тест состоит из ${testQuestions.length} вопросов по алгоритмам сортировки и поиска.</p>
                    <p>Вы сможете увидеть анимацию алгоритма перед каждым вопросом.</p>
                </div>
            `;
            
            startTestBtn.disabled = false;
            nextQuestionBtn.disabled = true;
            nextQuestionBtn.textContent = 'Следующий вопрос';
            startTestBtn.textContent = 'Начать тест';
        }

        function updateTestStats() {
            questionCount.textContent = testQuestions.length;
            correctCount.textContent = score;
            scorePercentage.textContent = testQuestions.length > 0 ? 
                `${Math.round((score / testQuestions.length) * 100)}%` : '0%';
        }
    }

    // Инициализация справочника
    initReference();

    // В функцию initReference добавьте динамическое создание разделов:

function initReference() {
    const referenceTabs = document.querySelectorAll('.ref-tab');
    const referenceContent = document.querySelector('.reference-content');
    
    // Создаем недостающие разделы
    createReferenceSections();
    
    referenceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const algo = this.dataset.algo;
            
            // Активируем вкладку
            referenceTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующий раздел
            document.querySelectorAll('.ref-section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.getElementById(`${algo}Ref`).classList.add('active');
        });
    });
}

function createReferenceSections() {
    const referenceContent = document.querySelector('.reference-content');
    
    // Проверяем, есть ли уже разделы
    if (document.getElementById('selectionRef')) return;
    
    // Данные для разделов
    const sectionsData = {
        selection: {
            title: 'Сортировка выбором',
            icon: 'fa-mouse-pointer',
            worst: 'O(n²)',
            average: 'O(n²)',
            best: 'O(n²)',
            space: 'O(1)',
            description: 'Простой алгоритм сортировки, который на каждом проходе находит минимальный элемент в неотсортированной части массива и помещает его в начало.',
            steps: [
                'Найти минимальный элемент в неотсортированной части',
                'Поменять его местами с первым элементом неотсортированной части',
                'Сдвинуть границу отсортированной части на один элемент',
                'Повторять до полной сортировки массива'
            ],
            pros: [
                'Простота реализации',
                'Минимальное количество перестановок (всего n-1)',
                'Не требует дополнительной памяти',
                'Устойчивая сортировка'
            ],
            cons: [
                'Всегда O(n²), даже для отсортированного массива',
                'Делает много сравнений',
                'Неэффективен для больших массивов'
            ]
        },
        insertion: {
            title: 'Сортировка вставками',
            icon: 'fa-arrow-right-to-bracket',
            worst: 'O(n²)',
            average: 'O(n²)',
            best: 'O(n)',
            space: 'O(1)',
            description: 'Алгоритм сортировки, который строит отсортированную последовательность постепенно, вставляя каждый новый элемент в правильную позицию.',
            steps: [
                'Начать со второго элемента массива',
                'Сравнить его с элементами в отсортированной части',
                'Сдвигать элементы отсортированной части, пока не найдется правильная позиция',
                'Вставить элемент в найденную позицию',
                'Повторять для всех элементов массива'
            ],
            pros: [
                'Эффективен для маленьких массивов',
                'Отлично работает с почти отсортированными массивами',
                'Устойчивая сортировка',
                'Адаптивный алгоритм'
            ],
            cons: [
                'Медленный для больших массивов',
                'Много сдвигов элементов',
                'Неэффективен для обратно отсортированных массивов'
            ]
        },
        quick: {
            title: 'Быстрая сортировка',
            icon: 'fa-bolt',
            worst: 'O(n²)',
            average: 'O(n log n)',
            best: 'O(n log n)',
            space: 'O(log n)',
            description: 'Эффективный алгоритм сортировки, использующий стратегию "разделяй и властвуй". Выбирает опорный элемент и разделяет массив на две части.',
            steps: [
                'Выбрать опорный элемент из массива',
                'Разделить массив на два подмассива: элементы меньше опорного и элементы больше опорного',
                'Рекурсивно применить алгоритм к двум подмассивам',
                'Объединить отсортированные подмассивы'
            ],
            pros: [
                'Очень быстрый в среднем случае',
                'Не требует дополнительной памяти (in-place)',
                'Хорошо работает с большими массивами',
                'Эффективно использует кэш процессора'
            ],
            cons: [
                'Худший случай O(n²) при неудачном выборе опорного',
                'Неустойчивая сортировка',
                'Рекурсивные вызовы могут переполнить стек'
            ]
        },
        merge: {
            title: 'Сортировка слиянием',
            icon: 'fa-code-branch',
            worst: 'O(n log n)',
            average: 'O(n log n)',
            best: 'O(n log n)',
            space: 'O(n)',
            description: 'Эффективный алгоритм сортировки, использующий стратегию "разделяй и властвуй". Рекурсивно делит массив на две части, сортирует их, а затем сливает обратно.',
            steps: [
                'Рекурсивно разделить массив на две половины',
                'Сортировать каждую половину рекурсивно',
                'Слить две отсортированные половины в один отсортированный массив',
                'Повторять до полной сортировки'
            ],
            pros: [
                'Гарантированная сложность O(n log n)',
                'Устойчивая сортировка',
                'Хорошо работает с связанными списками',
                'Предсказуемое время выполнения'
            ],
            cons: [
                'Требует дополнительной памяти O(n)',
                'Медленнее быстрой сортировки в среднем случае',
                'Рекурсивные вызовы'
            ]
        }
    };

    // Создаем разделы для каждого алгоритма
    for (const [algo, data] of Object.entries(sectionsData)) {
        const section = document.createElement('div');
        section.className = 'ref-section';
        section.id = `${algo}Ref`;
        
        section.innerHTML = `
            <div class="algorithm-info">
                <div class="info-header">
                    <h3><i class="fas ${data.icon}"></i> ${data.title}</h3>
                    <div class="complexity-badges">
                        <span class="badge worst">${data.worst}</span>
                        <span class="badge average">${data.average}</span>
                        <span class="badge best">${data.best}</span>
                        <span class="badge space">${data.space}</span>
                    </div>
                </div>
                
                <div class="info-content">
                    <div class="description">
                        <h4><i class="fas fa-info-circle"></i> Описание</h4>
                        <p>${data.description}</p>
                    </div>
                    
                    <div class="how-it-works">
                        <h4><i class="fas fa-cogs"></i> Как работает</h4>
                        <ol>
                            ${data.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="pros-cons">
                        <div class="pros">
                            <h4><i class="fas fa-thumbs-up"></i> Преимущества</h4>
                            <ul>
                                ${data.pros.map(pro => `<li>${pro}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="cons">
                            <h4><i class="fas fa-thumbs-down"></i> Недостатки</h4>
                            <ul>
                                ${data.cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        `;
        
        referenceContent.appendChild(section);
    }
     
    }

    console.log('%c🧮 Визуализатор алгоритмов загружен!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Используйте визуализатор для изучения алгоритмов сортировки и поиска', 'color: #36d1dc; font-size: 14px;');
});