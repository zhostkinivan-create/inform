// Основной скрипт для портфолио

document.addEventListener('DOMContentLoaded', function() {
    // Навигация по разделам портфолио
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.portfolio-section');
    const navIndicator = document.getElementById('navIndicator');
    
    // Обновляем индикатор навигации
    function updateNavIndicator(activeItem) {
        if (!navIndicator) return;
        
        const itemRect = activeItem.getBoundingClientRect();
        const navRect = activeItem.parentElement.getBoundingClientRect();
        
        navIndicator.style.width = `${itemRect.width}px`;
        navIndicator.style.left = `${itemRect.left - navRect.left}px`;
    }
    
    // Активация раздела
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Добавляем активный класс к текущему
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                updateNavIndicator(this);
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Инициализация индикатора
    const activeNavItem = document.querySelector('.nav-item.active');
    if (activeNavItem) {
        updateNavIndicator(activeNavItem);
    }
    
    // Переключение табов в профиле
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Добавляем активный класс к текущему
            this.classList.add('active');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // Анимация прогресс-баров навыков
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-level') + '%';
            level.style.width = width;
        });
    }
    
    // Запускаем анимацию при загрузке
    setTimeout(animateSkills, 500);
    
    // Инициализация диаграммы навыков (Radar Chart)
    const skillsCtx = document.getElementById('skillsRadarChart');
    if (skillsCtx) {
        const skillsChart = new Chart(skillsCtx, {
            type: 'radar',
            data: {
                labels: ['', '', '', '', ''],
                datasets: [{
                    label: 'Уровень владения',
                    data: [95, 80, 72, 90, 85],
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: 'rgba(108, 99, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(108, 99, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(108, 99, 255, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.9)',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.9)'
                        }
                    }
                }
            }
        });
    }
    
    // Инициализация диаграммы успеваемости
    const performanceCtx = document.getElementById('performanceChart');
    let performanceChart;
    
    if (performanceCtx) {
        // Данные из Excel файла
        const performanceData = {
            labels: ['I четверть', 'II четверть', 'III четверть', 'IV четверть'],
            datasets: [
                {
                    label: '2023-2024',
                    data: [7.78, 8.01, 8.17, 8.23],
                    borderColor: '#6c63ff',
                    backgroundColor: 'rgba(108, 99, 255, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: '2024-2025',
                    data: [8.02, 7.92, 8.01, 8.40],
                    borderColor: '#36d1dc',
                    backgroundColor: 'rgba(54, 209, 220, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        };
        
        performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: performanceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.9)',
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(42, 45, 67, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(108, 99, 255, 0.5)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 7.5,
                        max: 8.5,
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return value.toFixed(2);
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
        
        // Управление отображением данных по годам
        const chartBtns = document.querySelectorAll('.chart-btn');
        
        chartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активный класс у всех
                chartBtns.forEach(b => b.classList.remove('active'));
                // Добавляем активный класс к текущему
                this.classList.add('active');
                
                const year = this.getAttribute('data-year');
                
                // Показываем/скрываем наборы данных
                if (performanceChart) {
                    if (year === '2023') {
                        performanceChart.data.datasets[0].hidden = false;
                        performanceChart.data.datasets[1].hidden = true;
                    } else if (year === '2024') {
                        performanceChart.data.datasets[0].hidden = true;
                        performanceChart.data.datasets[1].hidden = false;
                    } else {
                        performanceChart.data.datasets[0].hidden = false;
                        performanceChart.data.datasets[1].hidden = false;
                    }
                    performanceChart.update();
                }
            });
        });
    }
    
    // Аккордеон методологии
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Закрываем все аккордеоны
            document.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Если кликнули на неактивный, открываем его
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Лайтбокс для изображений
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Открытие лайтбокса
    document.querySelectorAll('.certificate-preview, .project-photo').forEach(preview => {
        preview.addEventListener('click', function() {
            const fullImage = this.getAttribute('data-full');
            const caption = this.querySelector('.photo-caption')?.textContent || '';
            
            lightboxImage.src = fullImage;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку
        });
    });
    
    // Закрытие лайтбокса
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.card, .teacher-profile-card, .skills-card, .results-chart-card, .table-card, .gifted-card, .event-card, .stat-card, .accordion-item');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        elementObserver.observe(element);
    });
    
    // Кнопка смены фото (заглушка)
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function() {
            alert('В реальном сайте здесь будет загрузка нового фото');
        });
    }
    
    // Консольное сообщение
    console.log('%c📊 Портфолио педагога загружено!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%c🎯 Интерактивные диаграммы и таймлайн готовы к использованию.', 'color: #36d1dc; font-size: 14px;');
});
