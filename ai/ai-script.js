// Скрипт для страницы "Искусственный интеллект"

document.addEventListener('DOMContentLoaded', function() {
    // Раскрывающийся текст
    const collapseToggle = document.getElementById('collapseToggle');
    const aiText = document.getElementById('aiText');
    
    if (collapseToggle && aiText) {
        collapseToggle.addEventListener('click', function() {
            aiText.classList.toggle('expanded');
            this.classList.toggle('active');
            
            if (aiText.classList.contains('expanded')) {
                this.querySelector('.toggle-text').textContent = 'Свернуть';
            } else {
                this.querySelector('.toggle-text').textContent = 'Читать далее';
            }
        });
    }
    
    // Анимация карточек нейросетей
    const aiCards = document.querySelectorAll('.ai-card');
    
    const aiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    aiCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        aiObserver.observe(card);
    });
    
    // Интерактивность карточек нейросетей
    aiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.isIntersecting) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Анимация образовательных карточек
    const eduCards = document.querySelectorAll('.edu-card');
    
    const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    eduCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        eduObserver.observe(card);
    });
    
    // Консольное сообщение
    console.log('%c🤖 Добро пожаловать на страницу Искусственного Интеллекта!', 'color: #36d1dc; font-size: 16px; font-weight: bold;');
    console.log('%c🧠 Изучай, экспериментируй, создавай будущее!', 'color: #6c63ff; font-size: 14px;');
    
    // Шаблон для добавления новых нейросетей
    console.log(`
%c📋 ШАБЛОН ДЛЯ НОВЫХ НЕЙРОСЕТЕЙ:

<div class="ai-card">
    <div class="ai-card-header">
        <div class="ai-card-icon">
            <i class="fas fa-icon-name"></i>
        </div>
        <h3>Название нейросети</h3>
        <span class="ai-card-category">Категория</span>
    </div>
    <div class="ai-card-body">
        <p class="ai-card-description">Краткое описание нейросети.</p>
        <div class="ai-card-features">
            <h4><i class="fas fa-star"></i> Особенности:</h4>
            <ul>
                <li>Особенность 1</li>
                <li>Особенность 2</li>
                <li>Особенность 3</li>
                <li>Особенность 4</li>
            </ul>
        </div>
        <a href="#!" class="ai-card-link">
            <i class="fas fa-external-link-alt"></i>
            Перейти к нейросети
        </a>
    </div>
</div>
    `, 'color: #ff6584; background: rgba(255,101,132,0.1); padding: 10px; border-radius: 5px;');
});