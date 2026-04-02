document.addEventListener('DOMContentLoaded', function() {
    // МОБИЛЬНОЕ МЕНЮ
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => navList.classList.toggle('open'));
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.addEventListener('click', () => navList.classList.remove('open')));
    }

    // ========== УПРАЖНЕНИЕ 1.1: СООТНЕСЕНИЕ (SELECT-версия) ==========
    document.querySelector('#ex1 .btn-check').addEventListener('click', () => {
        const match1 = document.getElementById('match1').value;
        const match2 = document.getElementById('match2').value;
        const match3 = document.getElementById('match3').value;
        
        let correct = 0;
        if (match1 === 'ped') correct++;
        if (match2 === 'mp') correct++;
        if (match3 === 'project') correct++;
        
        const feedback = document.getElementById('ex1-feedback');
        if (correct === 3) {
            feedback.className = 'feedback success';
            feedback.innerHTML = '✅ Отлично! Все понятия соотнесены верно.';
        } else {
            feedback.className = 'feedback error';
            feedback.innerHTML = `❌ Правильно: ${correct} из 3. Педагогические условия — Б, Межпредметные связи — А, Проектная деятельность — В.`;
        }
    });

    document.querySelector('#ex1 .btn-show-answer').addEventListener('click', () => {
        const feedback = document.getElementById('ex1-feedback');
        feedback.className = 'feedback info';
        feedback.innerHTML = '📖 Правильные ответы:<br>1. Педагогические условия — Б<br>2. Межпредметные связи — А<br>3. Проектная деятельность — В';
    });

    // ========== УПРАЖНЕНИЕ 1.2: ВЫБЕРИ ОТВЕТ ==========
    document.querySelector('#ex2 .btn-check').addEventListener('click', () => {
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');
        const q4 = document.querySelector('input[name="q4"]:checked');
        let score = 0;
        if (q1 && q1.value === 'b') score++;
        if (q2 && q2.value === 'c') score++;
        if (q3 && q3.value === 'b') score++;
        if (q4 && q4.value === 'b') score++;
        const feedback = document.getElementById('ex2-feedback');
        feedback.className = 'feedback';
        if (score === 4) {
            feedback.classList.add('success');
            feedback.innerHTML = `✅ Превосходно! Все ответы верны (${score}/4).`;
        } else {
            feedback.classList.add('error');
            feedback.innerHTML = `📊 Правильных ответов: ${score}/4. Повторите теорию (функции, этапы, виды проектов, история метода).`;
        }
    });

    document.querySelector('#ex2 .btn-show-answer').addEventListener('click', () => {
        const feedback = document.getElementById('ex2-feedback');
        feedback.className = 'feedback info';
        feedback.innerHTML = '📖 Правильные ответы:<br>1 — Б (Развивающая)<br>2 — В (Обобщение информации)<br>3 — Б (Творческий)<br>4 — Б (Дж. Дьюи и В.Х. Килпатрик)';
    });

    // ========== УПРАЖНЕНИЕ 1.3: ВСТАВИТЬ СЛОВО ==========
    document.querySelector('#ex3 .btn-check').addEventListener('click', () => {
        const blanks = {
            blank1: ['внутренние', 'внутренних'],
            blank2: ['междисциплинарная', 'исследовательская', 'ментально-опосредованная', 'опосредованно-прикладная', 'междисциплинарных', 'исследовательских'],
            blank3: ['констатирующий', 'констатирующего'],
            blank4: ['производительности', 'производительность']
        };
        let score = 0;
        for (let i = 1; i <= 4; i++) {
            const userAnswer = document.getElementById(`blank${i}`).value.trim().toLowerCase();
            const possible = blanks[`blank${i}`];
            if (possible.includes(userAnswer)) score++;
        }
        const feedback = document.getElementById('ex3-feedback');
        feedback.className = 'feedback';
        if (score === 4) {
            feedback.classList.add('success');
            feedback.innerHTML = `✅ Отлично! Все пропуски заполнены верно (${score}/4).`;
        } else {
            feedback.classList.add('error');
            feedback.innerHTML = `📊 Верно заполнено: ${score}/4. Обратите внимание на терминологию.`;
        }
    });

    document.querySelector('#ex3 .btn-show-answer').addEventListener('click', () => {
        const feedback = document.getElementById('ex3-feedback');
        feedback.className = 'feedback info';
        feedback.innerHTML = '📖 Правильные ответы:<br>1 — внутренние<br>2 — междисциплинарная (или исследовательская, ментально-опосредованная, опосредованно-прикладная)<br>3 — констатирующий<br>4 — производительности';
    });

    // ========== УПРАЖНЕНИЕ 2.1: СОЕДИНИ ПРЕДМЕТ (SELECT-версия) ==========
    document.querySelector('#ex4 .btn-check').addEventListener('click', () => {
        const pair1 = document.getElementById('pair1').value;
        const pair2 = document.getElementById('pair2').value;
        const pair3 = document.getElementById('pair3').value;
        const pair4 = document.getElementById('pair4').value;
        
        let correct = 0;
        if (pair1 === 'music') correct++;      // Литература → Г (анализ произведений)
        if (pair2 === 'math') correct++;       // Математика → Б (логика, терминология)
        if (pair3 === 'lit') correct++;        // ИЗО → А (образность, описание)
        if (pair4 === 'art') correct++;        // Музыка → В (музыкальные впечатления)
        
        const feedback = document.getElementById('ex4-feedback');
        if (correct === 4) {
            feedback.className = 'feedback success';
            feedback.innerHTML = '✅ Отлично! Все пары составлены верно.';
        } else {
            feedback.className = 'feedback error';
            feedback.innerHTML = `❌ Правильно: ${correct} из 4. Литература — Г, Математика — Б, ИЗО — А, Музыка — В.`;
        }
    });

    document.querySelector('#ex4 .btn-show-answer').addEventListener('click', () => {
        const feedback = document.getElementById('ex4-feedback');
        feedback.className = 'feedback info';
        feedback.innerHTML = '📖 Правильные пары:<br>📖 Литература — Г (анализ произведений, развитие речи)<br>🧮 Математика — Б (логическое мышление, терминология)<br>🎨 Изобразительное искусство — А (обогащение речи через образность)<br>🎵 Музыка — В (развитие речи через музыкальные впечатления)';
    });

    // ========== УПРАЖНЕНИЕ 2.2: ОПРЕДЕЛИ ПРЕДМЕТЫ ==========
    document.querySelector('#ex5 .btn-check').addEventListener('click', () => {
        const answer = document.getElementById('scenarioAnswer').value.trim().toLowerCase();
        const feedback = document.getElementById('ex5-feedback');
        const keywords = ['русский', 'литература', 'чтение', 'человек и мир', 'природоведение', 'изо', 'рисование', 'искусство'];
        let found = keywords.filter(k => answer.includes(k)).length;
        if (found >= 3) {
            feedback.className = 'feedback success';
            feedback.innerHTML = '✅ Верно! В задании интегрированы: русский язык, литературное чтение, человек и мир, изобразительное искусство.';
        } else {
            feedback.className = 'feedback error';
            feedback.innerHTML = '❌ Неполный ответ. Попробуйте определить все предметы: русский язык, литературное чтение, человек и мир, изобразительное искусство.';
        }
    });

    document.querySelector('#ex5 .btn-show-answer').addEventListener('click', () => {
        const feedback = document.getElementById('ex5-feedback');
        feedback.className = 'feedback info';
        feedback.innerHTML = '📖 Пример правильного ответа: Русский язык, литературное чтение, человек и мир, изобразительное искусство.';
    });

    // ========== УПРАЖНЕНИЕ 2.3: СВОЙ ПРИМЕР ==========
    document.querySelector('#ex6 .btn-check').addEventListener('click', () => {
        const answer = document.getElementById('customExample').value.trim();
        const feedback = document.getElementById('ex6-feedback');
        if (answer.length > 20) {
            feedback.className = 'feedback success';
            feedback.innerHTML = '💡 Спасибо за ваш пример! Это отличная демонстрация понимания межпредметных связей.';
        } else {
            feedback.className = 'feedback error';
            feedback.innerHTML = '📝 Пожалуйста, приведите более развёрнутый пример (хотя бы 2-3 предложения).';
        }
    });

    // ========== КОНТРОЛЬНЫЙ ТЕСТ ==========
    document.getElementById('testCheck').addEventListener('click', () => {
        const answers = {
            t1: 'correct',
            t2: 'correct',
            t3: 'correct',
            t4: 'correct',
            t5: 'correct',
            t6: 'correct'
        };
        let score = 0;
        for (let i = 1; i <= 6; i++) {
            const selected = document.querySelector(`input[name="t${i}"]:checked`);
            if (selected && selected.value === answers[`t${i}`]) score++;
        }
        const feedback = document.getElementById('test-feedback');
        feedback.className = 'feedback';
        if (score === 6) {
            feedback.classList.add('success');
            feedback.innerHTML = `🎉 Поздравляем! Вы набрали ${score}/6. Материал усвоен отлично!`;
        } else if (score >= 4) {
            feedback.classList.add('success');
            feedback.innerHTML = `👍 Хороший результат! ${score}/6. Рекомендуем повторить разделы, где были ошибки.`;
        } else {
            feedback.classList.add('error');
            feedback.innerHTML = `📖 Результат: ${score}/6. Рекомендуем вернуться к странице «Теория» и повторить материал.`;
        }
    });

    document.getElementById('testReset').addEventListener('click', () => {
        document.querySelectorAll('#test input[type="radio"]').forEach(radio => radio.checked = false);
        const feedback = document.getElementById('test-feedback');
        feedback.className = 'feedback';
        feedback.style.display = 'none';
    });

    // ========== РЕФЛЕКСИЯ ==========
    document.getElementById('reflectionBtn').addEventListener('click', () => {
        const selected = document.querySelector('input[name="reflection"]:checked');
        const feedback = document.getElementById('reflection-feedback');
        if (!selected) {
            feedback.className = 'feedback error';
            feedback.innerHTML = '❌ Пожалуйста, выберите уровень самооценки.';
            return;
        }
        const value = selected.value;
        let message = '';
        if (value === 'high') message = '🌟 Отлично! Высокий уровень — вы готовы применять межпредметные связи на практике.';
        else if (value === 'medium') message = '📚 Хорошо! Средний уровень — продолжайте изучать материал и практиковаться.';
        else message = '📖 Спасибо за честность! Рекомендуем вернуться к странице «Теория» для повторения.';
        feedback.className = 'feedback success';
        feedback.innerHTML = message;
    });
});