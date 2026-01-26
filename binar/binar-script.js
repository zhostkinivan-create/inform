// binar-script.js - Скрипт для тренажёра бинарной арифметики

document.addEventListener('DOMContentLoaded', function() {
    // Основные переменные
    let currentLevel = 'basic';
    let currentOperation = 'conversion';
    let bitLength = 4;
    let numberType = 'unsigned';
    let currentTask = null;
    let userProgress = {
        completed: 0,
        correct: 0,
        level: 'Новичок',
        streak: 0,
        bestStreak: 0,
        totalTime: 0
    };
    let timerInterval = null;
    let startTime = null;
    let currentTestQuestion = 0;
    let testScore = 0;
    let testAnswers = [];
    let isTestActive = false;

    // Элементы DOM
    const levelCards = document.querySelectorAll('.level-card');
    const levelSelectBtns = document.querySelectorAll('.level-select-btn');
    const operationTypeSelect = document.getElementById('operationType');
    const bitLengthSelect = document.getElementById('bitLength');
    const numberTypeSelect = document.getElementById('numberType');
    const generateTaskBtn = document.getElementById('generateTaskBtn');
    const showHintBtn = document.getElementById('showHintBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    const binaryAnswerInput = document.getElementById('binaryAnswer');
    const decimalAnswerInput = document.getElementById('decimalAnswer');
    const hexAnswerInput = document.getElementById('hexAnswer');
    const checkAnswerBtn = document.getElementById('checkAnswerBtn');
    const skipTaskBtn = document.getElementById('skipTaskBtn');
    const startTestBtn = document.getElementById('startTestBtn');
    const nextTestQuestionBtn = document.getElementById('nextTestQuestionBtn');
    const finishTestBtn = document.getElementById('finishTestBtn');
    
    // Элементы отображения
    const binaryRepresentation = document.getElementById('binaryRepresentation');
    const taskFormula = document.getElementById('taskFormula');
    const resultDisplay = document.getElementById('resultDisplay');
    const explanationContent = document.getElementById('explanationContent');
    const completedCount = document.getElementById('completedCount');
    const correctCount = document.getElementById('correctCount');
    const userLevel = document.getElementById('userLevel');
    const progressFill = document.getElementById('progressFill');
    const timer = document.getElementById('timer');
    const taskDifficulty = document.getElementById('taskDifficulty');
    const currentTaskTitle = document.getElementById('currentTaskTitle');
    const referenceContent = document.getElementById('referenceContent');

    // Инициализация
    init();

    function init() {
        loadProgress();
        setupEventListeners();
        updateProgressDisplay();
        generateNewTask();
        setupReferenceTabs();
        setupTest();
        
        // Показываем первую задачу сразу
        displayTask();
    }

    function setupEventListeners() {
        // Выбор уровня
        levelSelectBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.level-card');
                const level = card.dataset.level;
                selectLevel(level);
            });
        });

        // Выбор уровня при клике на карточку
        levelCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('level-select-btn')) {
                    const level = this.dataset.level;
                    selectLevel(level);
                }
            });
        });

        // Изменение настроек
        operationTypeSelect.addEventListener('change', function() {
            currentOperation = this.value;
            generateNewTask();
        });

        bitLengthSelect.addEventListener('change', function() {
            bitLength = parseInt(this.value);
            generateNewTask();
        });

        numberTypeSelect.addEventListener('change', function() {
            numberType = this.value;
            generateNewTask();
        });

        // Кнопки управления
        generateTaskBtn.addEventListener('click', generateNewTask);
        showHintBtn.addEventListener('click', showHint);
        resetBtn.addEventListener('click', resetTask);
        resetProgressBtn.addEventListener('click', resetProgress);

        // Проверка ответа
        checkAnswerBtn.addEventListener('click', checkAnswer);
        skipTaskBtn.addEventListener('click', skipTask);

        // Ввод с клавиатуры
        [binaryAnswerInput, decimalAnswerInput, hexAnswerInput].forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') checkAnswer();
            });
        });

        // Тест
        startTestBtn.addEventListener('click', startTest);
        nextTestQuestionBtn.addEventListener('click', nextTestQuestion);
        finishTestBtn.addEventListener('click', finishTest);
    }

    function selectLevel(level) {
        currentLevel = level;
        
        // Обновляем активную карточку
        levelCards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.level === level) {
                card.classList.add('active');
            }
        });

        // Обновляем настройки в зависимости от уровня
        switch (level) {
            case 'basic':
                bitLengthSelect.value = '4';
                operationTypeSelect.value = 'conversion';
                numberTypeSelect.value = 'unsigned';
                break;
            case 'operations':
                bitLengthSelect.value = '8';
                operationTypeSelect.value = 'addition';
                numberTypeSelect.value = 'unsigned';
                break;
            case 'advanced':
                bitLengthSelect.value = '8';
                operationTypeSelect.value = 'addition';
                numberTypeSelect.value = 'signed';
                break;
        }

        // Применяем изменения
        bitLength = parseInt(bitLengthSelect.value);
        currentOperation = operationTypeSelect.value;
        numberType = numberTypeSelect.value;

        generateNewTask();
    }

    function generateNewTask() {
        // Останавливаем таймер
        stopTimer();
        
        // Сбрасываем поля ввода
        binaryAnswerInput.value = '';
        decimalAnswerInput.value = '';
        hexAnswerInput.value = '';
        
        // Скрываем результат
        resultDisplay.innerHTML = '';
        resultDisplay.style.display = 'none';
        
        // Генерируем задачу
        currentTask = generateTask();
        
        // Отображаем задачу
        displayTask();
        
        // Обновляем объяснение
        updateExplanation();
        
        // Запускаем таймер
        startTimer();
    }

    function generateTask() {
        const difficulty = getDifficulty();
        
        switch (currentOperation) {
            case 'conversion':
                return generateConversionTask(difficulty);
            case 'addition':
                return generateAdditionTask(difficulty);
            case 'subtraction':
                return generateSubtractionTask(difficulty);
            case 'multiplication':
                return generateMultiplicationTask(difficulty);
            case 'division':
                return generateDivisionTask(difficulty);
            case 'bitwise':
                return generateBitwiseTask(difficulty);
            default:
                return generateConversionTask(difficulty);
        }
    }

    function generateConversionTask(difficulty) {
        // Генерируем число в зависимости от сложности
        let maxValue;
        switch(difficulty) {
            case 'easy': maxValue = 15; break;
            case 'medium': maxValue = 255; break;
            case 'hard': maxValue = 4095; break;
        }
        
        const decimal = Math.floor(Math.random() * (maxValue + 1));
        const binary = decimal.toString(2).padStart(bitLength, '0');
        const hex = decimal.toString(16).toUpperCase().padStart(Math.ceil(bitLength / 4), '0');
        
        // Определяем тип задачи
        const taskTypes = ['binary-to-decimal', 'decimal-to-binary', 'binary-to-hex', 'hex-to-binary'];
        const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        
        let question, correctAnswer, formula;
        
        switch (taskType) {
            case 'binary-to-decimal':
                question = `Переведите двоичное число ${binary}₂ в десятичную систему`;
                correctAnswer = decimal.toString();
                formula = `${binary}₂ = ?₁₀`;
                break;
            case 'decimal-to-binary':
                question = `Переведите десятичное число ${decimal}₁₀ в двоичную систему`;
                correctAnswer = binary;
                formula = `${decimal}₁₀ = ?₂`;
                break;
            case 'binary-to-hex':
                question = `Переведите двоичное число ${binary}₂ в шестнадцатеричную систему`;
                correctAnswer = hex;
                formula = `${binary}₂ = ?₁₆`;
                break;
            case 'hex-to-binary':
                question = `Переведите шестнадцатеричное число ${hex}₁₆ в двоичную систему`;
                correctAnswer = binary;
                formula = `${hex}₁₆ = ?₂`;
                break;
        }
        
        return {
            type: 'conversion',
            question: question,
            formula: formula,
            numbers: { decimal, binary, hex },
            correctAnswer: {
                binary: binary,
                decimal: decimal.toString(),
                hex: hex
            },
            taskType: taskType,
            difficulty: difficulty
        };
    }

    function generateAdditionTask(difficulty) {
        let maxValue, num1, num2;
        
        switch(difficulty) {
            case 'easy':
                maxValue = 15;
                num1 = Math.floor(Math.random() * (maxValue + 1));
                num2 = Math.floor(Math.random() * (maxValue + 1));
                break;
            case 'medium':
                maxValue = 255;
                num1 = Math.floor(Math.random() * (maxValue + 1));
                num2 = Math.floor(Math.random() * (maxValue + 1));
                break;
            case 'hard':
                if (numberType === 'signed') {
                    const minValue = -Math.pow(2, bitLength - 1);
                    const maxSignedValue = Math.pow(2, bitLength - 1) - 1;
                    num1 = Math.floor(Math.random() * (maxSignedValue - minValue + 1)) + minValue;
                    num2 = Math.floor(Math.random() * (maxSignedValue - minValue + 1)) + minValue;
                } else {
                    maxValue = 1023;
                    num1 = Math.floor(Math.random() * (maxValue + 1));
                    num2 = Math.floor(Math.random() * (maxValue + 1));
                }
                break;
        }
        
        const result = num1 + num2;
        const binary1 = toBinary(num1, bitLength);
        const binary2 = toBinary(num2, bitLength);
        const binaryResult = toBinary(result, bitLength);
        const hex1 = toHex(num1);
        const hex2 = toHex(num2);
        const hexResult = toHex(result);
        
        return {
            type: 'addition',
            question: `Сложите два числа:`,
            formula: `${binary1}₂ + ${binary2}₂ = ?₂`,
            numbers: {
                num1: { decimal: num1, binary: binary1, hex: hex1 },
                num2: { decimal: num2, binary: binary2, hex: hex2 },
                result: { decimal: result, binary: binaryResult, hex: hexResult }
            },
            correctAnswer: {
                binary: binaryResult,
                decimal: result.toString(),
                hex: hexResult
            },
            difficulty: difficulty
        };
    }

    function generateSubtractionTask(difficulty) {
        let maxValue, num1, num2;
        
        switch(difficulty) {
            case 'easy':
                maxValue = 15;
                num1 = Math.floor(Math.random() * (maxValue + 1));
                num2 = Math.floor(Math.random() * (num1 + 1));
                break;
            case 'medium':
                maxValue = 255;
                num1 = Math.floor(Math.random() * (maxValue + 1));
                num2 = Math.floor(Math.random() * (num1 + 1));
                break;
            case 'hard':
                if (numberType === 'signed') {
                    const minValue = -Math.pow(2, bitLength - 1);
                    const maxSignedValue = Math.pow(2, bitLength - 1) - 1;
                    num1 = Math.floor(Math.random() * (maxSignedValue - minValue + 1)) + minValue;
                    num2 = Math.floor(Math.random() * (maxSignedValue - minValue + 1)) + minValue;
                } else {
                    maxValue = 1023;
                    num1 = Math.floor(Math.random() * (maxValue + 1));
                    num2 = Math.floor(Math.random() * (num1 + 1));
                }
                break;
        }
        
        const result = num1 - num2;
        const binary1 = toBinary(num1, bitLength);
        const binary2 = toBinary(num2, bitLength);
        const binaryResult = toBinary(result, bitLength);
        
        return {
            type: 'subtraction',
            question: `Вычтите из первого числа второе:`,
            formula: `${binary1}₂ - ${binary2}₂ = ?₂`,
            numbers: {
                num1: { decimal: num1, binary: binary1 },
                num2: { decimal: num2, binary: binary2 },
                result: { decimal: result, binary: binaryResult }
            },
            correctAnswer: {
                binary: binaryResult,
                decimal: result.toString()
            },
            difficulty: difficulty
        };
    }

    function generateMultiplicationTask(difficulty) {
        let maxMultiplier;
        
        switch(difficulty) {
            case 'easy': maxMultiplier = 7; break;
            case 'medium': maxMultiplier = 15; break;
            case 'hard': maxMultiplier = 31; break;
        }
        
        const num1 = Math.floor(Math.random() * maxMultiplier) + 1;
        const num2 = Math.floor(Math.random() * maxMultiplier) + 1;
        const result = num1 * num2;
        const binary1 = toBinary(num1, bitLength);
        const binary2 = toBinary(num2, bitLength);
        const binaryResult = toBinary(result, bitLength);
        
        return {
            type: 'multiplication',
            question: `Умножьте два числа:`,
            formula: `${binary1}₂ × ${binary2}₂ = ?₂`,
            numbers: {
                num1: { decimal: num1, binary: binary1 },
                num2: { decimal: num2, binary: binary2 },
                result: { decimal: result, binary: binaryResult }
            },
            correctAnswer: {
                binary: binaryResult,
                decimal: result.toString()
            },
            difficulty: difficulty
        };
    }

    function generateDivisionTask(difficulty) {
        let maxDivisor;
        
        switch(difficulty) {
            case 'easy': maxDivisor = 7; break;
            case 'medium': maxDivisor = 15; break;
            case 'hard': maxDivisor = 31; break;
        }
        
        const divisor = Math.floor(Math.random() * maxDivisor) + 1;
        const quotient = Math.floor(Math.random() * maxDivisor) + 1;
        const dividend = divisor * quotient;
        
        const binaryDividend = toBinary(dividend, bitLength);
        const binaryDivisor = toBinary(divisor, bitLength);
        const binaryQuotient = toBinary(quotient, bitLength);
        
        return {
            type: 'division',
            question: `Разделите первое число на второе:`,
            formula: `${binaryDividend}₂ ÷ ${binaryDivisor}₂ = ?₂`,
            numbers: {
                dividend: { decimal: dividend, binary: binaryDividend },
                divisor: { decimal: divisor, binary: binaryDivisor },
                quotient: { decimal: quotient, binary: binaryQuotient }
            },
            correctAnswer: {
                binary: binaryQuotient,
                decimal: quotient.toString()
            },
            difficulty: difficulty
        };
    }

    function generateBitwiseTask(difficulty) {
        let maxValue;
        
        switch(difficulty) {
            case 'easy': maxValue = 15; break;
            case 'medium': maxValue = 255; break;
            case 'hard': maxValue = 1023; break;
        }
        
        const num1 = Math.floor(Math.random() * (maxValue + 1));
        const num2 = Math.floor(Math.random() * (maxValue + 1));
        
        const operations = difficulty === 'easy' ? ['AND', 'OR'] : 
                          difficulty === 'medium' ? ['AND', 'OR', 'XOR'] : 
                          ['AND', 'OR', 'XOR', 'NOT', 'SHL', 'SHR'];
        
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let result, formula, question;
        const binary1 = toBinary(num1, bitLength);
        const binary2 = toBinary(num2, bitLength);
        
        switch (operation) {
            case 'AND':
                result = num1 & num2;
                formula = `${binary1}₂ & ${binary2}₂ = ?₂`;
                question = `Выполните побитовую операцию AND:`;
                break;
            case 'OR':
                result = num1 | num2;
                formula = `${binary1}₂ | ${binary2}₂ = ?₂`;
                question = `Выполните побитовую операцию OR:`;
                break;
            case 'XOR':
                result = num1 ^ num2;
                formula = `${binary1}₂ ^ ${binary2}₂ = ?₂`;
                question = `Выполните побитовую операцию XOR:`;
                break;
            case 'NOT':
                result = (~num1) & (Math.pow(2, bitLength) - 1);
                formula = `~${binary1}₂ = ?₂`;
                question = `Выполните побитовую операцию NOT:`;
                break;
            case 'SHL':
                const shift = Math.floor(Math.random() * 4) + 1;
                result = (num1 << shift) & (Math.pow(2, bitLength) - 1);
                formula = `${binary1}₂ << ${shift} = ?₂`;
                question = `Выполните сдвиг влево на ${shift} бит:`;
                break;
            case 'SHR':
                const shiftR = Math.floor(Math.random() * 4) + 1;
                result = num1 >> shiftR;
                formula = `${binary1}₂ >> ${shiftR} = ?₂`;
                question = `Выполните сдвиг вправо на ${shiftR} бит:`;
                break;
        }
        
        const binaryResult = toBinary(result, bitLength);
        
        return {
            type: 'bitwise',
            operation: operation,
            question: question,
            formula: formula,
            numbers: {
                num1: { decimal: num1, binary: binary1 },
                num2: operation !== 'NOT' ? { decimal: num2, binary: binary2 } : null,
                result: { decimal: result, binary: binaryResult }
            },
            correctAnswer: {
                binary: binaryResult,
                decimal: result.toString()
            },
            difficulty: difficulty
        };
    }

    function displayTask() {
        if (!currentTask) {
            generateNewTask();
            return;
        }
        
        // Обновляем заголовок
        const operationNames = {
            'conversion': 'Перевод чисел',
            'addition': 'Сложение',
            'subtraction': 'Вычитание',
            'multiplication': 'Умножение',
            'division': 'Деление',
            'bitwise': 'Побитовые операции'
        };
        
        currentTaskTitle.textContent = operationNames[currentTask.type] || currentTask.type;
        taskDifficulty.textContent = getDifficultyText(currentTask.difficulty);
        
        // Отображаем формулу
        taskFormula.textContent = currentTask.formula;
        taskFormula.style.opacity = '1';
        
        // Отображаем бинарное представление
        displayBinaryRepresentation();
        
        // Обновляем объяснение
        updateExplanation();
        
        // Показываем соответствующие поля ввода
        updateInputFields();
    }

    function displayBinaryRepresentation() {
        binaryRepresentation.innerHTML = '';
        
        if (currentTask.type === 'conversion') {
            const binary = currentTask.numbers.binary;
            const hex = currentTask.numbers.hex;
            const decimal = currentTask.numbers.decimal;
            
            if (currentTask.taskType === 'binary-to-decimal') {
                createBinaryVisualization(binary, 'Двоичное число для перевода');
            } else if (currentTask.taskType === 'decimal-to-binary') {
                createNumberDisplay(decimal.toString(), 'Десятичное число для перевода');
            } else if (currentTask.taskType === 'binary-to-hex') {
                createBinaryVisualization(binary, 'Двоичное число для перевода');
            } else if (currentTask.taskType === 'hex-to-binary') {
                createNumberDisplay(hex, 'Шестнадцатеричное число для перевода');
            }
            
        } else if (['addition', 'subtraction', 'multiplication', 'division'].includes(currentTask.type)) {
            const binary1 = currentTask.numbers.num1.binary;
            const binary2 = currentTask.numbers.num2.binary;
            
            createBinaryVisualization(binary1, 'Первое число');
            
            const operationSymbol = document.createElement('div');
            operationSymbol.className = 'operation-symbol';
            operationSymbol.textContent = getOperationSymbol(currentTask.type);
            binaryRepresentation.appendChild(operationSymbol);
            
            createBinaryVisualization(binary2, 'Второе число');
            
        } else if (currentTask.type === 'bitwise') {
            const binary1 = currentTask.numbers.num1.binary;
            
            if (currentTask.operation === 'NOT') {
                createBinaryVisualization(binary1, 'Исходное число');
                
                const operationSymbol = document.createElement('div');
                operationSymbol.className = 'operation-symbol';
                operationSymbol.textContent = '~';
                binaryRepresentation.appendChild(operationSymbol);
            } else {
                const binary2 = currentTask.numbers.num2.binary;
                createBinaryVisualization(binary1, 'Первое число');
                
                const operationSymbol = document.createElement('div');
                operationSymbol.className = 'operation-symbol';
                operationSymbol.textContent = getBitwiseSymbol(currentTask.operation);
                binaryRepresentation.appendChild(operationSymbol);
                
                createBinaryVisualization(binary2, 'Второе число');
            }
        }
    }

    function createBinaryVisualization(binary, label) {
        const container = document.createElement('div');
        container.className = 'binary-number-container';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'binary-label';
        labelEl.textContent = label;
        container.appendChild(labelEl);
        
        const numberContainer = document.createElement('div');
        numberContainer.className = 'binary-number';
        
        const indexContainer = document.createElement('div');
        indexContainer.className = 'bit-index';
        
        // Отображаем биты
        for (let i = 0; i < binary.length; i++) {
            const bit = binary[i];
            const bitCell = document.createElement('div');
            bitCell.className = `bit-cell bit-${bit}`;
            bitCell.textContent = bit;
            numberContainer.appendChild(bitCell);
            
            const indexLabel = document.createElement('div');
            indexLabel.className = 'index-label';
            indexLabel.textContent = binary.length - i - 1;
            indexContainer.appendChild(indexLabel);
        }
        
        container.appendChild(numberContainer);
        container.appendChild(indexContainer);
        binaryRepresentation.appendChild(container);
    }

    function createNumberDisplay(number, label) {
        const container = document.createElement('div');
        container.className = 'binary-number-container';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'binary-label';
        labelEl.textContent = label;
        container.appendChild(labelEl);
        
        const numberDisplay = document.createElement('div');
        numberDisplay.className = 'number-display';
        numberDisplay.textContent = number;
        numberDisplay.style.fontSize = '2rem';
        numberDisplay.style.color = 'var(--accent)';
        numberDisplay.style.fontFamily = "'Source Code Pro', monospace";
        numberDisplay.style.textAlign = 'center';
        numberDisplay.style.padding = '20px';
        
        container.appendChild(numberDisplay);
        binaryRepresentation.appendChild(container);
    }

    function updateInputFields() {
        // Скрываем все поля
        binaryAnswerInput.parentElement.style.display = 'none';
        decimalAnswerInput.parentElement.style.display = 'none';
        hexAnswerInput.parentElement.style.display = 'none';
        
        // Показываем нужные поля в зависимости от типа задачи
        if (currentTask.type === 'conversion') {
            if (currentTask.taskType === 'binary-to-decimal') {
                decimalAnswerInput.parentElement.style.display = 'flex';
            } else if (currentTask.taskType === 'decimal-to-binary') {
                binaryAnswerInput.parentElement.style.display = 'flex';
            } else if (currentTask.taskType === 'binary-to-hex') {
                hexAnswerInput.parentElement.style.display = 'flex';
            } else if (currentTask.taskType === 'hex-to-binary') {
                binaryAnswerInput.parentElement.style.display = 'flex';
            }
        } else {
            // Для арифметических операций показываем все поля
            binaryAnswerInput.parentElement.style.display = 'flex';
            decimalAnswerInput.parentElement.style.display = 'flex';
            if (currentTask.correctAnswer.hex) {
                hexAnswerInput.parentElement.style.display = 'flex';
            }
        }
        
        // Очищаем поля
        binaryAnswerInput.value = '';
        decimalAnswerInput.value = '';
        hexAnswerInput.value = '';
    }

    function updateExplanation() {
        let explanation = '';
        
        if (!currentTask) {
            explanation = '<p>Выберите задачу для получения объяснения.</p>';
        } else if (currentTask.type === 'conversion') {
            explanation = getConversionExplanation();
        } else if (currentTask.type === 'addition') {
            explanation = getAdditionExplanation();
        } else if (currentTask.type === 'subtraction') {
            explanation = getSubtractionExplanation();
        } else if (currentTask.type === 'multiplication') {
            explanation = getMultiplicationExplanation();
        } else if (currentTask.type === 'division') {
            explanation = getDivisionExplanation();
        } else if (currentTask.type === 'bitwise') {
            explanation = getBitwiseExplanation();
        }
        
        explanationContent.innerHTML = explanation;
    }

    function getConversionExplanation() {
        const { decimal, binary, hex } = currentTask.numbers;
        
        if (currentTask.taskType === 'binary-to-decimal') {
            const calculation = calculateBinaryToDecimal(binary);
            return `
                <h4>Как перевести из двоичной в десятичную систему:</h4>
                <p>Число <strong>${binary}₂</strong> состоит из ${binary.length} бит.</p>
                <p>Каждый бит представляет степень двойки:</p>
                <ul>
                    <li>Самый правый бит (младший) = 2⁰ = 1</li>
                    <li>Следующий бит = 2¹ = 2</li>
                    <li>И так далее до 2<sup>${binary.length-1}</sup></li>
                </ul>
                <p>Формула: сумма (бит × 2<sup>позиция</sup>)</p>
                <p><strong>${binary}₂ = ${calculation} = ${decimal}₁₀</strong></p>
            `;
        } else if (currentTask.taskType === 'decimal-to-binary') {
            return `
                <h4>Как перевести из десятичной в двоичную систему:</h4>
                <p>Используем метод последовательного деления на 2:</p>
                <ol>
                    <li>Делим число ${decimal} на 2, записываем остаток</li>
                    <li>Повторяем с целой частью до получения 0</li>
                    <li>Остатки читаем снизу вверх</li>
                </ol>
                <p><strong>${decimal}₁₀ = ${binary}₂</strong></p>
            `;
        } else if (currentTask.taskType === 'binary-to-hex') {
            return `
                <h4>Как перевести из двоичной в шестнадцатеричную систему:</h4>
                <p>Разбиваем двоичное число на группы по 4 бита:</p>
                <p><strong>${formatBinaryGroups(binary)}</strong></p>
                <p>Каждую группу переводим в шестнадцатеричную цифру:</p>
                <p><strong>${binary}₂ = ${hex}₁₆</strong></p>
            `;
        } else {
            return `
                <h4>Как перевести из шестнадцатеричной в двоичную систему:</h4>
                <p>Каждую шестнадцатеричную цифру переводим в 4 бита:</p>
                <p><strong>${hex}₁₆ = ${binary}₂</strong></p>
            `;
        }
    }

    function getAdditionExplanation() {
        const { num1, num2, result } = currentTask.numbers;
        
        return `
            <h4>Сложение двоичных чисел:</h4>
            <p>Правила сложения битов:</p>
            <ul>
                <li>0 + 0 = 0</li>
                <li>0 + 1 = 1</li>
                <li>1 + 0 = 1</li>
                <li>1 + 1 = 0, перенос 1</li>
                <li>1 + 1 + 1 = 1, перенос 1</li>
            </ul>
            <p><strong>Пример: ${num1.binary}₂ + ${num2.binary}₂ = ${result.binary}₂</strong></p>
            <p>Проверка: ${num1.decimal} + ${num2.decimal} = ${result.decimal}</p>
        `;
    }

    function getSubtractionExplanation() {
        const { num1, num2, result } = currentTask.numbers;
        
        return `
            <h4>Вычитание двоичных чисел:</h4>
            <p>Правила вычитания битов:</p>
            <ul>
                <li>0 - 0 = 0</li>
                <li>1 - 0 = 1</li>
                <li>1 - 1 = 0</li>
                <li>0 - 1 = 1, заём 1 (занимаем у старшего разряда)</li>
            </ul>
            <p><strong>Пример: ${num1.binary}₂ - ${num2.binary}₂ = ${result.binary}₂</strong></p>
            <p>Проверка: ${num1.decimal} - ${num2.decimal} = ${result.decimal}</p>
        `;
    }

    function getMultiplicationExplanation() {
        const { num1, num2, result } = currentTask.numbers;
        
        return `
            <h4>Умножение двоичных чисел:</h4>
            <p>Умножение в двоичной системе аналогично десятичной:</p>
            <ol>
                <li>Умножаем первое число на каждый бит второго числа</li>
                <li>Сдвигаем результаты влево в зависимости от позиции бита</li>
                <li>Складываем все частичные произведения</li>
            </ol>
            <p><strong>Пример: ${num1.binary}₂ × ${num2.binary}₂ = ${result.binary}₂</strong></p>
            <p>Проверка: ${num1.decimal} × ${num2.decimal} = ${result.decimal}</p>
        `;
    }

    function getDivisionExplanation() {
        const { dividend, divisor, quotient } = currentTask.numbers;
        
        return `
            <h4>Деление двоичных чисел:</h4>
            <p>Деление в двоичной системе:</p>
            <ol>
                <li>Берём столько старших бит делимого, сколько нужно для деления на делитель</li>
                <li>Если можно вычесть делитель, пишем 1 в частное и вычитаем</li>
                <li>Сносим следующий бит и повторяем</li>
            </ol>
            <p><strong>Пример: ${dividend.binary}₂ ÷ ${divisor.binary}₂ = ${quotient.binary}₂</strong></p>
            <p>Проверка: ${dividend.decimal} ÷ ${divisor.decimal} = ${quotient.decimal}</p>
        `;
    }

    function getBitwiseExplanation() {
        const { num1, num2, result } = currentTask.numbers;
        const operation = currentTask.operation;
        
        let explanation = `<h4>Побитовая операция ${operation}:</h4>`;
        
        switch(operation) {
            case 'AND':
                explanation += `
                    <p>Логическое И: результат 1 только если оба бита равны 1</p>
                    <p>Таблица истинности:</p>
                    <table class="example-table">
                        <tr><th>A</th><th>B</th><th>A & B</th></tr>
                        <tr><td>0</td><td>0</td><td>0</td></tr>
                        <tr><td>0</td><td>1</td><td>0</td></tr>
                        <tr><td>1</td><td>0</td><td>0</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td></tr>
                    </table>
                `;
                break;
            case 'OR':
                explanation += `
                    <p>Логическое ИЛИ: результат 1 если хотя бы один бит равен 1</p>
                    <p>Таблица истинности:</p>
                    <table class="example-table">
                        <tr><th>A</th><th>B</th><th>A | B</th></tr>
                        <tr><td>0</td><td>0</td><td>0</td></tr>
                        <tr><td>0</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>0</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>1</td></tr>
                    </table>
                `;
                break;
            case 'XOR':
                explanation += `
                    <p>Исключающее ИЛИ: результат 1 если биты разные</p>
                    <p>Таблица истинности:</p>
                    <table class="example-table">
                        <tr><th>A</th><th>B</th><th>A ^ B</th></tr>
                        <tr><td>0</td><td>0</td><td>0</td></tr>
                        <tr><td>0</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>0</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td><td>0</td></tr>
                    </table>
                `;
                break;
            case 'NOT':
                explanation += `
                    <p>Отрицание: инвертирует все биты (0 → 1, 1 → 0)</p>
                    <p>Таблица истинности:</p>
                    <table class="example-table">
                        <tr><th>A</th><th>~A</th></tr>
                        <tr><td>0</td><td>1</td></tr>
                        <tr><td>1</td><td>0</td></tr>
                    </table>
                `;
                break;
            case 'SHL':
                explanation += `<p>Сдвиг влево: сдвигает все биты влево, добавляя 0 справа</p>`;
                break;
            case 'SHR':
                explanation += `<p>Сдвиг вправо: сдвигает все биты вправо, отбрасывая младшие биты</p>`;
                break;
        }
        
        if (operation === 'NOT') {
            explanation += `<p><strong>Пример: ~${num1.binary}₂ = ${result.binary}₂</strong></p>`;
        } else {
            explanation += `<p><strong>Пример: ${num1.binary}₂ ${getBitwiseSymbol(operation)} ${num2.binary}₂ = ${result.binary}₂</strong></p>`;
        }
        
        return explanation;
    }

    function checkAnswer() {
        if (!currentTask) return;
        
        const userBinary = binaryAnswerInput.value.trim();
        const userDecimal = decimalAnswerInput.value.trim();
        const userHex = hexAnswerInput.value.trim().toUpperCase();
        
        let isCorrect = false;
        let correctAnswers = [];
        
        // Проверяем в зависимости от типа задачи
        if (currentTask.type === 'conversion') {
            if (currentTask.taskType === 'binary-to-decimal') {
                isCorrect = userDecimal === currentTask.correctAnswer.decimal;
                correctAnswers.push(`Десятичный ответ: ${currentTask.correctAnswer.decimal}`);
            } else if (currentTask.taskType === 'decimal-to-binary') {
                isCorrect = userBinary === currentTask.correctAnswer.binary;
                correctAnswers.push(`Двоичный ответ: ${currentTask.correctAnswer.binary}`);
            } else if (currentTask.taskType === 'binary-to-hex') {
                isCorrect = userHex === currentTask.correctAnswer.hex;
                correctAnswers.push(`Шестнадцатеричный ответ: ${currentTask.correctAnswer.hex}`);
            } else if (currentTask.taskType === 'hex-to-binary') {
                isCorrect = userBinary === currentTask.correctAnswer.binary;
                correctAnswers.push(`Двоичный ответ: ${currentTask.correctAnswer.binary}`);
            }
        } else {
            // Для арифметических операций проверяем соответствующие поля
            if (binaryAnswerInput.parentElement.style.display !== 'none') {
                isCorrect = userBinary === currentTask.correctAnswer.binary;
            }
            if (decimalAnswerInput.parentElement.style.display !== 'none') {
                isCorrect = isCorrect && userDecimal === currentTask.correctAnswer.decimal;
            }
            if (hexAnswerInput.parentElement.style.display !== 'none' && currentTask.correctAnswer.hex) {
                isCorrect = isCorrect && userHex === currentTask.correctAnswer.hex;
            }
            
            correctAnswers.push(`Двоичный ответ: ${currentTask.correctAnswer.binary}`);
            correctAnswers.push(`Десятичный ответ: ${currentTask.correctAnswer.decimal}`);
            if (currentTask.correctAnswer.hex) {
                correctAnswers.push(`Шестнадцатеричный ответ: ${currentTask.correctAnswer.hex}`);
            }
        }
        
        // Обновляем прогресс
        userProgress.completed++;
        if (isCorrect) {
            userProgress.correct++;
            userProgress.streak++;
            if (userProgress.streak > userProgress.bestStreak) {
                userProgress.bestStreak = userProgress.streak;
            }
        } else {
            userProgress.streak = 0;
        }
        
        // Обновляем уровень
        updateUserLevel();
        
        // Сохраняем прогресс
        saveProgress();
        updateProgressDisplay();
        
        // Отображаем результат
        displayResult(isCorrect, correctAnswers);
        
        // Автоматически генерируем новую задачу через 3 секунды
        if (isCorrect) {
            setTimeout(generateNewTask, 3000);
        }
    }

    function displayResult(isCorrect, correctAnswers) {
        resultDisplay.style.display = 'block';
        
        if (isCorrect) {
            resultDisplay.innerHTML = `
                <div class="result-correct">
                    <i class="fas fa-check-circle"></i>
                    Правильно! Отличная работа!
                </div>
                <div class="result-explanation">
                    <p>Серия правильных ответов: ${userProgress.streak}</p>
                    <p>Новая задача через 3 секунды...</p>
                </div>
            `;
            resultDisplay.style.background = 'rgba(76, 201, 240, 0.1)';
            resultDisplay.style.border = '2px solid var(--success)';
        } else {
            resultDisplay.innerHTML = `
                <div class="result-incorrect">
                    <i class="fas fa-times-circle"></i>
                    Неправильно. Правильные ответы:
                </div>
                <div class="result-explanation">
                    ${correctAnswers.map(answer => `<p>${answer}</p>`).join('')}
                    <p>Попробуйте ещё раз!</p>
                </div>
            `;
            resultDisplay.style.background = 'rgba(255, 77, 109, 0.1)';
            resultDisplay.style.border = '2px solid var(--danger)';
        }
    }

    function skipTask() {
        userProgress.completed++;
        saveProgress();
        updateProgressDisplay();
        generateNewTask();
    }

    function showHint() {
        if (!currentTask) return;
        
        let hint = '';
        
        switch (currentTask.type) {
            case 'conversion':
                hint = getConversionHint();
                break;
            case 'addition':
                hint = 'Начните сложение с младших битов (справа), не забывайте про переносы. Если сумма двух битов равна 2 (1+1), пишем 0 и переносим 1 в следующий разряд.';
                break;
            case 'subtraction':
                hint = 'Используйте метод вычитания столбиком. Если нужно вычесть 1 из 0, занимаем 1 из следующего разряда (это становится 2 в текущем разряде).';
                break;
            case 'bitwise':
                hint = getBitwiseHint();
                break;
            default:
                hint = 'Попробуйте решить задачу пошагово, начиная с младших разрядов.';
        }
        
        resultDisplay.style.display = 'block';
        resultDisplay.innerHTML = `
            <div class="hint-box">
                <h4><i class="fas fa-lightbulb"></i> Подсказка</h4>
                <p>${hint}</p>
            </div>
        `;
    }

    function getConversionHint() {
        if (currentTask.taskType === 'binary-to-decimal') {
            const binary = currentTask.numbers.binary;
            const steps = [];
            for (let i = 0; i < binary.length; i++) {
                const bit = binary[binary.length - 1 - i];
                if (bit === '1') {
                    steps.push(`${bit} × 2<sup>${i}</sup> = ${Math.pow(2, i)}`);
                }
            }
            return `Каждый бит представляет степень двойки. Суммируйте значения там, где стоит 1: ${steps.join(' + ')}`;
        } else if (currentTask.taskType === 'decimal-to-binary') {
            return `Делите число ${currentTask.numbers.decimal} на 2 и записывайте остатки. Остатки, прочитанные снизу вверх, дадут двоичное представление.`;
        } else if (currentTask.taskType === 'binary-to-hex') {
            return `Разбейте двоичное число на группы по 4 бита (начиная справа). Каждую группу переведите в шестнадцатеричную цифру (0-9, A-F).`;
        } else {
            return `Каждую шестнадцатеричную цифру замените на 4 бита согласно таблице: 0=0000, 1=0001, ..., F=1111.`;
        }
    }

    function getBitwiseHint() {
        const op = currentTask.operation;
        switch (op) {
            case 'AND': return 'AND: результат 1 только если ОБА бита равны 1. Иначе результат 0.';
            case 'OR': return 'OR: результат 1 если ХОТЯ БЫ ОДИН бит равен 1. Только 0|0 дает 0.';
            case 'XOR': return 'XOR: результат 1 если биты РАЗНЫЕ (0^1 или 1^0). Если биты одинаковые, результат 0.';
            case 'NOT': return 'NOT: просто инвертируйте все биты (0→1, 1→0).';
            case 'SHL': return 'SHL: сдвиньте все биты влево, добавьте нужное количество нулей справа.';
            case 'SHR': return 'SHR: сдвиньте все биты вправо, отбросьте нужное количество битов справа.';
            default: return 'Проверьте таблицу истинности для этой операции.';
        }
    }

    function resetTask() {
        binaryAnswerInput.value = '';
        decimalAnswerInput.value = '';
        hexAnswerInput.value = '';
        resultDisplay.innerHTML = '';
        resultDisplay.style.display = 'none';
        stopTimer();
        startTimer();
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function updateTimer() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Вспомогательные функции
    function toBinary(number, bits) {
        if (number < 0 && numberType === 'signed') {
            // Дополнительный код для отрицательных чисел
            const positive = Math.pow(2, bits) + number;
            return positive.toString(2).padStart(bits, '0');
        }
        return (number >>> 0).toString(2).padStart(bits, '0');
    }

    function toHex(number) {
        return (number >>> 0).toString(16).toUpperCase();
    }

    function calculateBinaryToDecimal(binary) {
        let result = '';
        let sum = 0;
        const parts = [];
        
        for (let i = 0; i < binary.length; i++) {
            const bit = binary[binary.length - 1 - i];
            if (bit === '1') {
                const value = Math.pow(2, i);
                parts.push(`${value}`);
                sum += value;
            }
        }
        
        return parts.join(' + ') + ' = ' + sum;
    }

    function formatBinaryGroups(binary) {
        const groups = [];
        for (let i = binary.length; i > 0; i -= 4) {
            const start = Math.max(0, i - 4);
            groups.unshift(binary.slice(start, i));
        }
        return groups.join(' ');
    }

    function getOperationSymbol(type) {
        const symbols = {
            'addition': '+',
            'subtraction': '−',
            'multiplication': '×',
            'division': '÷'
        };
        return symbols[type] || '';
    }

    function getBitwiseSymbol(operation) {
        const symbols = {
            'AND': '&',
            'OR': '|',
            'XOR': '^',
            'NOT': '~',
            'SHL': '<<',
            'SHR': '>>'
        };
        return symbols[operation] || operation;
    }

    function getDifficulty() {
        if (bitLength <= 4) return 'easy';
        if (bitLength <= 8) return 'medium';
        return 'hard';
    }

    function getDifficultyText(difficulty) {
        const texts = {
            'easy': 'Легкая',
            'medium': 'Средняя',
            'hard': 'Сложная'
        };
        return texts[difficulty] || difficulty;
    }

    function updateUserLevel() {
        if (userProgress.completed < 10) {
            userProgress.level = 'Новичок';
        } else if (userProgress.completed < 30) {
            userProgress.level = 'Ученик';
        } else if (userProgress.completed < 50) {
            userProgress.level = 'Знаток';
        } else if (userProgress.completed < 100) {
            userProgress.level = 'Эксперт';
        } else {
            userProgress.level = 'Мастер';
        }
        
        userLevel.textContent = userProgress.level;
    }

    function updateProgressDisplay() {
        completedCount.textContent = userProgress.completed;
        
        const accuracy = userProgress.completed > 0 
            ? Math.round((userProgress.correct / userProgress.completed) * 100)
            : 0;
        correctCount.textContent = `${accuracy}%`;
        
        userLevel.textContent = userProgress.level;
        
        const progressPercent = Math.min(100, (userProgress.completed % 100));
        progressFill.style.width = `${progressPercent}%`;
    }

    function saveProgress() {
        localStorage.setItem('binarProgress', JSON.stringify(userProgress));
    }

    function loadProgress() {
        const saved = localStorage.getItem('binarProgress');
        if (saved) {
            userProgress = JSON.parse(saved);
        }
    }

    function resetProgress() {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
            userProgress = {
                completed: 0,
                correct: 0,
                level: 'Новичок',
                streak: 0,
                bestStreak: 0,
                totalTime: 0
            };
            saveProgress();
            updateProgressDisplay();
            generateNewTask();
        }
    }

    // Справочник
    function setupReferenceTabs() {
        const tabs = document.querySelectorAll('.ref-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Активируем вкладку
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Показываем соответствующий раздел
                showReferenceSection(tabId);
            });
        });
        
        // Показываем первый раздел
        if (tabs[0]) {
            showReferenceSection(tabs[0].dataset.tab);
        }
    }

    function showReferenceSection(tabId) {
        let content = '';
        
        switch(tabId) {
            case 'basics':
                content = getBasicsReference();
                break;
            case 'conversion':
                content = getConversionReference();
                break;
            case 'operations':
                content = getOperationsReference();
                break;
            case 'signed':
                content = getSignedReference();
                break;
            case 'float':
                content = getFloatReference();
                break;
        }
        
        referenceContent.innerHTML = content;
    }

    function getBasicsReference() {
        return `
            <div class="ref-section active">
                <div class="ref-content">
                    <h3><i class="fas fa-info-circle"></i> Основы двоичной системы</h3>
                    <p>Двоичная система счисления — система с основанием 2. Использует только две цифры: 0 и 1.</p>
                    
                    <h4>Ключевые понятия:</h4>
                    <ul>
                        <li><strong>Бит</strong> — минимальная единица информации (0 или 1)</li>
                        <li><strong>Байт</strong> — 8 бит</li>
                        <li><strong>Разрядность</strong> — количество бит для представления числа</li>
                        <li><strong>Младший бит (LSB)</strong> — правый бит, наименьший вес</li>
                        <li><strong>Старший бит (MSB)</strong> — левый бит, наибольший вес</li>
                    </ul>
                    
                    <h4>Таблица соответствия (4-битные числа):</h4>
                    <table class="example-table">
                        <tr>
                            <th>Двоичное</th>
                            <th>Десятичное</th>
                            <th>Шестнадцатеричное</th>
                        </tr>
                        <tr><td>0000</td><td>0</td><td>0</td></tr>
                        <tr><td>0001</td><td>1</td><td>1</td></tr>
                        <tr><td>0010</td><td>2</td><td>2</td></tr>
                        <tr><td>0011</td><td>3</td><td>3</td></tr>
                        <tr><td>0100</td><td>4</td><td>4</td></tr>
                        <tr><td>0101</td><td>5</td><td>5</td></tr>
                        <tr><td>0110</td><td>6</td><td>6</td></tr>
                        <tr><td>0111</td><td>7</td><td>7</td></tr>
                        <tr><td>1000</td><td>8</td><td>8</td></tr>
                        <tr><td>1001</td><td>9</td><td>9</td></tr>
                        <tr><td>1010</td><td>10</td><td>A</td></tr>
                        <tr><td>1011</td><td>11</td><td>B</td></tr>
                        <tr><td>1100</td><td>12</td><td>C</td></tr>
                        <tr><td>1101</td><td>13</td><td>D</td></tr>
                        <tr><td>1110</td><td>14</td><td>E</td></tr>
                        <tr><td>1111</td><td>15</td><td>F</td></tr>
                    </table>
                </div>
            </div>
        `;
    }

    function getConversionReference() {
        return `
            <div class="ref-section active">
                <div class="ref-content">
                    <h3><i class="fas fa-exchange-alt"></i> Перевод между системами счисления</h3>
                    
                    <h4>1. Из двоичной в десятичную:</h4>
                    <p>Умножаем каждый бит на соответствующую степень двойки и суммируем:</p>
                    <pre><code>1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰
      = 8 + 0 + 2 + 1
      = 11₁₀</code></pre>
                    
                    <h4>2. Из десятичной в двоичную (деление на 2):</h4>
                    <pre><code>11₁₀ → 11 ÷ 2 = 5 (остаток 1)
     5 ÷ 2 = 2 (остаток 1)
     2 ÷ 2 = 1 (остаток 0)
     1 ÷ 2 = 0 (остаток 1)
     
     Читаем остатки снизу вверх: 1011₂</code></pre>
                    
                    <h4>3. Из двоичной в шестнадцатеричную:</h4>
                    <p>Разбиваем на группы по 4 бита (справа налево):</p>
                    <pre><code>1101 0110₂
   D    6₁₆
Результат: D6₁₆</code></pre>
                    
                    <h4>4. Таблица перевода в hex:</h4>
                    <table class="example-table">
                        <tr><th>Двоичное</th><th>Hex</th><th>Двоичное</th><th>Hex</th></tr>
                        <tr><td>0000</td><td>0</td><td>1000</td><td>8</td></tr>
                        <tr><td>0001</td><td>1</td><td>1001</td><td>9</td></tr>
                        <tr><td>0010</td><td>2</td><td>1010</td><td>A</td></tr>
                        <tr><td>0011</td><td>3</td><td>1011</td><td>B</td></tr>
                        <tr><td>0100</td><td>4</td><td>1100</td><td>C</td></tr>
                        <tr><td>0101</td><td>5</td><td>1101</td><td>D</td></tr>
                        <tr><td>0110</td><td>6</td><td>1110</td><td>E</td></tr>
                        <tr><td>0111</td><td>7</td><td>1111</td><td>F</td></tr>
                    </table>
                </div>
            </div>
        `;
    }

    function getOperationsReference() {
        return `
            <div class="ref-section active">
                <div class="ref-content">
                    <h3><i class="fas fa-calculator"></i> Арифметические операции</h3>
                    
                    <h4>Сложение:</h4>
                    <pre><code>  1011₂  (11₁₀)
+  0110₂  (6₁₀)
  -----
  10001₂  (17₁₀)

Правила:
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 0, перенос 1
1 + 1 + 1 = 1, перенос 1</code></pre>
                    
                    <h4>Вычитание:</h4>
                    <pre><code>  1011₂  (11₁₀)
-  0110₂  (6₁₀)
  -----
  0101₂  (5₁₀)

Правила:
0 - 0 = 0
1 - 0 = 1
1 - 1 = 0
0 - 1 = 1, заём 1</code></pre>
                    
                    <h4>Умножение:</h4>
                    <pre><code>  1011₂  (11₁₀)
×  0011₂  (3₁₀)
  -----
  1011
 1011
 -----
100001₂  (33₁₀)

Умножаем как в десятичной системе,
но таблица умножения проще:
0 × 0 = 0
0 × 1 = 0
1 × 0 = 0
1 × 1 = 1</code></pre>
                    
                    <h4>Деление:</h4>
                    <pre><code>  1101₂  (13₁₀)
÷  0011₂  (3₁₀)
  -----
  0100₂  (4₁₀) остаток 1

Аналогично делению в столбик,
используя вычитание.</code></pre>
                </div>
            </div>
        `;
    }

    function getSignedReference() {
        return `
            <div class="ref-section active">
                <div class="ref-content">
                    <h3><i class="fas fa-plus-minus"></i> Числа со знаком</h3>
                    
                    <h4>Представление отрицательных чисел:</h4>
                    <p>Используется дополнительный код (two's complement).</p>
                    
                    <h4>Как получить дополнительный код:</h4>
                    <ol>
                        <li>Записываем число в прямом коде</li>
                        <li>Инвертируем все биты (получаем обратный код)</li>
                        <li>Добавляем 1 к результату</li>
                    </ol>
                    
                    <h4>Пример (-5 в 8-битном представлении):</h4>
                    <pre><code>5 в прямом коде:   00000101
Инверсия:          11111010  (обратный код)
Добавляем 1:       11111011  (дополнительный код)

-5 в дополнительном коде: 11111011₂</code></pre>
                    
                    <h4>Преимущества дополнительного кода:</h4>
                    <ul>
                        <li>Один ноль (00000000)</li>
                        <li>Простое сложение для вычитания</li>
                        <li>Диапазон симметричен относительно нуля</li>
                    </ul>
                    
                    <h4>Диапазоны для n-битных чисел:</h4>
                    <table class="example-table">
                        <tr>
                            <th>Разрядность</th>
                            <th>Беззнаковые</th>
                            <th>Со знаком</th>
                        </tr>
                        <tr><td>4 бита</td><td>0..15</td><td>-8..7</td></tr>
                        <tr><td>8 бит</td><td>0..255</td><td>-128..127</td></tr>
                        <tr><td>16 бит</td><td>0..65535</td><td>-32768..32767</td></tr>
                        <tr><td>32 бита</td><td>0..4.3×10⁹</td><td>-2.1×10⁹..2.1×10⁹</td></tr>
                    </table>
                </div>
            </div>
        `;
    }

    function getFloatReference() {
        return `
            <div class="ref-section active">
                <div class="ref-content">
                    <h3><i class="fas fa-water"></i> Числа с плавающей точкой</h3>
                    <p>Используются для представления вещественных чисел по стандарту IEEE 754.</p>
                    
                    <h4>32-битное представление (single precision):</h4>
                    <ul>
                        <li><strong>1 бит</strong> — знак (0 = положительное, 1 = отрицательное)</li>
                        <li><strong>8 бит</strong> — экспонента (со смещением 127)</li>
                        <li><strong>23 бита</strong> — мантисса (дробная часть)</li>
                    </ul>
                    
                    <div style="background: rgba(108, 99, 255, 0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <div style="display: flex; justify-content: space-between; font-family: 'Source Code Pro', monospace;">
                            <div>S</div>
                            <div>E<sub>7</sub>E<sub>6</sub>E<sub>5</sub>E<sub>4</sub>E<sub>3</sub>E<sub>2</sub>E<sub>1</sub>E<sub>0</sub></div>
                            <div>M<sub>22</sub>M<sub>21</sub>...M<sub>1</sub>M<sub>0</sub></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-top: 5px;">
                            <div>Знак</div>
                            <div>Экспонента (8 бит)</div>
                            <div>Мантисса (23 бита)</div>
                        </div>
                    </div>
                    
                    <h4>Формула:</h4>
                    <p>Число = (-1)<sup>S</sup> × (1 + M) × 2<sup>E-127</sup></p>
                    <p>где M = m<sub>22</sub>×2<sup>-1</sup> + m<sub>21</sub>×2<sup>-2</sup> + ... + m<sub>0</sub>×2<sup>-23</sup></p>
                    
                    <h4>Пример (3.14):</h4>
                    <pre><code>3.14₁₀ = 11.0010001111010111...₂
Нормализуем: 1.10010001111010111... × 2¹
Знак: 0 (положительное)
Экспонента: 1 + 127 = 128₁₀ = 10000000₂
Мантисса: 10010001111010111000011 (первые 23 бита)

Результат: 0 10000000 10010001111010111000011</code></pre>
                    
                    <h4>Специальные значения:</h4>
                    <ul>
                        <li><strong>Ноль:</strong> S=0, E=0, M=0 (или S=1 для -0)</li>
                        <li><strong>Бесконечность:</strong> E=255, M=0</li>
                        <li><strong>NaN (Not a Number):</strong> E=255, M≠0</li>
                        <li><strong>Денормализованные:</strong> E=0, M≠0</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // Тест
    function setupTest() {
        window.testQuestions = [
            {
                question: "Переведите двоичное число 1010₂ в десятичную систему:",
                options: ["8", "10", "12", "15"],
                correct: 1,
                explanation: "1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10₁₀"
            },
            {
                question: "Каков результат сложения 1101₂ + 0110₂?",
                options: ["10011₂", "10111₂", "10001₂", "1111₂"],
                correct: 0,
                explanation: "1101₂ (13) + 0110₂ (6) = 10011₂ (19)"
            },
            {
                question: "Что такое дополнительный код?",
                options: [
                    "Способ представления отрицательных чисел",
                    "Метод увеличения точности",
                    "Алгоритм шифрования",
                    "Формат хранения текста"
                ],
                correct: 0,
                explanation: "Дополнительный код используется для представления отрицательных чисел в двоичной системе"
            },
            {
                question: "Результат побитовой операции 1011₂ & 1100₂:",
                options: ["1011₂", "1100₂", "1000₂", "1111₂"],
                correct: 2,
                explanation: "1011 & 1100 = 1000 (логическое И: 1&1=1, 0&1=0, 1&0=0, 1&0=0)"
            },
            {
                question: "Сколько бит в байте?",
                options: ["4", "8", "16", "32"],
                correct: 1,
                explanation: "1 байт = 8 бит"
            },
            {
                question: "Число 11111111₂ в десятичной системе:",
                options: ["255", "256", "127", "128"],
                correct: 0,
                explanation: "11111111₂ = 2⁸ - 1 = 256 - 1 = 255"
            },
            {
                question: "Результат сдвига 1100₂ >> 2:",
                options: ["0011₂", "0110₂", "1100₂", "1111₂"],
                correct: 0,
                explanation: "1100₂ >> 2 = 0011₂ (сдвиг вправо на 2 бита)"
            },
            {
                question: "Число -10 в 8-битном дополнительном коде:",
                options: ["11110110₂", "11110101₂", "00001010₂", "10001010₂"],
                correct: 0,
                explanation: "10 = 00001010₂, инверсия = 11110101, +1 = 11110110₂"
            },
            {
                question: "Результат умножения 101₂ × 11₂:",
                options: ["1111₂", "1001₂", "1110₂", "1011₂"],
                correct: 0,
                explanation: "101₂ (5) × 11₂ (3) = 1111₂ (15)"
            },
            {
                question: "Шестнадцатеричное число A5₁₆ в двоичной системе:",
                options: ["10100101₂", "11000101₂", "10101010₂", "10101101₂"],
                correct: 0,
                explanation: "A = 1010₂, 5 = 0101₂, поэтому A5₁₆ = 10100101₂"
            }
        ];
    }

    function startTest() {
        isTestActive = true;
        currentTestQuestion = 0;
        testScore = 0;
        testAnswers = [];
        
        startTestBtn.disabled = true;
        nextTestQuestionBtn.disabled = false;
        finishTestBtn.disabled = false;
        
        showTestQuestion();
    }

    function showTestQuestion() {
        const testContent = document.getElementById('testContent');
        
        if (currentTestQuestion >= window.testQuestions.length) {
            showTestResults();
            return;
        }
        
        const question = window.testQuestions[currentTestQuestion];
        
        testContent.innerHTML = `
            <div class="question">
                <h4>Вопрос ${currentTestQuestion + 1} из ${window.testQuestions.length}</h4>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <div class="option" data-index="${i}">
                            <div class="option-label">${String.fromCharCode(65 + i)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Добавляем обработчики для вариантов
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                testAnswers[currentTestQuestion] = parseInt(this.dataset.index);
            });
        });
    }

    function nextTestQuestion() {
        if (testAnswers[currentTestQuestion] === undefined) {
            alert('Пожалуйста, выберите ответ');
            return;
        }
        
        const question = window.testQuestions[currentTestQuestion];
        const isCorrect = testAnswers[currentTestQuestion] === question.correct;
        
        if (isCorrect) {
            testScore++;
        }
        
        // Показываем правильный ответ
        const options = document.querySelectorAll('.option');
        options.forEach((option, i) => {
            if (i === question.correct) {
                option.classList.add('correct');
            } else if (i === testAnswers[currentTestQuestion] && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        currentTestQuestion++;
        
        if (currentTestQuestion >= window.testQuestions.length) {
            nextTestQuestionBtn.textContent = 'Показать результаты';
            nextTestQuestionBtn.addEventListener('click', showTestResults, { once: true });
        } else {
            setTimeout(() => {
                showTestQuestion();
            }, 2000);
        }
    }

    function showTestResults() {
        isTestActive = false;
        const testContent = document.getElementById('testContent');
        const percentage = Math.round((testScore / window.testQuestions.length) * 100);
        
        let resultText = '';
        if (percentage >= 90) resultText = 'Отлично! Вы мастер бинарной арифметики!';
        else if (percentage >= 70) resultText = 'Хорошо! Вы хорошо разбираетесь в теме.';
        else if (percentage >= 50) resultText = 'Неплохо! Есть что повторить.';
        else resultText = 'Попробуйте ещё раз после тренировки.';
        
        testContent.innerHTML = `
            <div class="test-results">
                <div class="results-header">
                    <i class="fas fa-trophy" style="font-size: 3rem; color: var(--accent);"></i>
                    <h3>Тест завершен!</h3>
                    <p>${resultText}</p>
                </div>
                <div class="results-stats">
                    <div class="stat-result">
                        <div class="stat-value">${testScore} / ${window.testQuestions.length}</div>
                        <div class="stat-label">Правильных ответов</div>
                    </div>
                    <div class="stat-result">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Результат</div>
                    </div>
                </div>
                <div class="results-details">
                    <h4>Детализация:</h4>
                    ${window.testQuestions.map((q, i) => `
                        <div class="result-item ${testAnswers[i] === q.correct ? 'correct' : 'incorrect'}">
                            <span>Вопрос ${i + 1}: ${testAnswers[i] === q.correct ? '✓' : '✗'}</span>
                            ${testAnswers[i] !== q.correct ? `<span style="color: var(--accent); font-size: 0.9rem;">Правильно: ${q.options[q.correct]}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        startTestBtn.disabled = false;
        nextTestQuestionBtn.disabled = true;
        finishTestBtn.disabled = true;
        startTestBtn.textContent = 'Пройти тест еще раз';
        nextTestQuestionBtn.textContent = 'Следующий вопрос';
    }

    function finishTest() {
        showTestResults();
    }

    // Консольное сообщение
    console.log('%c🧮 Тренажёр бинарной арифметики загружен!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Учите двоичную систему с удовольствием!', 'color: #36d1dc; font-size: 14px;');
});