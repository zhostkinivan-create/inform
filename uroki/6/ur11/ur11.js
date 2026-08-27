// === Тест для самоконтроля ===
document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('check-test');
    const testForm = document.getElementById('test-form');
    const resultContainer = document.getElementById('test-result');
    const scoreNumber = document.getElementById('score-number');
    const resultMessage = document.getElementById('result-message');
    const resultDetails = document.getElementById('result-details');

    // Правильные ответы (индексы правильных вариантов)
    const correctAnswers = {
        q1: 1, // Информация - сведения об объектах и событиях
        q2: 2, // Достоверность
        q3: 0, // Данные - сведения в формализованном виде
        q4: 1, // Математическая символика, нотная грамота
        q5: 1, // Актуальность
        q6: 1  // Знания и понимание
    };

    // Сообщения для каждого вопроса (для пояснения)
    const questionExplanations = {
        q1: 'Информация — это сведения об объектах и событиях окружающего мира.',
        q2: 'Достоверность означает, что информация должна быть верной и правдивой.',
        q3: 'Данные — это сведения, представленные в формализованном виде (на формальном языке).',
        q4: 'Формальные языки: математическая символика, нотная грамота, шрифт Брайля и др.',
        q5: 'Актуальность — свойство информации быть важной в текущий момент времени.',
        q6: 'Человек извлекает информацию из данных благодаря своим знаниям и пониманию языка.'
    };

    // Названия вопросов для отображения
    const questionNames = {
        q1: 'Вопрос 1',
        q2: 'Вопрос 2',
        q3: 'Вопрос 3',
        q4: 'Вопрос 4',
        q5: 'Вопрос 5',
        q6: 'Вопрос 6'
    };

    checkBtn.addEventListener('click', function() {
        // Собираем ответы
        const answers = {};
        let allAnswered = true;
        let score = 0;

        // Проверяем каждый вопрос
        for (const [qName, correctIndex] of Object.entries(correctAnswers)) {
            const selectedOption = document.querySelector(`input[name="${qName}"]:checked`);
            
            if (selectedOption) {
                const value = parseInt(selectedOption.value);
                answers[qName] = {
                    selected: value,
                    correct: value === correctIndex,
                    correctIndex: correctIndex
                };
                if (value === correctIndex) {
                    score++;
                }
            } else {
                allAnswered = false;
                answers[qName] = {
                    selected: null,
                    correct: false,
                    correctIndex: correctIndex
                };
            }
        }

        // Показываем результаты
        resultContainer.style.display = 'block';
        scoreNumber.textContent = score;

        // Сообщение в зависимости от результата
        let message = '';
        if (score === 6) {
            message = '🎉 Отлично! Вы отлично усвоили тему "Информация и данные"!';
        } else if (score >= 4) {
            message = '👍 Хорошо! Вы хорошо поняли материал. Поработайте над ошибками, чтобы закрепить знания.';
        } else if (score >= 3) {
            message = '📖 Неплохо, но стоит повторить материал. Внимательно прочитайте параграф ещё раз.';
        } else {
            message = '📚 К сожалению, результат ниже среднего. Рекомендуем перечитать § 1 учебника и посмотреть презентацию.';
        }

        if (!allAnswered) {
            message += ' ⚠️ Вы ответили не на все вопросы.';
        }
        resultMessage.textContent = message;

        // Детали по каждому вопросу
        let detailsHTML = '<h4>Разбор ответов:</h4><ul style="list-style:none; padding:0;">';
        for (const [qName, data] of Object.entries(answers)) {
            const isCorrect = data.correct;
            const icon = isCorrect ? '✅' : '❌';
            const statusClass = isCorrect ? 'correct-answer' : 'wrong-answer';
            
            // Определяем, что выбрал пользователь
            let selectedText = 'Не выбрано';
            if (data.selected !== null) {
                const optionLabel = document.querySelector(`input[name="${qName}"]:checked`);
                if (optionLabel) {
                    const parentLabel = optionLabel.closest('label');
                    if (parentLabel) {
                        selectedText = parentLabel.textContent.trim();
                    }
                }
            }

            detailsHTML += `
                <li style="padding: 8px 0; border-bottom: 1px solid #eef2f7;">
                    <strong class="${statusClass}">${icon} ${questionNames[qName]}</strong><br>
                    <span style="font-size:0.95rem;">
                        Ваш ответ: ${selectedText}<br>
                        ${!isCorrect ? `<span class="wrong-answer">Правильный ответ: ${getCorrectAnswerText(qName, data.correctIndex)}</span>` : ''}
                        <br><span style="font-size:0.85rem; color:#666;">${questionExplanations[qName]}</span>
                    </span>
                </li>
            `;
        }
        detailsHTML += '</ul>';
        resultDetails.innerHTML = detailsHTML;

        // Прокручиваем к результатам
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Вспомогательная функция для получения текста правильного ответа
    function getCorrectAnswerText(qName, correctIndex) {
        const options = document.querySelectorAll(`input[name="${qName}"]`);
        for (const option of options) {
            if (parseInt(option.value) === correctIndex) {
                const parentLabel = option.closest('label');
                return parentLabel ? parentLabel.textContent.trim() : 'Не удалось определить';
            }
        }
        return 'Не удалось определить';
    }

    // Сброс теста - скрываем результаты при сбросе
    document.querySelector('.btn-reset').addEventListener('click', function() {
        resultContainer.style.display = 'none';
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