// Скрипт для страницы контактов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты (Leaflet)
    initMap();
    
    // FAQ аккордеон
    initFAQ();
    
    // QR код генерируем на лету
    generateQRCode();
    
    console.log('Страница контактов загружена');
});

// Инициализация карты
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    // Координаты школы (Минск, ул. Школьная, 15 - пример)
    const schoolCoords = [53.902284, 27.561831];
    
    try {
        // Создаем карту
        const map = L.map('map').setView(schoolCoords, 16);
        
        // Добавляем слой карты (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);
        
        // Добавляем маркер школы
        const schoolIcon = L.divIcon({
            html: '<i class="fas fa-school" style="color: #ff3366; font-size: 2rem;"></i>',
            iconSize: [40, 40],
            className: 'school-marker'
        });
        
        L.marker(schoolCoords, { icon: schoolIcon })
            .addTo(map)
            .bindPopup('<strong>ГУО "Средняя школа №25"</strong><br>Кабинет информатики №315')
            .openPopup();
            
        // Добавляем круг радиуса
        L.circle(schoolCoords, {
            color: 'var(--primary)',
            fillColor: 'var(--primary)',
            fillOpacity: 0.1,
            radius: 200
        }).addTo(map);
        
    } catch (error) {
        console.error('Ошибка загрузки карты:', error);
        // Если карта не загрузилась, показываем заглушку
        mapElement.innerHTML = `
            <div style="padding: 40px; text-align: center; color: white;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;"></i>
                <h3>Карта временно недоступна</h3>
                <p>Адрес: г. Минск, ул. Школьная, д. 15</p>
            </div>
        `;
    }
}

// FAQ аккордеон
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий
            item.classList.toggle('active');
        });
    });
}

// Генерация QR кода
function generateQRCode() {
    const qrContainer = document.querySelector('.qr-code');
    
    if (!qrContainer) return;
    
    // Данные для QR кода
    const contactData = {
        name: "Жосткин Иван Николаевич",
        position: "Учитель информатики",
        email: "informatica@school.by",
        phone: "",
        address: "г. Минск, ул. Школьная, д. 15",
        telegram: "https://t.me/informatika_school",
        website: window.location.origin
    };
    
    // Формируем текст для QR кода
    const qrText = `Контактные данные:
    
${contactData.name}
${contactData.position}

📧 ${contactData.email}
🏫 ${contactData.address}

📱 Telegram: ${contactData.telegram}
🌐 Сайт: ${contactData.website}`;
    
    // Если хотите реальный QR код, можно использовать библиотеку qrcode.js
    // Сейчас оставляем заглушку
    
    // Для реального QR кода раскомментируйте:
    /*
    new QRCode(qrContainer, {
        text: qrText,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    */
}

// Вспомогательная функция для копирования email
function initEmailCopy() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Можно добавить подтверждение
            console.log('Открывается почтовый клиент...');
        });
    }
}

// Инициализируем копирование email
initEmailCopy();