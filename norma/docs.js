document.addEventListener('DOMContentLoaded', function() {
    // Инициализация меню (уже есть в основном script.js)
    
    // Элементы страницы
    const filterBtn = document.getElementById('filterBtn');
    const filtersPanel = document.getElementById('filtersPanel');
    const searchInput = document.getElementById('searchInput');
    const yearRange = document.getElementById('yearRange');
    const currentYear = document.getElementById('currentYear');
    const docCards = document.querySelectorAll('.doc-card');
    const folders = document.querySelectorAll('.folder');
    const emptyFolder = document.getElementById('emptyFolder');
    const docCount = document.getElementById('docCount');
    const applyFilters = document.getElementById('applyFilters');
    
    // Текущие фильтры
    let activeFilters = {
        search: '',
        categories: ['federal', 'school', 'methodical', 'legal'],
        minYear: 2010,
        maxYear: 2024
    };
    
    // Переключение панели фильтров
    filterBtn.addEventListener('click', function() {
        filtersPanel.classList.toggle('active');
        filterBtn.innerHTML = filtersPanel.classList.contains('active') 
            ? '<i class="fas fa-times"></i> Скрыть фильтры' 
            : '<i class="fas fa-filter"></i> Фильтры';
    });
    
    // Обновление года на слайдере
    yearRange.addEventListener('input', function() {
        currentYear.textContent = this.value;
    });
    
    // Поиск документов
    searchInput.addEventListener('input', function() {
        activeFilters.search = this.value.toLowerCase();
        filterDocuments();
    });
    
    // Обработка категорий
    document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const category = this.dataset.category;
            
            if (category === 'all') {
                // Если выбрано "Все документы", снимаем другие галочки
                if (this.checked) {
                    document.querySelectorAll('.filter-checkbox input:not([data-category="all"])').forEach(cb => {
                        cb.checked = false;
                    });
                    activeFilters.categories = ['federal', 'school', 'methodical', 'legal'];
                }
            } else {
                // Если выбрана конкретная категория, снимаем "Все документы"
                document.querySelector('.filter-checkbox input[data-category="all"]').checked = false;
                
                if (this.checked) {
                    activeFilters.categories.push(category);
                } else {
                    activeFilters.categories = activeFilters.categories.filter(c => c !== category);
                }
                
                // Если не выбрано ни одной категории, выбираем "Все"
                if (activeFilters.categories.length === 0) {
                    document.querySelector('.filter-checkbox input[data-category="all"]').checked = true;
                    activeFilters.categories = ['federal', 'school', 'methodical', 'legal'];
                }
            }
        });
    });
    
    // Применение фильтров по году
    applyFilters.addEventListener('click', function() {
        activeFilters.minYear = 2010;
        activeFilters.maxYear = parseInt(yearRange.value);
        filterDocuments();
        
        // Плавная прокрутка к документам
        document.querySelector('.documents-grid').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Фильтрация документов
    function filterDocuments() {
        let visibleCount = 0;
        
        docCards.forEach(card => {
            const title = card.querySelector('.doc-title').textContent.toLowerCase();
            const description = card.querySelector('.doc-description').textContent.toLowerCase();
            const category = card.dataset.category;
            const year = parseInt(card.dataset.year);
            
            // Проверка поиска
            const matchesSearch = activeFilters.search === '' || 
                title.includes(activeFilters.search) || 
                description.includes(activeFilters.search);
            
            // Проверка категории
            const matchesCategory = activeFilters.categories.includes(category);
            
            // Проверка года
            const matchesYear = year >= activeFilters.minYear && year <= activeFilters.maxYear;
            
            // Показываем/скрываем карточку
            if (matchesSearch && matchesCategory && matchesYear) {
                card.style.display = 'block';
                visibleCount++;
                
                // Анимация появления
                card.style.animation = 'cardAppear 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Обновление счетчика
        docCount.textContent = `${visibleCount} документ${getRussianPlural(visibleCount)}`;
        
        // Показываем/скрываем сообщение о пустой папке
        if (visibleCount === 0) {
            emptyFolder.style.display = 'block';
        } else {
            emptyFolder.style.display = 'none';
        }
    }
    
    // Вспомогательная функция для правильного склонения
    function getRussianPlural(number) {
        if (number % 10 === 1 && number % 100 !== 11) return '';
        if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return 'а';
        return 'ов';
    }
    
    // Быстрая навигация по папкам
    folders.forEach(folder => {
        folder.addEventListener('click', function(e) {
            e.preventDefault();
            const folderType = this.dataset.folder;
            
            if (folderType === 'all') {
                // Сбрасываем все фильтры
                document.querySelectorAll('.filter-checkbox input').forEach(cb => {
                    cb.checked = false;
                });
                document.querySelector('.filter-checkbox input[data-category="all"]').checked = true;
                activeFilters.categories = ['federal', 'school', 'methodical', 'legal'];
            } else {
                // Выбираем только одну категорию
                document.querySelectorAll('.filter-checkbox input').forEach(cb => {
                    cb.checked = false;
                });
                document.querySelector(`.filter-checkbox input[data-category="${folderType}"]`).checked = true;
                activeFilters.categories = [folderType];
            }
            
            // Сбрасываем поиск и год
            searchInput.value = '';
            activeFilters.search = '';
            yearRange.value = '2024';
            currentYear.textContent = '2024';
            
            // Применяем фильтры
            filterDocuments();
            
            // Закрываем панель фильтров если открыта
            if (filtersPanel.classList.contains('active')) {
                filtersPanel.classList.remove('active');
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> Фильтры';
            }
            
            // Прокрутка к документам
            document.querySelector('.documents-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Предпросмотр PDF (упрощенная версия)
    const previewButtons = document.querySelectorAll('.preview-btn');
    const previewModal = document.getElementById('previewModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const closeModal = document.getElementById('closeModal');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Если хотите полноценный предпросмотр, можно использовать Google Viewer:
            // const pdfUrl = this.href;
            // pdfViewer.src = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
            
            // Или просто открываем в новой вкладке
            // window.open(this.href, '_blank');
            
            // Для модального окна (требует чтобы PDF был доступен по CORS):
            // e.preventDefault();
            // const pdfUrl = this.href;
            // pdfViewer.src = pdfUrl;
            // previewModal.classList.add('active');
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        previewModal.classList.remove('active');
        pdfViewer.src = '';
    });
    
    // Закрытие модального окна при клике на оверлей
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            previewModal.classList.remove('active');
            pdfViewer.src = '';
        }
    });
    
    // Анимация карточек при загрузке
    setTimeout(() => {
        filterDocuments();
    }, 100);
    
    // Интерактивные эффекты для карточек
    docCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.doc-icon');
            icon.style.transform = 'rotate(10deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.doc-icon');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // Консольное сообщение
    console.log('%c📄 Страница нормативных документов загружена', 'color: #6c63ff; font-size: 14px; font-weight: bold;');
    console.log('%c📂 Папка: /norma/', 'color: #36d1dc; font-size: 12px;');
});