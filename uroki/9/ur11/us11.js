// === ТЕСТ ДЛЯ САМОКОНТРОЛЯ ===
document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('check-test');
    const resultContainer = document.getElementById('test-result');
    const scoreNumber = document.getElementById('score-number');
    const resultMessage = document.getElementById('result-message');
    const resultDetails = document.getElementById('result-details');

    // ПРАВИЛЬНЫЕ ОТВЕТЫ (индексы от 0)
    const correctAnswers = {
        q1: 1, // Уникальный числовой идентификатор
        q2: 0, // 192.168.1.1 (правильный формат)
        q3: 1, // Статический не меняется, динамический может меняться
        q4: 1, // Для надёжной передачи данных с проверкой доставки
        q5: 1, // Secure (безопасный)
        q6: 1, // Преобразует доменные имена в IP-адреса
        q7: 1, // Уникальный физический адрес сетевого устройства
        q8: 1  // 32 бита
    };

    // Пояснения к вопросам
    const explanations = {
        q1: 'IP-адрес — это уникальный числовой идентификатор устройства в сети Интернет.',
        q2: 'IP-адрес состоит из 4 чисел, разделённых точками. Каждое число от 0 до 255.',
        q3: 'Статический IP-адрес не меняется, а динамический может меняться при каждом подключении.',
        q4: 'Протокол TCP обеспечивает надёжную передачу данных с проверкой доставки пакетов.',
        q5: 'Буква S в HTTPS означает Secure — безопасный, шифрованный протокол.',
        q6: 'DNS-сервер преобразует понятные человеку доменные имена в числовые IP-адреса.',
        q7: 'MAC-адрес — это уникальный физический адрес, который присваивается сетевому устройству на заводе.',
        q8: 'IPv4-адрес состоит из 32 бит (4 октета по 8 бит).'
    };

    // Названия вопросов
    const questionNames = {
        q1: 'Вопрос 1. Что такое IP-адрес?',
        q2: 'Вопрос 2. Какой IP-адрес записан правильно?',
        q3: 'Вопрос 3. Чем отличается статический IP от динамического?',
        q4: 'Вопрос 4. Для чего нужен протокол TCP?',
        q5: 'Вопрос 5. Что означает буква S в протоколе HTTPS?',
        q6: 'Вопрос 6. Что делает DNS-сервер?',
        q7: 'Вопрос 7. Что такое MAC-адрес?',
        q8: 'Вопрос 8. Сколько бит содержит IPv4-адрес?'
    };

    // Тексты правильных ответов
    const correctTexts = {
        q1: 'Уникальный числовой идентификатор устройства в сети',
        q2: '192.168.1.1',
        q3: 'Статический не меняется, динамический может меняться',
        q4: 'Для надёжной передачи данных с проверкой доставки',
        q5: 'Secure (безопасный)',
        q6: 'Преобразует доменные имена в IP-адреса',
        q7: 'Уникальный физический адрес сетевого устройства',
        q8: '32 бита'
    };

    checkBtn.addEventListener('click', function() {
        let score = 0;
        let allAnswered = true;
        const results = [];

        // Проверяем каждый вопрос
        for (const [qName, correctIndex] of Object.entries(correctAnswers)) {
            const selected = document.querySelector(`input[name="${qName}"]:checked`);
            const isAnswered = selected !== null;
            const userAnswer = isAnswered ? parseInt(selected.value) : -1;
            const isCorrect = isAnswered && (userAnswer === correctIndex);

            if (isCorrect) score++;
            if (!isAnswered) allAnswered = false;

            results.push({
                id: qName,
                userAnswer: userAnswer,
                correctIndex: correctIndex,
                isCorrect: isCorrect,
                isAnswered: isAnswered
            });
        }

        // === ПОКАЗЫВАЕМ РЕЗУЛЬТАТЫ ===
        resultContainer.style.display = 'block';
        scoreNumber.textContent = score;

        // Сообщение в зависимости от результата
        let message = '';
        if (score === 8) {
            message = '🎉 Отлично! Вы отлично усвоили тему "Организация сети Интернет"!';
        } else if (score >= 6) {
            message = '👍 Хорошо! Вы хорошо поняли материал. Поработайте над ошибками.';
        } else if (score >= 4) {
            message = '📖 Неплохо, но стоит повторить материал. Внимательно прочитайте параграф ещё раз.';
        } else {
            message = '📚 Результат ниже среднего. Рекомендуем перечитать § 1 учебника и посмотреть презентацию.';
        }

        if (!allAnswered) {
            message += ' ⚠️ Вы ответили не на все вопросы.';
        }
        resultMessage.textContent = message;

        // === ДЕТАЛЬНЫЙ РАЗБОР ===
        let detailsHTML = '<h4>Разбор ответов:</h4><ul style="list-style:none; padding:0;">';
        
        results.forEach((res) => {
            let selectedText = 'Не выбрано';
            if (res.isAnswered) {
                const selectedOption = document.querySelector(`input[name="${res.id}"]:checked`);
                if (selectedOption) {
                    const parentLabel = selectedOption.closest('label');
                    if (parentLabel) {
                        selectedText = parentLabel.textContent.trim();
                    }
                }
            }

            const icon = res.isCorrect ? '✅' : '❌';
            const statusColor = res.isCorrect ? '#27ae60' : '#e74c3c';
            const statusText = res.isCorrect ? 'Верно' : 'Неверно';

            let correctAnswerLine = '';
            if (!res.isCorrect) {
                correctAnswerLine = `<br><span style="color: #27ae60; font-weight: 500;">✓ Правильный ответ: ${correctTexts[res.id]}</span>`;
            }

            detailsHTML += `
                <li style="padding: 12px 0; border-bottom: 1px solid #eef2f7;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                        <span style="font-size: 1.2rem;">${icon}</span>
                        <strong style="color: ${statusColor};">${questionNames[res.id]}</strong>
                        <span style="font-size: 0.85rem; color: ${statusColor}; font-weight: 600; margin-left: auto;">${statusText}</span>
                    </div>
                    <div style="font-size: 0.95rem; color: #333; padding-left: 36px;">
                        Ваш ответ: <strong>${selectedText}</strong>
                        ${correctAnswerLine}
                        <br><span style="font-size: 0.85rem; color: #888;">${explanations[res.id]}</span>
                    </div>
                </li>
            `;
        });
        detailsHTML += '</ul>';
        resultDetails.innerHTML = detailsHTML;

        // Прокрутка к результатам
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Сброс теста
    document.querySelector('.btn-reset').addEventListener('click', function() {
        resultContainer.style.display = 'none';
        document.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
    });

    // Плавная прокрутка
    document.querySelectorAll('.lesson-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});