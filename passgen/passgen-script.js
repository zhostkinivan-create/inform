// Генератор и анализатор паролей

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM для генерации
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');
    const excludeSimilar = document.getElementById('excludeSimilar');
    const noRepeating = document.getElementById('noRepeating');
    const excludeAmbiguous = document.getElementById('excludeAmbiguous');
    const generateBtn = document.getElementById('generateBtn');
    const generateMultipleBtn = document.getElementById('generateMultipleBtn');
    const passwordDisplay = document.getElementById('passwordText');
    const copyBtn = document.getElementById('copyBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const saveBtn = document.getElementById('saveBtn');
    const multiplePasswords = document.getElementById('multiplePasswords');
    const infoLength = document.getElementById('infoLength');
    const infoStrength = document.getElementById('infoStrength');
    const infoEntropy = document.getElementById('infoEntropy');
    const infoCrackTime = document.getElementById('infoCrackTime');
    
    // Элементы для анализа
    const analyzePassword = document.getElementById('analyzePassword');
    const toggleVisibility = document.getElementById('toggleVisibility');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const detailLength = document.getElementById('detailLength');
    const detailCharset = document.getElementById('detailCharset');
    const detailPattern = document.getElementById('detailPattern');
    const detailDictionary = document.getElementById('detailDictionary');
    const timeOnline = document.getElementById('timeOnline');
    const timeOffline = document.getElementById('timeOffline');
    const timeBruteforce = document.getElementById('timeBruteforce');
    
    // Элементы для хеширования
    const hashInput = document.getElementById('hashInput');
    const useSalt = document.getElementById('useSalt');
    const saltInput = document.getElementById('saltInput');
    const algorithms = document.querySelectorAll('.algorithm');
    const hashResult = document.getElementById('hashResult');
    const hashInfo = document.getElementById('hashInfo');
    const computeHashBtn = document.getElementById('computeHashBtn');
    const compareHashBtn = document.getElementById('compareHashBtn');
    const hashComparison = document.getElementById('hashComparison');
    const hash1 = document.getElementById('hash1');
    const hash2 = document.getElementById('hash2');
    const comparisonResult = document.getElementById('comparisonResult');
    
    // Элементы для проверки утечек
    const leakCheckInput = document.getElementById('leakCheckInput');
    const checkLeakBtn = document.getElementById('checkLeakBtn');
    const leakResult = document.getElementById('leakResult');
    const leakDBcount = document.getElementById('leakDBcount');
    const commonLeaks = document.getElementById('commonLeaks');
    const totalChecks = document.getElementById('totalChecks');
    
    // Элементы для истории
    const passwordHistory = document.getElementById('passwordHistory');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const exportHistoryBtn = document.getElementById('exportHistoryBtn');
    
    // Константы
    const CHARACTER_SETS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    const SIMILAR_CHARS = {
        '0': 'O',
        'O': '0',
        '1': 'lI',
        'l': '1I',
        'I': '1l',
        '|': 'Il1'
    };
    
    const AMBIGUOUS_CHARS = '{}[]()/\\\'"`~,;:.<> ';
    
    // База утекших паролей (локальная, для демонстрации)
    const LEAKED_PASSWORDS = [
        '123456', 'password', '12345678', 'qwerty', '123456789',
        '12345', '1234', '111111', '1234567', 'dragon',
        '123123', 'baseball', 'abc123', 'football', 'monkey',
        'letmein', '696969', 'shadow', 'master', '666666',
        'qwertyuiop', '123321', 'mustang', '1234567890',
        'michael', '654321', 'superman', '1qaz2wsx', '7777777',
        '121212', '000000', 'qazwsx', '123qwe', 'killer',
        'trustno1', 'jordan', 'jennifer', 'zxcvbnm', 'asdfgh',
        'hunter', 'buster', 'soccer', 'harley', 'batman',
        'andrew', 'tigger', 'sunshine', 'iloveyou', '2000',
        'charlie', 'robert', 'thomas', 'hockey', 'ranger',
        'daniel', 'starwars', 'klaster', '112233', 'george',
        'computer', 'michelle', 'jessica', 'pepper', '1111',
        'zxcvbn', '555555', '11111111', '131313', 'freedom',
        '777777', 'pass', 'maggie', '159753', 'aaaaaa',
        'ginger', 'princess', 'joshua', 'cheese', 'amanda',
        'summer', 'love', 'ashley', '6969', 'nicole',
        'chelsea', 'biteme', 'matthew', 'access', 'yankees',
        '987654321', 'dallas', 'austin', 'thunder', 'taylor',
        'matrix', 'minecraft', 'admin123', 'password1'
    ];
    
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    let totalChecksCount = parseInt(localStorage.getItem('totalChecks')) || 0;
    let selectedAlgorithm = 'md5';
    
    // Инициализация
    init();
    
    function init() {
        // Обновление значения длины
        updateLengthValue();
        
        // Обработчики событий
        lengthSlider.addEventListener('input', updateLengthValue);
        generateBtn.addEventListener('click', generatePassword);
        generateMultipleBtn.addEventListener('click', generateMultiplePasswords);
        copyBtn.addEventListener('click', copyPassword);
        refreshBtn.addEventListener('click', generatePassword);
        saveBtn.addEventListener('click', savePassword);
        
        // Анализ пароля
        toggleVisibility.addEventListener('click', togglePasswordVisibility);
        analyzeBtn.addEventListener('click', analyzePasswordHandler);
        analyzePassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') analyzePasswordHandler();
        });
        
        // Хеширование
        algorithms.forEach(algo => {
            algo.addEventListener('click', function() {
                algorithms.forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                selectedAlgorithm = this.dataset.algo;
                updateHashInfo();
            });
        });
        
        computeHashBtn.addEventListener('click', computeHash);
        compareHashBtn.addEventListener('click', compareHashes);
        hashInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') computeHash();
        });
        
        // Проверка утечек
        checkLeakBtn.addEventListener('click', checkLeak);
        leakCheckInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkLeak();
        });
        
        // История
        clearHistoryBtn.addEventListener('click', clearHistory);
        exportHistoryBtn.addEventListener('click', exportHistory);
        
        // Обновление статистики
        updateStats();
        updateHistoryDisplay();
        
        // Генерация начального пароля
        generatePassword();
        
        // Консольное сообщение
        console.log('%c🔐 Генератор паролей загружен!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
        console.log('%c⚠️ Все вычисления выполняются локально в вашем браузере', 'color: #ff6584; font-size: 14px;');
    }
    
    function updateLengthValue() {
        const length = lengthSlider.value;
        lengthValue.textContent = `${length} символов`;
    }
    
    // Генерация пароля
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const charset = buildCharset();
        
        if (charset.length === 0) {
            alert('Пожалуйста, выберите хотя бы один тип символов');
            return;
        }
        
        let password = '';
        let lastChar = '';
        
        for (let i = 0; i < length; i++) {
            let char;
            do {
                char = charset[Math.floor(Math.random() * charset.length)];
                
                // Проверка на повторяющиеся символы
                if (noRepeating.checked && char === lastChar) {
                    continue;
                }
                
                // Проверка на похожие символы
                if (excludeSimilar.checked && isSimilarToLast(char, lastChar)) {
                    continue;
                }
                
                break;
            } while (true);
            
            password += char;
            lastChar = char;
        }
        
        // Отображение пароля
        displayPassword(password);
        
        // Анализ пароля
        analyzePasswordForDisplay(password);
        
        return password;
    }
    
    function buildCharset() {
        let charset = '';
        
        if (uppercase.checked) charset += CHARACTER_SETS.uppercase;
        if (lowercase.checked) charset += CHARACTER_SETS.lowercase;
        if (numbers.checked) charset += CHARACTER_SETS.numbers;
        if (symbols.checked) charset += CHARACTER_SETS.symbols;
        
        // Исключение похожих символов
        if (excludeSimilar.checked) {
            for (const similar in SIMILAR_CHARS) {
                charset = charset.replace(new RegExp(`[${SIMILAR_CHARS[similar]}]`, 'g'), '');
            }
        }
        
        // Исключение неоднозначных символов
        if (excludeAmbiguous.checked) {
            charset = charset.replace(new RegExp(`[${AMBIGUOUS_CHARS}]`, 'g'), '');
        }
        
        return charset;
    }
    
    function isSimilarToLast(char, lastChar) {
        if (!lastChar) return false;
        
        for (const similar in SIMILAR_CHARS) {
            if (char === similar && SIMILAR_CHARS[similar].includes(lastChar)) {
                return true;
            }
            if (lastChar === similar && SIMILAR_CHARS[similar].includes(char)) {
                return true;
            }
        }
        
        return false;
    }
    
    function generateMultiplePasswords() {
        multiplePasswords.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            const password = generatePassword();
            if (!password) return;
            
            const variant = document.createElement('div');
            variant.className = 'password-variant';
            variant.innerHTML = `
                <span>${password}</span>
                <button class="copy-small" title="Копировать">
                    <i class="far fa-copy"></i>
                </button>
            `;
            
            variant.querySelector('.copy-small').addEventListener('click', function() {
                copyToClipboard(password);
                showNotification('Пароль скопирован!');
            });
            
            multiplePasswords.appendChild(variant);
        }
    }
    
    function displayPassword(password) {
        passwordDisplay.textContent = password;
        
        // Обновление информации
        infoLength.textContent = password.length;
    }
    
    function analyzePasswordForDisplay(password) {
        const strength = calculatePasswordStrength(password);
        const entropy = calculateEntropy(password);
        const crackTime = estimateCrackTime(password);
        
        // Обновление информации
        infoStrength.textContent = getStrengthText(strength);
        infoStrength.style.color = getStrengthColor(strength);
        
        infoEntropy.textContent = `${entropy.toFixed(1)} бит`;
        infoCrackTime.textContent = formatCrackTime(crackTime);
    }
    
    function calculatePasswordStrength(password) {
        let score = 0;
        
        // Длина
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        if (password.length >= 20) score += 1;
        
        // Разнообразие символов
        let charTypes = 0;
        if (/[A-Z]/.test(password)) charTypes++;
        if (/[a-z]/.test(password)) charTypes++;
        if (/[0-9]/.test(password)) charTypes++;
        if (/[^A-Za-z0-9]/.test(password)) charTypes++;
        
        score += Math.min(charTypes - 1, 3);
        
        // Штрафы за паттерны
        if (/(.)\1{2,}/.test(password)) score -= 1; // Повторяющиеся символы
        if (/^[0-9]+$/.test(password)) score -= 2; // Только цифры
        if (/^[a-zA-Z]+$/.test(password)) score -= 2; // Только буквы
        
        // Нормализация от 0 до 10
        score = Math.max(0, Math.min(score, 10));
        
        return score;
    }
    
    function calculateEntropy(password) {
        const charsetSize = getCharsetSize(password);
        return Math.log2(Math.pow(charsetSize, password.length));
    }
    
    function getCharsetSize(password) {
        let size = 0;
        if (/[a-z]/.test(password)) size += 26;
        if (/[A-Z]/.test(password)) size += 26;
        if (/[0-9]/.test(password)) size += 10;
        if (/[^A-Za-z0-9]/.test(password)) size += 32; // Примерное количество спецсимволов
        return size || 1;
    }
    
    function estimateCrackTime(password) {
        const entropy = calculateEntropy(password);
        const guessesPerSecond = 1000000000; // 1 миллиард попыток в секунду
        
        const seconds = Math.pow(2, entropy) / guessesPerSecond;
        return seconds;
    }
    
    function formatCrackTime(seconds) {
        if (seconds < 1) return 'мгновенно';
        if (seconds < 60) return `${Math.round(seconds)} сек`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} мин`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} час`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} дн`;
        if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} лет`;
        return `${Math.round(seconds / 31536000000)} млрд лет`;
    }
    
    function getStrengthText(score) {
        if (score < 3) return 'Очень слабый';
        if (score < 5) return 'Слабый';
        if (score < 7) return 'Средний';
        if (score < 9) return 'Сильный';
        return 'Очень сильный';
    }
    
    function getStrengthColor(score) {
        if (score < 3) return '#ff6584';
        if (score < 5) return '#ff9e00';
        if (score < 7) return '#ffd166';
        if (score < 9) return '#4cc9f0';
        return '#36d1dc';
    }
    
    // Копирование пароля
    function copyPassword() {
        const password = passwordDisplay.textContent;
        if (password && password !== 'Нажмите "Сгенерировать пароль"') {
            copyToClipboard(password);
            showNotification('Пароль скопирован в буфер обмена!');
        }
    }
    
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    
    function showNotification(message) {
        // Создаем уведомление
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
    
    // Сохранение пароля в историю
    function savePassword() {
        const password = passwordDisplay.textContent;
        
        if (!password || password === 'Нажмите "Сгенерировать пароль"') {
            alert('Сначала сгенерируйте пароль');
            return;
        }
        
        const passwordData = {
            password: password,
            timestamp: new Date().toLocaleString(),
            strength: calculatePasswordStrength(password),
            length: password.length
        };
        
        history.unshift(passwordData);
        if (history.length > 50) history.pop();
        
        localStorage.setItem('passwordHistory', JSON.stringify(history));
        updateHistoryDisplay();
        
        showNotification('Пароль сохранён в историю!');
    }
    
    function updateHistoryDisplay() {
        if (history.length === 0) {
            passwordHistory.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-key"></i>
                    <p>Здесь будет отображаться история сгенерированных паролей</p>
                    <p>Пароли сохраняются только локально в вашем браузере</p>
                </div>
            `;
            return;
        }
        
        passwordHistory.innerHTML = '';
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const strengthText = getStrengthText(item.strength);
            const strengthColor = getStrengthColor(item.strength);
            
            historyItem.innerHTML = `
                <div class="history-password">${item.password}</div>
                <div class="history-meta">
                    <span>${item.timestamp}</span>
                    <span style="color: ${strengthColor}">${strengthText}</span>
                    <span>${item.length} симв.</span>
                </div>
            `;
            
            passwordHistory.appendChild(historyItem);
        });
    }
    
    function clearHistory() {
        if (confirm('Очистить всю историю паролей?')) {
            history = [];
            localStorage.removeItem('passwordHistory');
            updateHistoryDisplay();
            showNotification('История очищена!');
        }
    }
    
    function exportHistory() {
        const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'история_паролей.json';
        a.click();
        
        URL.revokeObjectURL(url);
        showNotification('История экспортирована!');
    }
    
    // Анализ пароля
    function togglePasswordVisibility() {
        const type = analyzePassword.getAttribute('type');
        const icon = toggleVisibility.querySelector('i');
        
        if (type === 'password') {
            analyzePassword.setAttribute('type', 'text');
            icon.className = 'far fa-eye-slash';
        } else {
            analyzePassword.setAttribute('type', 'password');
            icon.className = 'far fa-eye';
        }
    }
    
    function analyzePasswordHandler() {
        const password = analyzePassword.value;
        
        if (!password) {
            alert('Введите пароль для анализа');
            return;
        }
        
        const strength = calculatePasswordStrength(password);
        const entropy = calculateEntropy(password);
        
        // Обновление полосы силы
        const percentage = (strength / 10) * 100;
        strengthFill.style.width = `${percentage}%`;
        strengthFill.dataset.strength = strength;
        
        // Обновление текста
        strengthText.textContent = getStrengthText(strength);
        strengthText.style.color = getStrengthColor(strength);
        
        // Обновление деталей
        updateDetails(password, strength);
        
        // Обновление времени подбора
        updateCrackTimes(password);
        
        // Увеличиваем счетчик проверок
        totalChecksCount++;
        localStorage.setItem('totalChecks', totalChecksCount);
        updateStats();
    }
    
    function updateDetails(password, strength) {
        // Длина
        const lengthOk = password.length >= 12;
        detailLength.innerHTML = `
            <i class="fas fa-${lengthOk ? 'check' : 'times'}-circle"></i>
            <span>Длина: <strong>${password.length}/12</strong></span>
        `;
        detailLength.querySelector('i').style.color = lengthOk ? '#4cc9f0' : '#ff6584';
        
        // Набор символов
        let charTypes = 0;
        const checks = [
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[^A-Za-z0-9]/.test(password)
        ];
        charTypes = checks.filter(Boolean).length;
        
        detailCharset.innerHTML = `
            <i class="fas fa-${charTypes >= 3 ? 'check' : 'times'}-circle"></i>
            <span>Набор символов: <strong>${charTypes}/4</strong></span>
        `;
        detailCharset.querySelector('i').style.color = charTypes >= 3 ? '#4cc9f0' : '#ff6584';
        
        // Паттерны
        const hasPattern = /(.)\1{2,}/.test(password) || 
                          /(123|abc|qwerty|password)/i.test(password);
        
        detailPattern.innerHTML = `
            <i class="fas fa-${!hasPattern ? 'check' : 'times'}-circle"></i>
            <span>Паттерны: <strong>${!hasPattern ? 'Не обнаружено' : 'Обнаружено'}</strong></span>
        `;
        detailPattern.querySelector('i').style.color = !hasPattern ? '#4cc9f0' : '#ff6584';
        
        // Словарные слова
        const isDictionaryWord = LEAKED_PASSWORDS.includes(password.toLowerCase());
        
        detailDictionary.innerHTML = `
            <i class="fas fa-${!isDictionaryWord ? 'check' : 'times'}-circle"></i>
            <span>Словарные слова: <strong>${!isDictionaryWord ? 'Не обнаружено' : 'Обнаружено'}</strong></span>
        `;
        detailDictionary.querySelector('i').style.color = !isDictionaryWord ? '#4cc9f0' : '#ff6584';
    }
    
    function updateCrackTimes(password) {
        const entropy = calculateEntropy(password);
        
        // Онлайн-атака (10 попыток/сек)
        const onlineTime = Math.pow(2, entropy) / 10;
        timeOnline.textContent = formatCrackTime(onlineTime);
        
        // Офлайн-атака (10K хешей/сек)
        const offlineTime = Math.pow(2, entropy) / 10000;
        timeOffline.textContent = formatCrackTime(offlineTime);
        
        // Bruteforce (1 млрд/сек)
        const bruteforceTime = Math.pow(2, entropy) / 1000000000;
        timeBruteforce.textContent = formatCrackTime(bruteforceTime);
    }
    
    // Хеширование
    function updateHashInfo() {
        const algoInfo = {
            'md5': { name: 'MD5', length: 32 },
            'sha1': { name: 'SHA-1', length: 40 },
            'sha256': { name: 'SHA-256', length: 64 },
            'sha512': { name: 'SHA-512', length: 128 }
        };
        
        const info = algoInfo[selectedAlgorithm];
        hashInfo.textContent = `${info.name} хеш (${info.length} символа)`;
    }
    
    function computeHash() {
        const text = hashInput.value;
        if (!text) {
            alert('Введите текст для хеширования');
            return;
        }
        
        let data = text;
        if (useSalt.checked && saltInput.value) {
            data = saltInput.value + text;
        }
        
        let hash;
        try {
            switch (selectedAlgorithm) {
                case 'md5':
                    hash = md5(data);
                    break;
                case 'sha1':
                    hash = sha1(data);
                    break;
                case 'sha256':
                    hash = sha256(data);
                    break;
                case 'sha512':
                    hash = sha512(data);
                    break;
                default:
                    hash = md5(data);
            }
            
            hashResult.textContent = hash;
            showNotification('Хеш вычислен!');
            
        } catch (error) {
            alert('Ошибка при вычислении хеша');
            console.error(error);
        }
    }
    
    function compareHashes() {
        hashComparison.style.display = 'block';
        
        const hash1Value = hash1.value.trim();
        const hash2Value = hash2.value.trim();
        
        if (!hash1Value || !hash2Value) {
            comparisonResult.textContent = 'Введите оба хеша для сравнения';
            comparisonResult.style.color = '#ff9e00';
            return;
        }
        
        if (hash1Value === hash2Value) {
            comparisonResult.textContent = 'Хеши идентичны';
            comparisonResult.style.color = '#4cc9f0';
        } else {
            comparisonResult.textContent = 'Хеши различны';
            comparisonResult.style.color = '#ff6584';
        }
    }
    
    // Упрощённые функции хеширования (для демонстрации)
    function md5(str) {
        // Упрощённая версия для демонстрации
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(32, '0');
    }
    
    function sha1(str) {
        // Упрощённая версия для демонстрации
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 3) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(40, '0');
    }
    
    function sha256(str) {
        // Упрощённая версия для демонстрации
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 7) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    }
    
    function sha512(str) {
        // Упрощённая версия для демонстрации
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 9) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(128, '0');
    }
    
    // Проверка утечек
    function checkLeak() {
        const password = leakCheckInput.value;
        
        if (!password) {
            alert('Введите пароль для проверки');
            return;
        }
        
        // Имитация проверки в локальной базе
        const isLeaked = LEAKED_PASSWORDS.includes(password.toLowerCase());
        
        if (isLeaked) {
            leakResult.innerHTML = `
                <div class="leak-status danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <h4>Пароль найден в утечках!</h4>
                        <p>Этот пароль был скомпрометирован в известных утечках данных. Настоятельно рекомендуется изменить его.</p>
                    </div>
                </div>
            `;
        } else {
            leakResult.innerHTML = `
                <div class="leak-status safe">
                    <i class="fas fa-shield-alt"></i>
                    <div>
                        <h4>Пароль безопасен</h4>
                        <p>Не обнаружен в локальной базе утекших паролей</p>
                    </div>
                </div>
            `;
        }
        
        // Обновляем статистику
        commonLeaks.textContent = LEAKED_PASSWORDS.length;
        totalChecks.textContent = ++totalChecksCount;
        localStorage.setItem('totalChecks', totalChecksCount);
    }
    
    function updateStats() {
        leakDBcount.textContent = LEAKED_PASSWORDS.length;
        commonLeaks.textContent = LEAKED_PASSWORDS.length;
        totalChecks.textContent = totalChecksCount;
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
    `;
    document.head.appendChild(style);
});