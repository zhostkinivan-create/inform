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
        q1: 1, // Информация - сведения об объектах и событиях
        q2: 2, // Достоверность
        q3: 0, // Данные - сведения в формализованном виде
        q4: 1, // Математическая символика, нотная грамота
        q5: 1, // Актуальность
        q6: 1  // Знания и понимание
    };

    // Пояснения к вопросам
    const explanations = {
        q1: 'Информация — это сведения об объектах и событиях окружающего мира.',
        q2: 'Достоверность означает, что информация должна быть верной и правдивой.',
        q3: 'Данные — это сведения, представленные в формализованном виде.',
        q4: 'Формальные языки: математическая символика, нотная грамота, шрифт Брайля.',
        q5: 'Актуальность — свойство информации быть важной в текущий момент.',
        q6: 'Человек извлекает информацию из данных благодаря своим знаниям.'
    };

    // Названия вопросов
    const questionNames = {
        q1: 'Вопрос 1. Что такое информация?',
        q2: 'Вопрос 2. Какое свойство означает, что информация верна?',
        q3: 'Вопрос 3. Что такое данные?',
        q4: 'Вопрос 4. Какие языки относятся к формальным?',
        q5: 'Вопрос 5. Почему информация с опозданием становится бесполезной?',
        q6: 'Вопрос 6. Что помогает извлечь информацию из данных?'
    };

    // Тексты правильных ответов для отображения
    const correctTexts = {
        q1: 'Сведения об объектах и событиях окружающего мира',
        q2: 'Достоверность',
        q3: 'Сведения, представленные в формализованном виде',
        q4: 'Математическая символика, нотная грамота',
        q5: 'Она теряет актуальность',
        q6: 'Знания и понимание языка/способа представления'
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
            message = '🎉 Отлично! Вы отлично усвоили тему "Информация и данные"!';
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
            const icon = res.isCorrect ? '✅' : '❌';
            const statusClass = res.isCorrect ? 'correct-answer' : 'wrong-answer';
            
            // Определяем, что выбрал пользователь
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

            detailsHTML += `
                <li style="padding: 8px 0; border-bottom: 1px solid #eef2f7;">
                    <strong class="${statusClass}">${icon} ${questionNames[res.id]}</strong><br>
                    <span style="font-size:0.95rem;">
                        Ваш ответ: ${selectedText}<br>
                        ${!res.isCorrect ? `<span class="wrong-answer">✅ Правильный ответ: ${correctTexts[res.id]}</span>` : ''}
                        <br><span style="font-size:0.85rem; color:#666;">${explanations[res.id]}</span>
                    </span>
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