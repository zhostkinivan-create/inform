// === ТЕСТ ДЛЯ САМОКОНТРОЛЯ ===
document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('check-test');
    const resultContainer = document.getElementById('test-result');
    const scoreNumber = document.getElementById('score-number');
    const resultMessage = document.getElementById('result-message');
    const resultDetails = document.getElementById('result-details');

    // ПРАВИЛЬНЫЕ ОТВЕТЫ (индексы от 0)
    const correctAnswers = {
        q1: 1, // Точное предписание исполнителю
        q2: 1, // Дискретность
        q3: 1, // Никлаус Вирт
        q4: 1, // writeln
        q5: 1, // Применим к целому классу задач
        q6: 1  // var
    };

    // Пояснения к вопросам
    const explanations = {
        q1: 'Алгоритм — это точное и понятное предписание исполнителю выполнить последовательность действий.',
        q2: 'Дискретность означает, что алгоритм состоит из отдельных шагов (команд).',
        q3: 'Язык Pascal был создан Никлаусом Виртом в 1970 году и назван в честь Блеза Паскаля.',
        q4: 'Команда writeln выводит данные на экран и переводит курсор на новую строку.',
        q5: 'Массовость означает, что алгоритм применим к целому классу задач, а не к одной конкретной.',
        q6: 'Раздел var используется для описания переменных, которые будут использоваться в программе.'
    };

    // Названия вопросов
    const questionNames = {
        q1: 'Вопрос 1. Что такое алгоритм?',
        q2: 'Вопрос 2. Какое свойство алгоритма означает, что он состоит из отдельных шагов?',
        q3: 'Вопрос 3. Кто создал язык программирования Pascal?',
        q4: 'Вопрос 4. Какая команда в Pascal используется для вывода данных на экран?',
        q5: 'Вопрос 5. Что означает свойство алгоритма «массовость»?',
        q6: 'Вопрос 6. Как называется раздел программы на Pascal, где описываются переменные?'
    };

    // Тексты правильных ответов
    const correctTexts = {
        q1: 'Точное предписание исполнителю выполнить последовательность действий',
        q2: 'Дискретность',
        q3: 'Никлаус Вирт',
        q4: 'writeln',
        q5: 'Алгоритм должен быть применим к целому классу задач',
        q6: 'var'
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
            message = '🎉 Отлично! Вы отлично усвоили тему "Алгоритм и его свойства. Языки программирования"!';
        } else if (score >= 4) {
            message = '👍 Хорошо! Вы хорошо поняли материал. Поработайте над ошибками.';
        } else if (score >= 3) {
            message = '📖 Неплохо, но стоит повторить материал. Внимательно прочитайте параграф ещё раз.';
        } else {
            message = '📚 Результат ниже среднего. Рекомендуем перечитать § 1-2 учебника и посмотреть презентацию.';
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