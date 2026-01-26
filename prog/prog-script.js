// Страница "Программы и инструменты"

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const programsGrid = document.getElementById('programsGrid');
    const programsCount = document.getElementById('programsCount');
    
    // Массив всех программ
    const programs = [
        {
            id: 1,
            title: "Калькулятор систем счисления",
            icon: "fa-calculator",
            category: "math",
            difficulty: "easy",
            description: "Интерактивный калькулятор для перевода чисел между системами счисления (2, 8, 10, 16) и выполнения арифметических операций.",
            features: ["Перевод между системами", "Арифметические операции", "Побитовые операции", "История вычислений"],
            link: "../sistemu/sistemu.html",
            status: "ready"
        },
        {
            id: 2,
            title: "Генератор паролей",
            icon: "fa-key",
            category: "security",
            difficulty: "easy",
            description: "Инструмент для создания безопасных паролей и анализа их надёжности. Включает хеширование и проверку утечек.",
            features: ["Генерация паролей", "Анализ надёжности", "Хеширование", "Проверка утечек"],
            link: "#!",
            status: "planned"
        },
        {
            id: 3,
            title: "Конвертер единиц измерения",
            icon: "fa-exchange-alt",
            category: "math",
            difficulty: "easy",
            description: "Конвертер между различными единицами измерения: информация, время, частота, данные, цветовые системы.",
            features: ["Информация (биты/байты)", "Время", "Частота", "Цветовые системы"],
            link: "#!",
            status: "planned"
        },
        {
            id: 4,
            title: "Визуализатор алгоритмов",
            icon: "fa-sort-amount-down",
            category: "algorithms",
            difficulty: "medium",
            description: "Визуализация работы алгоритмов сортировки, поиска и графовых алгоритмов с пошаговой анимацией.",
            features: ["Сортировка", "Поиск", "Графовые алгоритмы", "Анимация"],
            link: "#!",
            status: "planned"
        },
        {
            id: 5,
            title: "Конструктор логических схем",
            icon: "fa-project-diagram",
            category: "programming",
            difficulty: "medium",
            description: "Интерактивный конструктор для создания и тестирования логических схем с базовыми вентилями и триггерами.",
            features: ["Логические вентили", "Триггеры", "Таблицы истинности", "Тестирование"],
            link: "#!",
            status: "planned"
        },
        {
            id: 6,
            title: "Тренажёр бинарной арифметики",
            icon: "fa-binary",
            category: "math",
            difficulty: "medium",
            description: "Тренажёр для практики бинарных операций: сложение, вычитание, умножение и работа с дополнительным кодом.",
            features: ["Сложение/вычитание", "Умножение/деление", "Дополнительный код", "Прогресс обучения"],
            link: "#!",
            status: "planned"
        },
        {
            id: 7,
            title: "Виртуальная модель компьютера",
            icon: "fa-desktop",
            category: "programming",
            difficulty: "hard",
            description: "Интерактивная модель работы компьютера с визуализацией компонентов: процессор, память, устройства ввода/вывода.",
            features: ["Модель процессора", "Иерархия памяти", "Устройства ввода/вывода", "Анимация работы"],
            link: "#!",
            status: "planned"
        },
        {
            id: 8,
            title: "Игра 'Ханойские башни'",
            icon: "fa-layer-group",
            category: "games",
            difficulty: "medium",
            description: "Классическая головоломка с обучением рекурсивному алгоритму решения. Разные уровни сложности.",
            features: ["Рекурсивный алгоритм", "Разные уровни", "Авторешатель", "Обучение"],
            link: "#!",
            status: "planned"
        },
        {
            id: 9,
            title: "Криптографический тренажёр",
            icon: "fa-lock",
            category: "security",
            difficulty: "hard",
            description: "Тренажёр для изучения криптографии: шифры, хеш-функции, RSA, обмен ключами Диффи-Хеллмана.",
            features: ["Шифры подстановки", "Хеш-функции", "RSA демонстрация", "Обмен ключами"],
            link: "#!",
            status: "planned"
        },
        {
            id: 10,
            title: "Интерактивная временная шкала",
            icon: "fa-history",
            category: "creative",
            difficulty: "easy",
            description: "Визуализация истории вычислительной техники от первых компьютеров до современных технологий.",
            features: ["История IT", "Фильтрация", "Детальная информация", "Викторина"],
            link: "#!",
            status: "planned"
        },
        {
            id: 11,
            title: "Визуализатор структур данных",
            icon: "fa-sitemap",
            category: "programming",
            difficulty: "hard",
            description: "Визуализация работы структур данных: массивы, списки, деревья, графы с анимацией операций.",
            features: ["Линейные структуры", "Деревья", "Графы", "Анимация операций"],
            link: "#!",
            status: "planned"
        },
        {
            id: 12,
            title: "Генератор фракталов",
            icon: "fa-snowflake",
            category: "creative",
            difficulty: "medium",
            description: "Генератор математических фракталов: Мандельброта, Серпинского, Коха с настройкой параметров.",
            features: ["Множество Мандельброта", "Треугольник Серпинского", "Кривая Коха", "Настройка параметров"],
            link: "#!",
            status: "planned"
        },
        {
            id: 13,
            title: "Пиксельный редактор",
            icon: "fa-paint-brush",
            category: "creative",
            difficulty: "easy",
            description: "Простой редактор для создания пиксельной графики с поддержкой слоёв, палитрой и экспортом.",
            features: ["Пиксельное рисование", "Слои", "Палитра цветов", "Экспорт в PNG"],
            link: "#!",
            status: "planned"
        },
        {
            id: 14,
            title: "Создатель блок-схем",
            icon: "fa-stream",
            category: "programming",
            difficulty: "medium",
            description: "Инструмент для создания блок-схем алгоритмов с автоматической генерацией псевдокода.",
            features: ["Блок-схемы", "Автовыравнивание", "Генерация кода", "Экспорт"],
            link: "#!",
            status: "planned"
        },
        {
            id: 15,
            title: "QR-код генератор",
            icon: "fa-qrcode",
            category: "creative",
            difficulty: "easy",
            description: "Генератор QR-кодов с обучением принципам работы, структурой и коррекцией ошибок.",
            features: ["Генерация QR", "Обучение структуре", "Сканирование", "Коррекция ошибок"],
            link: "#!",
            status: "planned"
        },
        {
            id: 16,
            title: "Геолокационные эксперименты",
            icon: "fa-map-marker-alt",
            category: "creative",
            difficulty: "medium",
            description: "Эксперименты с геолокацией: определение координат, расчёты расстояний, работа с картами.",
            features: ["Определение местоположения", "Расчёты расстояний", "Упрощённые карты", "Геозоны"],
            link: "#!",
            status: "planned"
        },
        {
            id: 17,
            title: "Игра 'Угадай число'",
            icon: "fa-question-circle",
            category: "games",
            difficulty: "easy",
            description: "Классическая игра с демонстрацией алгоритмов бинарного поиска и машинного обучения.",
            features: ["Бинарный поиск", "Соревнование с ИИ", "Адаптивные стратегии", "Статистика"],
            link: "#!",
            status: "planned"
        },
        {
            id: 18,
            title: "Игра 'Миссионеры и каннибалы'",
            icon: "fa-users",
            category: "games",
            difficulty: "hard",
            description: "Классическая логическая игра с визуализацией графа состояний и алгоритмов поиска решения.",
            features: ["Логическая головоломка", "Граф состояний", "Алгоритмы поиска", "Автоподсказки"],
            link: "#!",
            status: "planned"
        }
    ];
    
    // Инициализация
    init();
    
    function init() {
        // Отображение всех программ
        displayPrograms(programs);
        
        // Обработчики событий для фильтров
        searchInput.addEventListener('input', filterPrograms);
        categoryFilter.addEventListener('change', filterPrograms);
        difficultyFilter.addEventListener('change', filterPrograms);
        
        // Обработчики для категорий
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                categoryFilter.value = category;
                filterPrograms();
                
                // Прокрутка к сетке программ
                programsGrid.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Анимация карточек при загрузке
        animateCards();
        
        // Консольное сообщение
        console.log('%c🚀 Страница "Программы и инструменты" загружена!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
        console.log('%c📊 Всего программ: ' + programs.length, 'color: #36d1dc; font-size: 14px;');
    }
    
    function displayPrograms(programsToShow) {
        programsGrid.innerHTML = '';
        
        if (programsToShow.length === 0) {
            programsGrid.innerHTML = `
                <div class="empty-results">
                    <i class="fas fa-search"></i>
                    <p>Программы по вашему запросу не найдены</p>
                    <p>Попробуйте изменить критерии поиска</p>
                </div>
            `;
            programsCount.textContent = '0 программ';
            return;
        }
        
        programsToShow.forEach(program => {
            const programCard = createProgramCard(program);
            programsGrid.appendChild(programCard);
        });
        
        programsCount.textContent = `${programsToShow.length} программ${getFilteredText()}`;
    }
    
    function createProgramCard(program) {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.dataset.id = program.id;
        card.dataset.category = program.category;
        card.dataset.difficulty = program.difficulty;
        
        // Определяем текст для статуса
        let statusBadge = '';
        if (program.status === 'ready') {
            statusBadge = '<span class="program-category" style="background: rgba(76, 201, 240, 0.2); color: #4cc9f0;">✓ Готово</span>';
        } else if (program.status === 'planned') {
            statusBadge = '<span class="program-category" style="background: rgba(255, 158, 0, 0.2); color: #ff9e00;">В разработке</span>';
        }
        
        // Перевод категории на русский
        const categoryNames = {
            'math': 'Математические',
            'programming': 'Программирование',
            'algorithms': 'Алгоритмы',
            'security': 'Безопасность',
            'creative': 'Творческие',
            'games': 'Обучающие игры'
        };
        
        // Перевод сложности на русский
        const difficultyNames = {
            'easy': 'Легкая',
            'medium': 'Средняя',
            'hard': 'Сложная'
        };
        
        const difficultyClasses = {
            'easy': 'difficulty-easy',
            'medium': 'difficulty-medium',
            'hard': 'difficulty-hard'
        };
        
        card.innerHTML = `
            <div class="program-header">
                <div class="program-icon">
                    <i class="fas ${program.icon}"></i>
                </div>
                <div class="program-title-container">
                    <h3 class="program-title">${program.title}</h3>
                    <div class="program-meta">
                        <span class="program-category">${categoryNames[program.category]}</span>
                        <span class="program-difficulty ${difficultyClasses[program.difficulty]}">
                            ${difficultyNames[program.difficulty]}
                        </span>
                        ${statusBadge}
                    </div>
                </div>
            </div>
            
            <div class="program-body">
                <p class="program-description">${program.description}</p>
                
                <div class="program-features">
                    <h4><i class="fas fa-star"></i> Основные возможности:</h4>
                    <div class="features-list">
                        ${program.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div class="program-footer">
                <a href="${program.link}" class="program-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    ${program.status === 'ready' ? 'Открыть программу' : 'Скоро будет доступно'}
                </a>
            </div>
        `;
        
        return card;
    }
    
    function filterPrograms() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDifficulty = difficultyFilter.value;
        
        const filteredPrograms = programs.filter(program => {
            // Поиск по тексту
            const matchesSearch = searchTerm === '' || 
                program.title.toLowerCase().includes(searchTerm) ||
                program.description.toLowerCase().includes(searchTerm) ||
                program.features.some(feature => feature.toLowerCase().includes(searchTerm));
            
            // Фильтр по категории
            const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
            
            // Фильтр по сложности
            const matchesDifficulty = selectedDifficulty === 'all' || program.difficulty === selectedDifficulty;
            
            return matchesSearch && matchesCategory && matchesDifficulty;
        });
        
        displayPrograms(filteredPrograms);
        animateCards();
    }
    
    function getFilteredText() {
        const selectedCategory = categoryFilter.value;
        const selectedDifficulty = difficultyFilter.value;
        const categoryNames = {
            'math': 'Математические',
            'programming': 'Программирование',
            'algorithms': 'Алгоритмы',
            'security': 'Безопасность',
            'creative': 'Творческие',
            'games': 'Обучающие игры'
        };
        
        const difficultyNames = {
            'easy': 'Легкая',
            'medium': 'Средняя',
            'hard': 'Сложная'
        };
        
        let text = '';
        
        if (selectedCategory !== 'all') {
            text += ` • ${categoryNames[selectedCategory]}`;
        }
        
        if (selectedDifficulty !== 'all') {
            text += ` • ${difficultyNames[selectedDifficulty]}`;
        }
        
        return text;
    }
    
    function animateCards() {
        const cards = document.querySelectorAll('.program-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // Обновление счетчиков в категориях
    function updateCategoryCounts() {
        const categoryCounts = {
            'math': programs.filter(p => p.category === 'math').length,
            'programming': programs.filter(p => p.category === 'programming').length,
            'algorithms': programs.filter(p => p.category === 'algorithms').length,
            'security': programs.filter(p => p.category === 'security').length,
            'creative': programs.filter(p => p.category === 'creative').length,
            'games': programs.filter(p => p.category === 'games').length
        };
        
        // Обновляем счетчики на карточках категорий
        document.querySelectorAll('.category-card').forEach(card => {
            const category = card.dataset.category;
            const countElement = card.querySelector('.category-count');
            if (countElement) {
                countElement.textContent = `${categoryCounts[category]} инструмент${getRussianPlural(categoryCounts[category])}`;
            }
        });
    }
    
    function getRussianPlural(number) {
        if (number % 10 === 1 && number % 100 !== 11) return '';
        if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'а';
        return 'ов';
    }
    
    // Инициализируем счетчики
    updateCategoryCounts();
});