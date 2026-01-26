// computer-script.js - Скрипт для модели компьютера

document.addEventListener('DOMContentLoaded', function() {
    // Переменные для анимаций
    let flowAnimation = null;
    let currentFlowStep = 0;
    let isFlowRunning = false;
    
    // Анимации компонентов
    let cpuAnimation = null;
    let ramAnimation = null;
    let hddAnimation = null;
    let ioAnimation = null;
    
    // Счетчик правильных ответов для теста
    let correctAnswersCount = 0;
    
    // Элементы DOM
    const startFlowBtn = document.getElementById('startFlow');
    const pauseFlowBtn = document.getElementById('pauseFlow');
    const resetFlowBtn = document.getElementById('resetFlow');
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const cycleSteps = document.querySelectorAll('.cycle-step');
    
    const visualToggles = document.querySelectorAll('.visual-toggle');
    const refTabs = document.querySelectorAll('.ref-tab-simple');
    const checkAnswerBtns = document.querySelectorAll('.check-answer-btn');
    const resetTestBtn = document.getElementById('resetTestBtn');
    
    // Элементы теста
    const scoreElement = document.getElementById('correctAnswers');
    const quizResults = document.getElementById('testResults');
    
    // Инициализация
    init();
    
    function init() {
        setupEventListeners();
        resetFlow();
        resetTest();
    }
    
    function setupEventListeners() {
        // Управление потоком работы
        startFlowBtn.addEventListener('click', startFlow);
        pauseFlowBtn.addEventListener('click', pauseFlow);
        resetFlowBtn.addEventListener('click', resetFlow);
        
        // Визуализация компонентов
        visualToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const visualId = this.closest('.component-visual').id;
                toggleVisualization(visualId);
            });
        });
        
        // Справочник
        refTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const component = this.dataset.component;
                showRefSection(component);
                
                refTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Тест
        checkAnswerBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const questionNum = this.dataset.question;
                checkAnswer(questionNum);
            });
        });
        
        resetTestBtn.addEventListener('click', resetTest);
        
        // Клики по элементам визуализации
        document.querySelectorAll('.instruction').forEach(instr => {
            instr.addEventListener('click', function() {
                this.style.background = 'rgba(54, 209, 220, 0.4)';
                setTimeout(() => {
                    this.style.background = 'rgba(54, 209, 220, 0.2)';
                }, 500);
            });
        });
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', function() {
                const value = this.dataset.value;
                this.style.background = 'rgba(255, 101, 132, 0.4)';
                this.textContent = 'READ';
                setTimeout(() => {
                    this.style.background = 'rgba(255, 101, 132, 0.2)';
                    this.textContent = value;
                }, 1000);
            });
        });
        
        document.querySelectorAll('.device').forEach(device => {
            device.addEventListener('click', function() {
                this.style.transform = 'scale(1.1)';
                this.style.background = 'rgba(255, 154, 0, 0.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.background = 'rgba(255, 255, 255, 0.05)';
                }, 500);
            });
        });
    }
    
    // Функции для потока работы компьютера
    function startFlow() {
        if (isFlowRunning) return;
        
        isFlowRunning = true;
        currentFlowStep = 0;
        
        startFlowBtn.disabled = true;
        pauseFlowBtn.disabled = false;
        
        flowAnimation = setInterval(() => {
            // Сбрасываем предыдущий шаг
            if (currentFlowStep > 0) {
                workflowSteps[currentFlowStep - 1].classList.remove('active');
                cycleSteps[currentFlowStep - 1].classList.remove('active');
            }
            
            // Активируем текущий шаг
            if (currentFlowStep < workflowSteps.length) {
                workflowSteps[currentFlowStep].classList.add('active');
                cycleSteps[currentFlowStep].classList.add('active');
                currentFlowStep++;
            } else {
                // Завершаем цикл
                pauseFlow();
                setTimeout(resetFlow, 2000);
            }
        }, 1500);
    }
    
    function pauseFlow() {
        if (!isFlowRunning) return;
        
        isFlowRunning = false;
        clearInterval(flowAnimation);
        
        startFlowBtn.disabled = false;
        pauseFlowBtn.disabled = true;
    }
    
    function resetFlow() {
        pauseFlow();
        
        // Сбрасываем все шаги
        workflowSteps.forEach(step => step.classList.remove('active'));
        cycleSteps.forEach(step => step.classList.remove('active'));
        
        // Активируем первый шаг описания
        cycleSteps[0].classList.add('active');
        
        currentFlowStep = 0;
        startFlowBtn.disabled = false;
        pauseFlowBtn.disabled = true;
    }
    
    // Функции для визуализации компонентов
    function toggleVisualization(visualId) {
        const toggleBtn = document.querySelector(`#${visualId} .visual-toggle`);
        const isRunning = toggleBtn.innerHTML.includes('Остановить');
        
        if (isRunning) {
            stopVisualization(visualId);
            toggleBtn.innerHTML = '<i class="fas fa-play"></i> Запустить';
        } else {
            startVisualization(visualId);
            toggleBtn.innerHTML = '<i class="fas fa-stop"></i> Остановить';
        }
    }
    
    function startVisualization(visualId) {
        switch(visualId) {
            case 'cpuVisual':
                startCPUAnimation();
                break;
            case 'ramVisual':
                startRAMAnimation();
                break;
            case 'hddVisual':
                startHDDAnimation();
                break;
            case 'ioVisual':
                startIOAnimation();
                break;
        }
    }
    
    function stopVisualization(visualId) {
        switch(visualId) {
            case 'cpuVisual':
                stopCPUAnimation();
                break;
            case 'ramVisual':
                stopRAMAnimation();
                break;
            case 'hddVisual':
                stopHDDAnimation();
                break;
            case 'ioVisual':
                stopIOAnimation();
                break;
        }
    }
    
    function startCPUAnimation() {
        const instructions = document.querySelectorAll('.instruction');
        let index = 0;
        
        cpuAnimation = setInterval(() => {
            // Сбрасываем предыдущую инструкцию
            if (index > 0) {
                instructions[index - 1].style.background = 'rgba(54, 209, 220, 0.2)';
                instructions[index - 1].style.transform = 'scale(1)';
            }
            
            // Подсвечиваем текущую инструкцию
            instructions[index].style.background = 'rgba(54, 209, 220, 0.4)';
            instructions[index].style.transform = 'scale(1.1)';
            
            index = (index + 1) % instructions.length;
        }, 800);
    }
    
    function stopCPUAnimation() {
        clearInterval(cpuAnimation);
        document.querySelectorAll('.instruction').forEach(instr => {
            instr.style.background = 'rgba(54, 209, 220, 0.2)';
            instr.style.transform = 'scale(1)';
        });
    }
    
    function startRAMAnimation() {
        const cells = document.querySelectorAll('.cell');
        let index = 0;
        
        ramAnimation = setInterval(() => {
            // Сбрасываем предыдущую ячейку
            if (index > 0) {
                cells[index - 1].style.background = 'rgba(255, 101, 132, 0.2)';
            }
            
            // Читаем текущую ячейку
            const originalValue = cells[index].dataset.value;
            cells[index].style.background = 'rgba(255, 101, 132, 0.4)';
            cells[index].textContent = 'READ';
            
            setTimeout(() => {
                cells[index].style.background = 'rgba(255, 101, 132, 0.2)';
                cells[index].textContent = originalValue;
            }, 400);
            
            index = (index + 1) % cells.length;
        }, 1000);
    }
    
    function stopRAMAnimation() {
        clearInterval(ramAnimation);
        document.querySelectorAll('.cell').forEach(cell => {
            const originalValue = cell.dataset.value;
            cell.style.background = 'rgba(255, 101, 132, 0.2)';
            cell.textContent = originalValue;
        });
    }
    
    function startHDDAnimation() {
        // Анимация уже работает через CSS, просто меняем скорость
        const platters = document.querySelectorAll('.platter');
        platters.forEach(platter => {
            platter.style.animationDuration = '5s';
        });
    }
    
    function stopHDDAnimation() {
        const platters = document.querySelectorAll('.platter');
        platters.forEach(platter => {
            platter.style.animationDuration = '20s';
        });
    }
    
    function startIOAnimation() {
        const inputDevices = document.querySelectorAll('.input-devices .device');
        const outputDevices = document.querySelectorAll('.output-devices .device');
        let inputIndex = 0;
        let outputIndex = 0;
        
        ioAnimation = setInterval(() => {
            // Анимация устройств ввода
            inputDevices[inputIndex].style.transform = 'scale(1.1)';
            inputDevices[inputIndex].style.background = 'rgba(255, 154, 0, 0.2)';
            
            setTimeout(() => {
                inputDevices[inputIndex].style.transform = 'scale(1)';
                inputDevices[inputIndex].style.background = 'rgba(255, 255, 255, 0.05)';
            }, 500);
            
            // Анимация устройств вывода (с задержкой)
            setTimeout(() => {
                outputDevices[outputIndex].style.transform = 'scale(1.1)';
                outputDevices[outputIndex].style.background = 'rgba(255, 154, 0, 0.2)';
                
                setTimeout(() => {
                    outputDevices[outputIndex].style.transform = 'scale(1)';
                    outputDevices[outputIndex].style.background = 'rgba(255, 255, 255, 0.05)';
                }, 500);
            }, 250);
            
            inputIndex = (inputIndex + 1) % inputDevices.length;
            outputIndex = (outputIndex + 1) % outputDevices.length;
        }, 1500);
    }
    
    function stopIOAnimation() {
        clearInterval(ioAnimation);
        document.querySelectorAll('.device').forEach(device => {
            device.style.transform = 'scale(1)';
            device.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    }
    
    // Функции для справочника
    function showRefSection(component) {
        document.querySelectorAll('.ref-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.getElementById(`${component}Ref`).classList.add('active');
    }
    
    // Функции для теста
    function checkAnswer(questionNum) {
        const questionId = `testQuestion${questionNum}`;
        const questionElement = document.getElementById(questionId);
        const selectedOption = questionElement.querySelector('input[name="q' + questionNum + '"]:checked');
        const explanationElement = document.getElementById(`explanation${questionNum}`);
        
        if (!selectedOption) {
            explanationElement.textContent = 'Пожалуйста, выберите ответ';
            explanationElement.style.display = 'block';
            return;
        }
        
        const selectedValue = selectedOption.value;
        let isCorrect = false;
        let explanation = '';
        
        // Проверяем ответы
        switch(questionNum) {
            case '1':
                isCorrect = selectedValue === '2';
                explanation = isCorrect 
                    ? 'Правильно! АЛУ (Арифметико-Логическое Устройство) выполняет все математические и логические операции.'
                    : 'Неверно. Правильный ответ: АЛУ выполняет арифметические и логические операции. Устройство управления руководит выполнением инструкций.';
                break;
            case '2':
                isCorrect = selectedValue === '2';
                explanation = isCorrect 
                    ? 'Правильно! Оперативная память (RAM) является энергозависимой — данные теряются при выключении питания.'
                    : 'Неверно. Правильный ответ: Оперативная память (RAM). Жёсткие диски, флеш-память и DVD-диски сохраняют данные при выключении питания.';
                break;
        }
        
        // Показываем объяснение
        explanationElement.textContent = explanation;
        explanationElement.style.display = 'block';
        
        // Подсвечиваем правильность
        const allOptions = questionElement.querySelectorAll('.option');
        allOptions.forEach(option => {
            option.style.borderColor = '';
        });
        
        const selectedOptionElement = selectedOption.closest('.option');
        selectedOptionElement.style.borderColor = isCorrect ? '#4cc9f0' : '#ff6584';
        
        // Обновляем счетчик правильных ответов
        if (isCorrect) {
            correctAnswersCount = Math.min(correctAnswersCount + 1, 2);
        }
        
        // Обновляем отображение результатов
        scoreElement.textContent = correctAnswersCount;
        quizResults.style.display = 'block';
    }
    
    function resetTest() {
        // Сбрасываем радио-кнопки
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        
        // Скрываем объяснения
        document.querySelectorAll('.answer-explanation').forEach(explanation => {
            explanation.style.display = 'none';
        });
        
        // Сбрасываем подсветку
        document.querySelectorAll('.option').forEach(option => {
            option.style.borderColor = '';
        });
        
        // Сбрасываем счетчик
        correctAnswersCount = 0;
        scoreElement.textContent = '0';
        quizResults.style.display = 'none';
    }
});