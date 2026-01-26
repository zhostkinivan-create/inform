// Активация меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuItems = document.getElementById('menuItems');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Переключение меню
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuItems.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        if (menuItems.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!menuItems.contains(e.target) && !menuToggle.contains(e.target)) {
            menuItems.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Закрытие меню при клике на ссылку в выпадающем меню
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function() {
            menuItems.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Кнопка "Наверх"
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Анимация карточек при прокрутке
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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
    
    // Эффект параллакса для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        document.querySelector('.animated-bg').style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
    
    // Эффект печатающего текста для заголовка
    const titleText = document.querySelector('.title-subtext');
    const originalText = titleText.textContent;
    titleText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            titleText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Запускаем анимацию после загрузки
    setTimeout(typeWriter, 1000);
    
    // Интерактивные элементы карточек
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Консольное приветствие
    console.log('%c👨‍🏫 Добро пожаловать на сайт по информатике!', 'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Учись, создавай, вдохновляйся!', 'color: #36d1dc; font-size: 14px;');
});