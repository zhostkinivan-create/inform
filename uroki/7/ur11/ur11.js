// === ТЕСТ ДЛЯ САМОКОНТРОЛЯ ===
document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('check-test');
    const testForm = document.getElementById('test-form');
    const resultContainer = document.getElementById('test-result');
    const scoreNumber = document.getElementById('score-number');
    const resultMessage = document.getElementById('result-message');
    const resultDetails = document.getElementById('result-details');

    // ПРАВИЛЬНЫЕ ОТВЕТЫ (индексы от 0)
    const correctAnswers = {
        q1: 1, // Универсальное устройство для работы с данными
        q2: 1, // Процессор
        q3: 1, // Временное хранение данных
        q4: 1, // Монитор
        q5: 1, // Устройства, обменивающиеся данными через Интернет
        q6: 0  // IBM 5150 (1981)
    };

    // Пояснения к вопросам
    const explanations = {
        q1: 'Компьютер — это универсальное устройство для работы с данными.',
        q2: 'Процессор называют «мозгом» компьютера, он выполняет все вычисления.',
        q3: 'Оперативная память предназначена для временного хранения данных во время работы компьютера.',
        q4: 'Монитор — устройство вывода изображения. Клавиатура и сканер — устройства ввода.',
        q5: 'Интернет вещей (IoT) — это устройства, которые обмениваются данными через Интернет.',
        q6: 'Первым персональным компьютером считается IBM 5150, выпущенный в 1981 году.'
    };

    // Названия вопросов
    const questionNames = {
        q1: 'Вопрос 1. Что такое компьютер?',
        q2: 'Вопрос 2. Какое устройство называют «мозгом» компьютера?',
        q3: 'Вопрос 3. Для чего предназначена оперативная память?',
        q4: 'Вопрос 4. Какое устройство относится к устройствам вывода?',
        q5: 'Вопрос 5. Что такое Интернет вещей (IoT)?',
        q6: 'Вопрос 6. Какой компьютер был первым персональным компьютером?'
    };

    // Тексты правильных ответов для отображения
    const correctTexts = {
        q1: 'Универсальное устройство для работы с данными',
        q2: 'Процессор',
        q3: 'Для временного хранения данных во время работы',
        q4: 'Монитор',
        q5: 'Устройства, обменивающиеся данными через Интернет',
        q6: 'IBM 5150 (1981)'
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
        if (score === 6) {
            message = '🎉 Отлично! Вы отлично усвоили тему "Современные компьютерные устройства"!';
        } else if (score >= 4) {
            message = '👍 Хорошо! Вы хорошо поняли материал. Поработайте над ошибками.';
        } else if (score >= 3) {
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
            // Определяем текст выбранного ответа
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

            // Иконка и статус
            const icon = res.isCorrect ? '✅' : '❌';
            const statusColor = res.isCorrect ? '#27ae60' : '#e74c3c';
            const statusText = res.isCorrect ? 'Верно' : 'Неверно';

            // Строка с правильным ответом (только если неверно)
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

    // Сброс теста - скрываем результаты
    document.querySelector('.btn-reset').addEventListener('click', function() {
        resultContainer.style.display = 'none';
        // Очищаем все radio-кнопки
        document.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
    });

    // Плавная прокрутка для навигации
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