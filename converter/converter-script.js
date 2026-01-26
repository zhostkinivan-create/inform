// Конвертер единиц измерения с тестом

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const categoryTabs = document.querySelectorAll('.category-tab');
    const conversionPanel = document.getElementById('conversionPanel');
    const quickButtons = document.getElementById('quickButtons');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const exportHistoryBtn = document.getElementById('exportHistoryBtn');
    
    // Элементы теста
    const testContent = document.getElementById('testContent');
    const startTestBtn = document.getElementById('startTestBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const resetTestBtn = document.getElementById('resetTestBtn');
    const questionCount = document.getElementById('questionCount');
    const correctCount = document.getElementById('correctCount');
    const scorePercentage = document.getElementById('scorePercentage');
    
    // Элементы справочника
    const refTabs = document.querySelectorAll('.ref-tab');
    const refSections = document.querySelectorAll('.ref-section');
    
    // Данные конвертера
    const unitsData = {
        information: {
            name: 'Информация',
            icon: 'fa-database',
            units: [
                { name: 'Бит', symbol: 'бит', factor: 1 },
                { name: 'Байт', symbol: 'Б', factor: 8 },
                { name: 'Килобайт', symbol: 'КБ', factor: 8192 },
                { name: 'Мегабайт', symbol: 'МБ', factor: 8388608 },
                { name: 'Гигабайт', symbol: 'ГБ', factor: 8589934592 },
                { name: 'Терабайт', symbol: 'ТБ', factor: 8796093022208 },
                { name: 'Кибибайт', symbol: 'КиБ', factor: 8192 },
                { name: 'Мебибайт', symbol: 'МиБ', factor: 8388608 }
            ],
            baseUnit: 'бит'
        },
        time: {
            name: 'Время',
            icon: 'fa-clock',
            units: [
                { name: 'Наносекунда', symbol: 'нс', factor: 0.000001 },
                { name: 'Микросекунда', symbol: 'мкс', factor: 0.001 },
                { name: 'Миллисекунда', symbol: 'мс', factor: 1 },
                { name: 'Секунда', symbol: 'с', factor: 1000 },
                { name: 'Минута', symbol: 'мин', factor: 60000 },
                { name: 'Час', symbol: 'ч', factor: 3600000 },
                { name: 'День', symbol: 'дн', factor: 86400000 }
            ],
            baseUnit: 'мс'
        },
        frequency: {
            name: 'Частота',
            icon: 'fa-wave-square',
            units: [
                { name: 'Герц', symbol: 'Гц', factor: 1 },
                { name: 'Килогерц', symbol: 'кГц', factor: 1000 },
                { name: 'Мегагерц', symbol: 'МГц', factor: 1000000 },
                { name: 'Гигагерц', symbol: 'ГГц', factor: 1000000000 },
                { name: 'Терагерц', symbol: 'ТГц', factor: 1000000000000 }
            ],
            baseUnit: 'Гц'
        },
        data: {
            name: 'Данные',
            icon: 'fa-broadcast-tower',
            units: [
                { name: 'Бит/сек', symbol: 'бит/с', factor: 1 },
                { name: 'Килобит/сек', symbol: 'Кбит/с', factor: 1000 },
                { name: 'Мегабит/сек', symbol: 'Мбит/с', factor: 1000000 },
                { name: 'Гигабит/сек', symbol: 'Гбит/с', factor: 1000000000 },
                { name: 'Байт/сек', symbol: 'Б/с', factor: 8 },
                { name: 'Килобайт/сек', symbol: 'КБ/с', factor: 8000 },
                { name: 'Мегабайт/сек', symbol: 'МБ/с', factor: 8000000 }
            ],
            baseUnit: 'бит/с'
        },
        color: {
            name: 'Цвет',
            icon: 'fa-palette',
            units: [
                { name: 'RGB', symbol: 'RGB', factor: 1, converter: convertColor },
                { name: 'HEX', symbol: 'HEX', factor: 1, converter: convertColor },
                { name: 'HSL', symbol: 'HSL', factor: 1, converter: convertColor },
                { name: 'CMYK', symbol: 'CMYK', factor: 1, converter: convertColor }
            ],
            baseUnit: 'RGB',
            isColor: true
        }
    };
    
    // Тестовые вопросы
    const testQuestions = [
        {
            question: "Сколько бит в одном байте?",
            options: [
                "4 бита",
                "8 бит",
                "16 бит",
                "32 бита"
            ],
            correct: 1,
            explanation: "1 байт = 8 бит. Байт - минимальная адресуемая единица информации в компьютерах."
        },
        {
            question: "Сколько байт в одном килобайте (КБ)?",
            options: [
                "1000 байт",
                "1024 байта",
                "2048 байт",
                "4096 байт"
            ],
            correct: 1,
            explanation: "1 КБ = 1024 байта. В информатике используются степени двойки: 2¹⁰ = 1024."
        },
        {
            question: "Какой объём данных может хранить CD-диск?",
            options: [
                "650 МБ",
                "1.44 МБ",
                "4.7 ГБ",
                "25 ГБ"
            ],
            correct: 0,
            explanation: "Стандартный CD-диск вмещает 650-700 МБ данных. DVD - 4.7 ГБ, Blu-ray - 25 ГБ."
        },
        {
            question: "Сколько мегабайт в одном гигабайте?",
            options: [
                "100 МБ",
                "1024 МБ",
                "2048 МБ",
                "4096 МБ"
            ],
            correct: 1,
            explanation: "1 ГБ = 1024 МБ. Запомните: каждый следующий уровень в 1024 раза больше предыдущего."
        },
        {
            question: "Сколько времени потребуется для передачи файла размером 100 МБ при скорости 10 Мбит/с?",
            options: [
                "10 секунд",
                "80 секунд",
                "100 секунд",
                "800 секунд"
            ],
            correct: 1,
            explanation: "100 МБ = 800 Мбит. При скорости 10 Мбит/с: 800 ÷ 10 = 80 секунд. Важно различать байты и биты!"
        },
        {
            question: "Что больше: 1 ТБ или 1000 ГБ?",
            options: [
                "1 ТБ больше",
                "1000 ГБ больше",
                "Они равны",
                "Зависит от системы"
            ],
            correct: 2,
            explanation: "1 ТБ = 1024 ГБ, поэтому 1000 ГБ меньше чем 1 ТБ. Производители жёстких дисков используют 1 ТБ = 1000 ГБ, но в компьютерах 1 ТБ = 1024 ГБ."
        },
        {
            question: "Сколько наносекунд в одной миллисекунде?",
            options: [
                "1000 нс",
                "10 000 нс",
                "100 000 нс",
                "1 000 000 нс"
            ],
            correct: 3,
            explanation: "1 мс = 1 000 000 нс (одна миллионная). 1 мкс = 1000 нс, 1 с = 1 000 000 000 нс."
        },
        {
            question: "Какой из этих форматов использует наименьший объём для хранения цвета одного пикселя?",
            options: [
                "RGB (24 бита)",
                "HEX (6 символов)",
                "CMYK (32 бита)",
                "Все одинаковые"
            ],
            correct: 0,
            explanation: "RGB использует 24 бита (3 байта), HEX - 6 символов (обычно 24 бита + служебные), CMYK - 32 бита (4 байта)."
        }
    ];
    
    // Переменные состояния
    let currentCategory = 'information';
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    let testState = {
        currentQuestion: 0,
        score: 0,
        started: false,
        completed: false
    };
    
    // Инициализация
    init();
    
    function init() {
        // Инициализация конвертера
        updateConversionPanel();
        updateQuickButtons();
        updateHistoryDisplay();
        
        // Обработчики событий для категорий
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.category;
                updateConversionPanel();
                updateQuickButtons();
            });
        });
        
        // Обработчики для истории
        clearHistoryBtn.addEventListener('click', clearHistory);
        exportHistoryBtn.addEventListener('click', exportHistory);
        
        // Обработчики для теста
        startTestBtn.addEventListener('click', startTest);
        nextQuestionBtn.addEventListener('click', nextQuestion);
        resetTestBtn.addEventListener('click', resetTest);
        
        // Обработчики для справочника
        refTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                refTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const refId = this.dataset.ref;
                refSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === refId + 'Ref') {
                        section.classList.add('active');
                    }
                });
            });
        });
        
        // Инициализация теста
        updateTestStats();
        
        // Генерация быстрых преобразований
        generateQuickConversions();
        
        // Консольное сообщение
        console.log('%c📏 Конвертер единиц измерения загружен!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
        console.log('%c🧪 Тест из ' + testQuestions.length + ' вопросов готов', 'color: #36d1dc; font-size: 14px;');
    }
    
    function updateConversionPanel() {
        const category = unitsData[currentCategory];
        const isColor = category.isColor || false;
        
        conversionPanel.innerHTML = `
            <div class="conversion-row">
                <div class="conversion-group">
                    <label>
                        <i class="${category.icon}"></i>
                        Из:
                    </label>
                    <input type="text" id="fromValue" class="conversion-input" value="1" autocomplete="off">
                    <select id="fromUnit" class="conversion-select">
                        ${category.units.map(unit => 
                            `<option value="${unit.factor}">${unit.name} (${unit.symbol})</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="conversion-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
                
                <div class="conversion-group">
                    <label>
                        <i class="${category.icon}"></i>
                        В:
                    </label>
                    <input type="text" id="toValue" class="conversion-input" readonly>
                    <select id="toUnit" class="conversion-select">
                        ${category.units.map(unit => 
                            `<option value="${unit.factor}" ${unit.symbol === 'Б' ? 'selected' : ''}>${unit.name} (${unit.symbol})</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="conversion-result" id="conversionResult">
                <div class="result-label">
                    <i class="fas fa-calculator"></i>
                    Результат:
                </div>
                <div class="result-value" id="resultValue">1 Байт = 8 бит</div>
                <div class="result-formula" id="resultFormula">1 × 8 = 8</div>
            </div>
            
            ${isColor ? `
            <div class="color-preview" id="colorPreview" style="display: none;">
                <div class="color-box" id="colorBox"></div>
                <div class="color-values" id="colorValues"></div>
            </div>
            ` : ''}
        `;
        
        // Добавляем обработчики событий
        const fromValue = document.getElementById('fromValue');
        const fromUnit = document.getElementById('fromUnit');
        const toValue = document.getElementById('toValue');
        const toUnit = document.getElementById('toUnit');
        
        const convert = () => {
            const inputValue = parseFloat(fromValue.value) || 0;
            const fromFactor = parseFloat(fromUnit.value);
            const toFactor = parseFloat(toUnit.value);
            
            let result;
            let formula;
            
            if (isColor) {
                // Специальная обработка для цветов
                const colorValue = fromValue.value;
                const fromType = fromUnit.options[fromUnit.selectedIndex].text.split('(')[1].replace(')', '').trim();
                const toType = toUnit.options[toUnit.selectedIndex].text.split('(')[1].replace(')', '').trim();
                
                result = convertColor(colorValue, fromType, toType);
                formula = `Преобразование ${fromType} → ${toType}`;
                
                // Показываем предпросмотр цвета
                if (colorValue && colorValue !== '1') {
                    showColorPreview(colorValue, fromType);
                }
            } else {
                // Обычное преобразование
                const baseValue = inputValue * fromFactor;
                result = baseValue / toFactor;
                formula = `${inputValue} × ${fromFactor} ÷ ${toFactor} = ${result.toFixed(6)}`;
            }
            
            toValue.value = isColor ? result : formatNumber(result);
            document.getElementById('resultValue').textContent = 
                `${inputValue} ${getUnitSymbol(fromUnit)} = ${isColor ? result : formatNumber(result)} ${getUnitSymbol(toUnit)}`;
            document.getElementById('resultFormula').textContent = formula;
            
            // Добавляем в историю
            addToHistory({
                category: category.name,
                from: `${inputValue} ${getUnitSymbol(fromUnit)}`,
                to: `${isColor ? result : formatNumber(result)} ${getUnitSymbol(toUnit)}`,
                timestamp: new Date().toLocaleTimeString()
            });
        };
        
        fromValue.addEventListener('input', convert);
        fromUnit.addEventListener('change', convert);
        toUnit.addEventListener('change', convert);
        
        // Выполняем начальное преобразование
        convert();
    }
    
    function getUnitSymbol(selectElement) {
        const text = selectElement.options[selectElement.selectedIndex].text;
        const match = text.match(/\(([^)]+)\)/);
        return match ? match[1] : '';
    }
    
    function formatNumber(num) {
        if (num === 0) return '0';
        if (Math.abs(num) < 0.000001) return num.toExponential(4);
        if (Math.abs(num) > 1000000000) return num.toExponential(4);
        
        // Округляем до 6 знаков после запятой, убираем лишние нули
        return parseFloat(num.toFixed(6)).toString();
    }
    
    function convertColor(colorValue, fromType, toType) {
        // Упрощённое преобразование цветов для демонстрации
        const colors = {
            'RGB': { example: 'rgb(255, 0, 0)', convert: (val) => val },
            'HEX': { example: '#FF0000', convert: (val) => val },
            'HSL': { example: 'hsl(0, 100%, 50%)', convert: (val) => val },
            'CMYK': { example: 'cmyk(0%, 100%, 100%, 0%)', convert: (val) => val }
        };
        
        if (colorValue === '1') {
            return colors[toType].example;
        }
        
        // Простая демонстрация преобразования
        if (fromType === 'RGB' && toType === 'HEX') {
            return rgbToHex(colorValue);
        } else if (fromType === 'HEX' && toType === 'RGB') {
            return hexToRgb(colorValue);
        }
        
        return colors[toType].example;
    }
    
    function rgbToHex(rgb) {
        // Упрощённая версия
        if (rgb.includes('rgb')) {
            const matches = rgb.match(/\d+/g);
            if (matches && matches.length >= 3) {
                const r = parseInt(matches[0]).toString(16).padStart(2, '0');
                const g = parseInt(matches[1]).toString(16).padStart(2, '0');
                const b = parseInt(matches[2]).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`.toUpperCase();
            }
        }
        return '#FF0000';
    }
    
    function hexToRgb(hex) {
        // Упрощённая версия
        if (hex.startsWith('#')) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgb(${r}, ${g}, ${b})`;
        }
        return 'rgb(255, 0, 0)';
    }
    
    function showColorPreview(colorValue, fromType) {
        let colorPreview = document.getElementById('colorPreview');
        let colorBox = document.getElementById('colorBox');
        let colorValues = document.getElementById('colorValues');
        
        if (!colorPreview) return;
        
        colorPreview.style.display = 'block';
        
        // Устанавливаем цвет
        if (fromType === 'HEX' && colorValue.startsWith('#')) {
            colorBox.style.backgroundColor = colorValue;
        } else if (fromType === 'RGB' && colorValue.includes('rgb')) {
            colorBox.style.backgroundColor = colorValue;
        } else {
            colorBox.style.backgroundColor = '#FF0000';
        }
        
        // Показываем значения
        colorValues.innerHTML = `
            <div>${colorValue}</div>
            <div>${fromType} формат</div>
        `;
    }
    
    function updateQuickButtons() {
        const category = unitsData[currentCategory];
        const quickExamples = getQuickExamples(currentCategory);
        
        quickButtons.innerHTML = '';
        
        quickExamples.forEach(example => {
            const button = document.createElement('button');
            button.className = 'quick-btn';
            button.textContent = example.label;
            button.addEventListener('click', () => {
                document.getElementById('fromValue').value = example.value;
                document.getElementById('fromUnit').value = example.fromFactor;
                document.getElementById('toUnit').value = example.toFactor;
                
                // Запускаем преобразование
                const event = new Event('input');
                document.getElementById('fromValue').dispatchEvent(event);
            });
            
            quickButtons.appendChild(button);
        });
    }
    
    function getQuickExamples(category) {
        const examples = {
            information: [
                { label: '1 КБ → Байты', value: '1', fromFactor: 8192, toFactor: 8 },
                { label: '1 МБ → КБ', value: '1', fromFactor: 8388608, toFactor: 8192 },
                { label: '1 ГБ → МБ', value: '1', fromFactor: 8589934592, toFactor: 8388608 },
                { label: '1024 Б → КБ', value: '1024', fromFactor: 8, toFactor: 8192 }
            ],
            time: [
                { label: '1 с → мс', value: '1', fromFactor: 1000, toFactor: 1 },
                { label: '1 мин → с', value: '1', fromFactor: 60000, toFactor: 1000 },
                { label: '1 ч → мин', value: '1', fromFactor: 3600000, toFactor: 60000 },
                { label: '1000 мс → с', value: '1000', fromFactor: 1, toFactor: 1000 }
            ],
            frequency: [
                { label: '1 кГц → Гц', value: '1', fromFactor: 1000, toFactor: 1 },
                { label: '1 МГц → кГц', value: '1', fromFactor: 1000000, toFactor: 1000 },
                { label: '2.4 ГГц → МГц', value: '2.4', fromFactor: 1000000000, toFactor: 1000000 }
            ],
            data: [
                { label: '100 Мбит/с → МБ/с', value: '100', fromFactor: 1000000, toFactor: 8000000 },
                { label: '1 Гбит/с → Мбит/с', value: '1', fromFactor: 1000000000, toFactor: 1000000 },
                { label: '10 МБ/с → Мбит/с', value: '10', fromFactor: 8000000, toFactor: 1000000 }
            ],
            color: [
                { label: 'Красный RGB', value: 'rgb(255, 0, 0)', fromFactor: 1, toFactor: 1 },
                { label: 'Зелёный HEX', value: '#00FF00', fromFactor: 1, toFactor: 1 },
                { label: 'Синий HSL', value: 'hsl(240, 100%, 50%)', fromFactor: 1, toFactor: 1 }
            ]
        };
        
        return examples[category] || examples.information;
    }
    
    function generateQuickConversions() {
        // Генерация дополнительных быстрых преобразований на основе истории
        if (history.length > 0) {
            const popular = getPopularConversions();
            if (popular.length > 0) {
                const popularSection = document.createElement('div');
                popularSection.className = 'quick-section';
                popularSection.innerHTML = '<h4><i class="fas fa-fire"></i> Популярные преобразования</h4>';
                
                const popularButtons = document.createElement('div');
                popularButtons.className = 'quick-buttons';
                
                popular.forEach(conv => {
                    const button = document.createElement('button');
                    button.className = 'quick-btn';
                    button.textContent = conv;
                    button.addEventListener('click', () => {
                        // Парсим популярное преобразование
                        // (упрощённая реализация)
                    });
                    
                    popularButtons.appendChild(button);
                });
                
                popularSection.appendChild(popularButtons);
                quickButtons.parentNode.appendChild(popularSection);
            }
        }
    }
    
    function getPopularConversions() {
        // Анализ истории для поиска популярных преобразований
        const conversionCounts = {};
        
        history.forEach(item => {
            const key = `${item.from} → ${item.to}`;
            conversionCounts[key] = (conversionCounts[key] || 0) + 1;
        });
        
        return Object.entries(conversionCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([conv]) => conv);
    }
    
    function addToHistory(item) {
        history.unshift(item);
        if (history.length > 50) history.pop();
        
        localStorage.setItem('conversionHistory', JSON.stringify(history));
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-exchange-alt"></i>
                    <p>Здесь будет отображаться история ваших преобразований</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = '';
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-conversion">${item.from} → ${item.to}</div>
                <div class="history-result">${item.category}</div>
                <div class="history-time">${item.timestamp}</div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }
    
    function clearHistory() {
        if (confirm('Очистить всю историю преобразований?')) {
            history = [];
            localStorage.removeItem('conversionHistory');
            updateHistoryDisplay();
            showNotification('История очищена!');
        }
    }
    
    function exportHistory() {
        const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'история_преобразований.json';
        a.click();
        
        URL.revokeObjectURL(url);
        showNotification('История экспортирована!');
    }
    
    // Тест
    function startTest() {
        testState = {
            currentQuestion: 0,
            score: 0,
            started: true,
            completed: false
        };
        
        startTestBtn.disabled = true;
        nextQuestionBtn.disabled = false;
        resetTestBtn.disabled = false;
        
        showQuestion(0);
        updateTestStats();
    }
    
    function showQuestion(index) {
        if (index >= testQuestions.length) {
            completeTest();
            return;
        }
        
        const question = testQuestions[index];
        
        testContent.innerHTML = `
            <div class="question-container active">
                <div class="question-text">Вопрос ${index + 1}/${testQuestions.length}: ${question.question}</div>
                
                <div class="options-container" id="optionsContainer">
                    ${question.options.map((option, i) => `
                        <div class="option" data-index="${i}">
                            <input type="radio" name="testAnswer" id="option${i}" value="${i}">
                            <label for="option${i}">
                                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                <span class="option-text">${option}</span>
                            </label>
                        </div>
                    `).join('')}
                </div>
                
                <div class="explanation" id="explanation">
                    <h4><i class="fas fa-lightbulb"></i> Объяснение:</h4>
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;
        
        // Добавляем обработчики для вариантов ответа
        const options = testContent.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                checkAnswer(selectedIndex, question);
            });
        });
        
        testState.currentQuestion = index;
    }
    
    function checkAnswer(selectedIndex, question) {
        const options = testContent.querySelectorAll('.option');
        const explanation = document.getElementById('explanation');
        
        // Отключаем все варианты
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Показываем правильный и неправильный ответы
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Показываем объяснение
        explanation.classList.add('show');
        
        // Обновляем счет
        if (selectedIndex === question.correct) {
            testState.score++;
            showNotification('Правильно! +1 балл');
        } else {
            showNotification(`Неправильно. Правильный ответ: ${String.fromCharCode(65 + question.correct)}`);
        }
        
        updateTestStats();
        
        // Разрешаем перейти к следующему вопросу
        nextQuestionBtn.disabled = false;
    }
    
    function nextQuestion() {
        const nextIndex = testState.currentQuestion + 1;
        
        if (nextIndex >= testQuestions.length) {
            completeTest();
        } else {
            showQuestion(nextIndex);
            nextQuestionBtn.disabled = true;
        }
    }
    
    function completeTest() {
        testState.completed = true;
        testState.started = false;
        
        const percentage = Math.round((testState.score / testQuestions.length) * 100);
        let message;
        
        if (percentage >= 90) {
            message = 'Отлично! Вы прекрасно разбираетесь в единицах измерения!';
        } else if (percentage >= 70) {
            message = 'Хорошо! У вас solidные знания.';
        } else if (percentage >= 50) {
            message = 'Неплохо! Есть куда расти.';
        } else {
            message = 'Попробуйте ещё раз! Изучите справочник и повторите тест.';
        }
        
        testContent.innerHTML = `
            <div class="test-complete">
                <div class="complete-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>Тест завершён!</h3>
                <div class="complete-stats">
                    <div class="stat">
                        <span class="stat-value">${testState.score}/${testQuestions.length}</span>
                        <span class="stat-label">правильных ответов</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${percentage}%</span>
                        <span class="stat-label">результат</span>
                    </div>
                </div>
                <p class="complete-message">${message}</p>
                <div class="test-review">
                    <h4><i class="fas fa-chart-bar"></i> Рекомендации:</h4>
                    <ul>
                        <li>${percentage < 70 ? 'Изучите таблицу единиц информации в справочнике' : 'Повторите сложные преобразования'}</li>
                        <li>${percentage < 50 ? 'Попрактикуйтесь с конвертером' : 'Попробуйте более сложные преобразования'}</li>
                        <li>Пройдите тест ещё раз через несколько дней</li>
                    </ul>
                </div>
            </div>
        `;
        
        startTestBtn.disabled = true;
        nextQuestionBtn.disabled = true;
        resetTestBtn.disabled = false;
    }
    
    function resetTest() {
        testState = {
            currentQuestion: 0,
            score: 0,
            started: false,
            completed: false
        };
        
        startTestBtn.disabled = false;
        nextQuestionBtn.disabled = true;
        resetTestBtn.disabled = true;
        
        testContent.innerHTML = `
            <div class="test-intro">
                <p>Готовы проверить свои знания? Тест состоит из ${testQuestions.length} вопросов о единицах измерения в информатике.</p>
                <p>Выберите правильный ответ и узнайте подробное объяснение.</p>
            </div>
        `;
        
        updateTestStats();
    }
    
    function updateTestStats() {
        questionCount.textContent = testQuestions.length;
        correctCount.textContent = testState.score;
        
        const percentage = testState.started ? 
            Math.round((testState.score / (testState.currentQuestion + 1)) * 100) : 
            0;
        scorePercentage.textContent = `${percentage}%`;
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: var(--primary);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .test-complete {
            text-align: center;
            padding: 30px;
        }
        
        .complete-icon {
            font-size: 4rem;
            color: #ffd166;
            margin-bottom: 20px;
        }
        
        .complete-stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin: 30px 0;
        }
        
        .complete-message {
            font-size: 1.2rem;
            color: white;
            margin: 25px 0;
            line-height: 1.6;
        }
        
        .test-review {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            text-align: left;
        }
        
        .test-review h4 {
            color: var(--accent);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .test-review ul {
            list-style: none;
            padding-left: 0;
        }
        
        .test-review li {
            color: rgba(255, 255, 255, 0.9);
            padding: 10px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .test-review li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
        }
        
        .option-letter {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            margin-right: 15px;
            font-weight: bold;
        }
        
        .quick-section {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .quick-section h4 {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
        }
        
        .color-preview {
            margin-top: 30px;
            padding: 25px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
        }
        
        .color-box {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            margin: 0 auto 20px;
            border: 3px solid white;
        }
        
        .color-values {
            text-align: center;
            color: white;
            font-family: 'Courier New', monospace;
        }
    `;
    document.head.appendChild(style);
});