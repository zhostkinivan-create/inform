// Калькулятор систем счисления

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const inputValue = document.getElementById('inputValue');
    const inputSystem = document.getElementById('inputSystem');
    const convertBtn = document.getElementById('convertBtn');
    
    const resultBinary = document.getElementById('resultBinary');
    const resultOctal = document.getElementById('resultOctal');
    const resultDecimal = document.getElementById('resultDecimal');
    const resultHexadecimal = document.getElementById('resultHexadecimal');
    const bitElements = document.querySelectorAll('.bit');
    
    const operand1 = document.getElementById('operand1');
    const operand2 = document.getElementById('operand2');
    const opSystem1 = document.getElementById('opSystem1');
    const opSystem2 = document.getElementById('opSystem2');
    const operator = document.getElementById('operator');
    const calculateBtn = document.getElementById('calculateBtn');
    const operationResult = document.getElementById('operationResult');
    const operationDetails = document.getElementById('operationDetails');
    
    const conversionTable = document.getElementById('conversionTable');
    const tableRange = document.getElementById('tableRange');
    const rangeValue = document.getElementById('rangeValue');
    const generateTableBtn = document.getElementById('generateTableBtn');
    
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const saveHistoryBtn = document.getElementById('saveHistoryBtn');
    
    let history = JSON.parse(localStorage.getItem('numSystemsHistory')) || [];
    
    // Инициализация
    init();
    
    function init() {
        // Генерация таблицы
        generateConversionTable(0, 15);
        
        // Загрузка истории
        updateHistoryDisplay();
        
        // Обработчики событий
        convertBtn.addEventListener('click', handleConversion);
        inputValue.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleConversion();
        });
        
        calculateBtn.addEventListener('click', handleCalculation);
        
        operand1.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleCalculation();
        });
        
        operand2.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleCalculation();
        });
        
        // Обновление диапазона таблицы
        tableRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            rangeValue.textContent = `0-${value}`;
        });
        
        generateTableBtn.addEventListener('click', function() {
            generateConversionTable(0, parseInt(tableRange.value));
        });
        
        clearHistoryBtn.addEventListener('click', clearHistory);
        saveHistoryBtn.addEventListener('click', saveHistory);
        
        // Автоматическая проверка ввода
        inputValue.addEventListener('input', validateInput);
        operand1.addEventListener('input', validateOperandInput);
        operand2.addEventListener('input', validateOperandInput);
    }
    
    // Валидация ввода
    function validateInput() {
        const value = inputValue.value.trim();
        const system = parseInt(inputSystem.value);
        const hint = document.getElementById('inputHint');
        
        if (value === '') {
            hint.textContent = 'Введите число в любой системе';
            hint.style.color = 'rgba(255, 255, 255, 0.6)';
            return;
        }
        
        if (isValidNumber(value, system)) {
            hint.textContent = '✓ Корректный ввод';
            hint.style.color = '#4cc9f0';
        } else {
            hint.textContent = '⚠ Некорректный ввод для выбранной системы';
            hint.style.color = '#ff6584';
        }
    }
    
    function validateOperandInput(e) {
        const input = e.target;
        const system = input.id === 'operand1' ? parseInt(opSystem1.value) : parseInt(opSystem2.value);
        const value = input.value.trim();
        
        if (value && !isValidNumber(value, system)) {
            input.style.borderColor = '#ff6584';
        } else {
            input.style.borderColor = 'rgba(108, 99, 255, 0.3)';
        }
    }
    
    function isValidNumber(value, system) {
        const validChars = {
            2: /^[01]+(\.[01]+)?$/,
            8: /^[0-7]+(\.[0-7]+)?$/,
            10: /^-?[0-9]+(\.[0-9]+)?$/,
            16: /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/
        };
        
        if (!validChars[system]) return false;
        
        // Проверка целых чисел
        if (!value.includes('.')) {
            return validChars[system].test(value);
        }
        
        // Для дробных чисел
        const parts = value.split('.');
        if (parts.length !== 2) return false;
        
        return validChars[system].test(parts[0]) && validChars[system].test(parts[1]);
    }
    
    // Преобразование чисел
    function handleConversion() {
        const input = inputValue.value.trim();
        const fromSystem = parseInt(inputSystem.value);
        
        if (!input || !isValidNumber(input, fromSystem)) {
            alert('Пожалуйста, введите корректное число для выбранной системы счисления');
            return;
        }
        
        let decimalValue;
        
        // Обработка дробных чисел
        if (input.includes('.')) {
            const parts = input.split('.');
            const integerPart = parseInt(parts[0], fromSystem);
            const fractionalPart = convertFractionalPart(parts[1], fromSystem);
            decimalValue = integerPart + fractionalPart;
        } else {
            decimalValue = parseInt(input, fromSystem);
        }
        
        if (isNaN(decimalValue)) {
            alert('Ошибка преобразования. Проверьте корректность ввода.');
            return;
        }
        
        // Обновление результатов
        updateConversionResults(decimalValue);
        
        // Добавление в историю
        addToHistory({
            type: 'conversion',
            input: input,
            fromSystem: fromSystem,
            decimal: decimalValue,
            timestamp: new Date().toLocaleTimeString()
        });
    }
    
    function convertFractionalPart(fractional, fromSystem) {
        let result = 0;
        for (let i = 0; i < fractional.length; i++) {
            const digit = parseInt(fractional[i], fromSystem);
            result += digit / Math.pow(fromSystem, i + 1);
        }
        return result;
    }
    
    function updateConversionResults(decimal) {
        // Преобразование в разные системы
        const binary = decimal.toString(2);
        const octal = decimal.toString(8);
        const decimalStr = decimal.toString(10);
        const hexadecimal = decimal.toString(16).toUpperCase();
        
        // Обновление отображения
        resultBinary.textContent = binary;
        resultOctal.textContent = octal;
        resultDecimal.textContent = decimalStr;
        resultHexadecimal.textContent = hexadecimal;
        
        // Подсветка битов
        updateBitDisplay(binary);
    }
    
    function updateBitDisplay(binary) {
        const bits = binary.padStart(8, '0').split('');
        
        bitElements.forEach((bit, index) => {
            const bitIndex = 7 - index;
            const bitValue = bits[bitIndex] || '0';
            
            bit.textContent = bitValue;
            bit.classList.toggle('active', bitValue === '1');
        });
    }
    
    // Арифметические операции
    function handleCalculation() {
        const num1Str = operand1.value.trim();
        const num2Str = operand2.value.trim();
        const system1 = parseInt(opSystem1.value);
        const system2 = parseInt(opSystem2.value);
        const op = operator.value;
        
        if (!num1Str || !num2Str || !isValidNumber(num1Str, system1) || !isValidNumber(num2Str, system2)) {
            alert('Пожалуйста, введите корректные числа для операции');
            return;
        }
        
        const num1 = parseInt(num1Str, system1);
        const num2 = parseInt(num2Str, system2);
        
        if (isNaN(num1) || isNaN(num2)) {
            alert('Ошибка преобразования чисел');
            return;
        }
        
        let result;
        let details = '';
        
        try {
            switch (op) {
                case '+':
                    result = num1 + num2;
                    details = `${num1Str} (${num1}₁₀) + ${num2Str} (${num2}₁₀)`;
                    break;
                case '-':
                    result = num1 - num2;
                    details = `${num1Str} (${num1}₁₀) - ${num2Str} (${num2}₁₀)`;
                    break;
                case '*':
                    result = num1 * num2;
                    details = `${num1Str} (${num1}₁₀) × ${num2Str} (${num2}₁₀)`;
                    break;
                case '/':
                    if (num2 === 0) throw new Error('Деление на ноль');
                    result = Math.floor(num1 / num2);
                    details = `${num1Str} (${num1}₁₀) ÷ ${num2Str} (${num2}₁₀)`;
                    break;
                case '&':
                    result = num1 & num2;
                    details = `Побитовое AND: ${num1.toString(2)} & ${num2.toString(2)}`;
                    break;
                case '|':
                    result = num1 | num2;
                    details = `Побитовое OR: ${num1.toString(2)} | ${num2.toString(2)}`;
                    break;
                case '^':
                    result = num1 ^ num2;
                    details = `Побитовое XOR: ${num1.toString(2)} ^ ${num2.toString(2)}`;
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }
            
            // Отображение результата в разных системах
            const resultStr = 
                `Двоичное: ${result.toString(2)}₂\n` +
                `Восьмеричное: ${result.toString(8)}₈\n` +
                `Десятичное: ${result.toString(10)}₁₀\n` +
                `Шестнадцатеричное: ${result.toString(16).toUpperCase()}₁₆`;
            
            operationResult.textContent = result.toString(10);
            operationDetails.textContent = details + '\n' + resultStr;
            
            // Добавление в историю
            addToHistory({
                type: 'operation',
                expression: `${num1Str} (${system1}) ${op} ${num2Str} (${system2})`,
                result: result.toString(10),
                timestamp: new Date().toLocaleTimeString()
            });
            
        } catch (error) {
            operationResult.textContent = 'Ошибка';
            operationDetails.textContent = error.message;
        }
    }
    
    // Таблица соответствий
    function generateConversionTable(start, end) {
        conversionTable.innerHTML = '';
        
        for (let i = start; i <= end; i++) {
            const row = document.createElement('tr');
            
            const decimal = i;
            const binary = decimal.toString(2);
            const octal = decimal.toString(8);
            const hex = decimal.toString(16).toUpperCase();
            const ascii = i >= 32 && i <= 126 ? String.fromCharCode(i) : '·';
            
            row.innerHTML = `
                <td>${decimal}</td>
                <td>${binary}</td>
                <td>${octal}</td>
                <td>${hex}</td>
                <td>${ascii}</td>
            `;
            
            conversionTable.appendChild(row);
        }
    }
    
    // История вычислений
    function addToHistory(item) {
        history.unshift(item);
        if (history.length > 20) history.pop();
        
        localStorage.setItem('numSystemsHistory', JSON.stringify(history));
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-clock"></i>
                    <p>Здесь будет отображаться история ваших вычислений</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = '';
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            if (item.type === 'conversion') {
                historyItem.innerHTML = `
                    <div class="history-expression">
                        ${item.input}<sub>${item.fromSystem}</sub> → ${item.decimal}<sub>10</sub>
                    </div>
                    <div class="history-result">
                        Двоичное: ${item.decimal.toString(2)}₂ | 
                        Восьмеричное: ${item.decimal.toString(8)}₈ | 
                        Шестнадцатеричное: ${item.decimal.toString(16).toUpperCase()}₁₆
                    </div>
                    <div class="history-time">${item.timestamp}</div>
                `;
            } else {
                historyItem.innerHTML = `
                    <div class="history-expression">
                        ${item.expression} = ${item.result}
                    </div>
                    <div class="history-time">${item.timestamp}</div>
                `;
            }
            
            historyList.appendChild(historyItem);
        });
    }
    
    function clearHistory() {
        if (confirm('Очистить всю историю вычислений?')) {
            history = [];
            localStorage.removeItem('numSystemsHistory');
            updateHistoryDisplay();
        }
    }
    
    function saveHistory() {
        const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'история_систем_счисления.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }
    
    // Вспомогательные функции
    function formatNumber(num, system) {
        return num.toString(system).toUpperCase();
    }
    
    // Примеры для демонстрации
    function showExample() {
        inputValue.value = '255';
        inputSystem.value = '10';
        handleConversion();
        
        operand1.value = '1010';
        opSystem1.value = '2';
        operand2.value = '1101';
        opSystem2.value = '2';
        operator.value = '+';
    }
    
    // Демонстрационный пример (можно убрать в финальной версии)
    setTimeout(showExample, 1000);
    
    // Консольное сообщение
    console.log('%c🔢 Калькулятор систем счисления загружен!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Попробуйте: 255 в десятичной → преобразовать', 'color: #36d1dc; font-size: 14px;');
});