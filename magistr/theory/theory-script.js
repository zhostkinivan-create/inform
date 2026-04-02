document.addEventListener('DOMContentLoaded', function() {
    // МОБИЛЬНОЕ МЕНЮ
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => navList.classList.toggle('open'));
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.addEventListener('click', () => navList.classList.remove('open')));
    }

    // ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
    const tocLinks = document.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // КНОПКА "НАВЕРХ"
    const backTop = document.querySelector('.back-top');
    if (backTop) {
        backTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});