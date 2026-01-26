// Скрипт для страницы "Безопасность"

document.addEventListener('DOMContentLoaded', function() {
    // Анимация карточек понятий
    const conceptCards = document.querySelectorAll('.concept-card');
    
    const conceptObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    conceptCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        conceptObserver.observe(card);
    });
    
    // Упражнение 1: Выбор пароля
    const exercise1Check = document.querySelector('[data-exercise="1"]');
    const options1 = document.querySelectorAll('#exercise1 .option');
    
    exercise1Check?.addEventListener('click', function() {
        options1.forEach(option => {
            const isCorrect = option.dataset.correct === 'true';
            const input = option.querySelector('input');
            
            if (input.checked) {
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });
        
        // Показать объяснение
        const explanation = document.querySelector('#exercise1 .exercise-explanation');
        explanation?.classList.add('show');
    });
    
    // Упражнение 2: Фишинг
    const exercise2Check = document.querySelector('[data-exercise="2"]');
    const checkboxes = document.querySelectorAll('#exercise2 input[type="checkbox"]');
    
    exercise2Check?.addEventListener('click', function() {
        let allChecked = true;
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });
        
        if (allChecked) {
            checkboxes.forEach(checkbox => {
                checkbox.parentElement.style.color = '#4cc9f0';
                checkbox.parentElement.style.fontWeight = 'bold';
            });
        }
        
        // Показать объяснение
        const explanation = document.querySelector('#exercise2 .exercise-explanation');
        explanation?.classList.add('show');
    });
    
    // Упражнение 3: Соответствия
    const exercise3Check = document.querySelector('[data-exercise="3"]');
    const exercise3Reset = document.querySelector('.reset-matching[data-exercise="3"]');
    const matchesContainer = document.querySelector('.matches-container');
    const situations = document.querySelectorAll('.situation');
    const violations = document.querySelectorAll('.violation');
    
   
    // Правильные соответствия
const correctMatches = {
    '1': 'criminal',    // Взлом журнала → Уголовное преступление (ст. 349 УК РБ)
    '2': 'criminal',    // Публикация чужих фото → Уголовное преступление (ст. 203¹ УК РБ)
    '3': 'administrative', // Спам → Административное правонарушение (ст. 22.6 КоАП РБ)
    '4': 'administrative'  // Фальшивый аккаунт → Административное правонарушение (ст. 22.6 КоАП РБ)
};
    
    let currentMatches = {};
    let draggedElement = null;
    
    // Drag and Drop функционал
    situations.forEach(situation => {
        situation.setAttribute('draggable', 'true');
        
        situation.addEventListener('dragstart', function(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.dataset.id);
        });
        
        situation.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedElement = null;
        });
    });
    
    violations.forEach(violation => {
        violation.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(108, 99, 255, 0.6)';
        });
        
        violation.addEventListener('dragleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        violation.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            
            const situationId = e.dataTransfer.getData('text/plain');
            const violationType = this.dataset.type;
            
            // Добавить соответствие
            currentMatches[situationId] = violationType;
            
            // Обновить отображение
            updateMatchesDisplay();
        });
    });
    
    function updateMatchesDisplay() {
        matchesContainer.innerHTML = '';
        
        Object.keys(currentMatches).forEach(situationId => {
            const situation = document.querySelector(`.situation[data-id="${situationId}"]`);
            const violationType = currentMatches[situationId];
            const violation = document.querySelector(`.violation[data-type="${violationType}"]`);
            
            if (situation && violation) {
                const matchItem = document.createElement('div');
                matchItem.className = 'match-item';
                matchItem.innerHTML = `
                    <span>${situation.textContent}</span>
                    <span class="match-arrow">→</span>
                    <span>${violation.textContent}</span>
                `;
                matchesContainer.appendChild(matchItem);
            }
        });
    }
    
    // Проверка упражнения 3
    exercise3Check?.addEventListener('click', function() {
        let correctCount = 0;
        const totalMatches = Object.keys(correctMatches).length;
        
        Object.keys(correctMatches).forEach(situationId => {
            if (currentMatches[situationId] === correctMatches[situationId]) {
                correctCount++;
            }
        });
        
        // Показать результат
        const explanation = document.querySelector('#exercise3 .exercise-explanation');
        if (explanation) {
            if (correctCount === totalMatches) {
                explanation.innerHTML = `
                    <p><strong>Отлично! Все соответствия верны!</strong></p>
                    <p><strong>Правильные соответствия:</strong></p>
    <ul>
        <li><strong>Взлом электронного журнала</strong> → Уголовное преступление (ст. 349 УК РБ "Несанкционированный доступ к компьютерной информации")</li>
        <li><strong>Публикация чужих фотографий без согласия</strong> → Уголовное преступление (ст. 203¹ УК РБ "Нарушение неприкосновенности частной жизни")</li>
        <li><strong>Массовая рассылка спама одноклассникам</strong> → Административное правонарушение (ст. 22.6 КоАП РБ "Нарушение порядка распространения информации")</li>
        <li><strong>Создание фиктивного аккаунта учителя</strong> → Административное правонарушение (ст. 22.6 КоАП РБ "Распространение заведомо ложной информации")</li>
    </ul>
                `;
            } else {
                explanation.innerHTML = `
                    <p><strong>Есть ошибки. Попробуйте ещё раз!</strong></p>
                    <p><strong>Правильные соответствия:</strong></p>
    <ul>
        <li><strong>Взлом электронного журнала</strong> → Уголовное преступление (ст. 349 УК РБ "Несанкционированный доступ к компьютерной информации")</li>
        <li><strong>Публикация чужих фотографий без согласия</strong> → Уголовное преступление (ст. 203¹ УК РБ "Нарушение неприкосновенности частной жизни")</li>
        <li><strong>Массовая рассылка спама одноклассникам</strong> → Административное правонарушение (ст. 22.6 КоАП РБ "Нарушение порядка распространения информации")</li>
        <li><strong>Создание фиктивного аккаунта учителя</strong> → Административное правонарушение (ст. 22.6 КоАП РБ "Распространение заведомо ложной информации")</li>
    </ul>
                `;
            }
            explanation.classList.add('show');
        }
    });
    
    // Сброс упражнения 3
    exercise3Reset?.addEventListener('click', function() {
        currentMatches = {};
        matchesContainer.innerHTML = '';
        const explanation = document.querySelector('#exercise3 .exercise-explanation');
        explanation?.classList.remove('show');
    });
    
    // Анимация схемы
    const schemeNodes = document.querySelectorAll('.scheme-node');
    
    schemeNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.2}s`;
        node.style.animation = 'nodeFloat 3s ease-in-out infinite';
    });
    
    // Добавляем стиль для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes nodeFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    // Консольное сообщение
    console.log('%c🛡️ Добро пожаловать на страницу Информационной Безопасности!', 'color: #36d1dc; font-size: 16px; font-weight: bold;');
    console.log('%c🔐 Помни: Безопасность начинается с тебя!', 'color: #6c63ff; font-size: 14px;');
    console.log('%c⚠️ Все материалы на странице соответствуют законодательству Республики Беларусь', 'color: #ff6584; font-size: 12px;');
});