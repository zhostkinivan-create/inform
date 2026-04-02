document.addEventListener('DOMContentLoaded', function() {
    // ---------- МОБИЛЬНОЕ МЕНЮ ----------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => navList.classList.toggle('open'));
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.addEventListener('click', () => navList.classList.remove('open')));
    }

    // ---------- НАСТРОЙКА ССЫЛОК НА ФАЙЛЫ (ЗАМЕНИТЕ ПУТИ) ----------
    // Ментальная карта (изображение)
    const mindmapImg = document.getElementById('mindmapImg');
    const mindmapLink = document.getElementById('mindmapLink');
    // ПРИМЕР: замените src на свой путь
    if (mindmapImg) {
        // mindmapImg.src = "images/my-mindmap.png";   // РАСКОММЕНТИРУЙТЕ И УКАЖИТЕ СВОЙ ПУТЬ
        mindmapImg.src = "images/model.jpg";
    }
    if (mindmapLink) {
        // mindmapLink.href = "images/my-mindmap.png";
        mindmapLink.href = "images/model.jpg";
    }

    // Презентации
    const editablePpt = document.getElementById('editablePptLink');
    const pdfPresentation = document.getElementById('pdfPresentationLink');
    const editablePptPathSpan = document.getElementById('editablePptPath');
    const pdfPresentationPathSpan = document.getElementById('pdfPresentationPath');
    if (editablePpt) {
        editablePpt.href = "files/presentation_edit.pptx";   // ЗАМЕНИТЕ
        if(editablePptPathSpan) editablePptPathSpan.innerText = "путь: files/presentation_edit.pptx";
    }
    if (pdfPresentation) {
        pdfPresentation.href = "files/presentation_view.pdf";
        if(pdfPresentationPathSpan) pdfPresentationPathSpan.innerText = "путь: files/presentation_view.pdf";
    }

    // Диссертация
    const thesisDocx = document.getElementById('thesisDocxLink');
    const thesisPdf = document.getElementById('thesisPdfLink');
    const thesisDocxPathSpan = document.getElementById('thesisDocxPath');
    const thesisPdfPathSpan = document.getElementById('thesisPdfPath');
    if (thesisDocx) {
        thesisDocx.href = "files/referat.docx";
        if(thesisDocxPathSpan) thesisDocxPathSpan.innerText = "путь: files/referat.docx";
    }
    if (thesisPdf) {
        thesisPdf.href = "files/referat.pdf";
        if(thesisPdfPathSpan) thesisPdfPathSpan.innerText = "путь: files/referat.pdf";
    }

    // ---------- СТАТЬИ: ЗДЕСЬ МОЖНО ДОБАВЛЯТЬ НОВЫЕ ПУБЛИКАЦИИ (2 СПОСОБА) ----------
    // Способ 1: добавить вручную через массив (динамическая генерация)
    const articlesData = [
        {
            icon: "📑",
            title: "Анализ понятия 'Педагогические условия'",
            meta: "Солошко В.А.",
            link: "files/articles/article1.pdf",
            linkText: "Читать статью"
        },
        {
            icon: "📑",
            title: "Использование метода проектов в образовательном процессе начальной школы",
            meta: "Солошко В.А.",
            link: "files/articles/article2.pdf",
            linkText: "Читать статью"
        },
        {
            icon: "📑",
            title: "Реализация мужпредметных связей через проектную деятельность на уроках русского языка как традиционный и инновационный подход в начальном образовании",
            meta: "Солошко В.А.",
            link: "files/articles/article3.pdf",
            linkText: "Читать статью"
        },
        {
            icon: "📑",
            title: "Из опыта реализации мужпредметных связей в процессе проектной деятельности в начальной школе",
            meta: "Солошко В.А.",
            link: "files/articles/article4.pdf",
            linkText: "Читать статью"
        },
        {
            icon: "📑",
            title: "Реализация мужпредметных связей в процессе проектной деятельности в начальной школе",
            meta: "Солошко В.А.",
            link: "files/articles/article5.pdf",
            linkText: "Читать статью"
        }
        
    ];

    const articlesContainer = document.getElementById('articlesContainer');
    if (articlesContainer && articlesData.length > 0) {
        articlesContainer.innerHTML = ''; // очистим, чтобы не дублировать
        articlesData.forEach(art => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article-card';
            articleDiv.innerHTML = `
                <div class="article-icon">${art.icon}</div>
                <div class="article-info">
                    <h3 class="article-title">${art.title}</h3>
                    <p class="article-meta">${art.meta}</p>
                    <a href="${art.link}" class="article-link" target="_blank">${art.linkText}</a>
                </div>
            `;
            articlesContainer.appendChild(articleDiv);
        });
    }
    // Способ 2: также можно просто продублировать готовые блоки .article-card в HTML.
    // Если вы хотите добавлять статьи только через HTML, закомментируйте массив articlesData и наполнение.

    // ---------- ГАЛЕРЕЯ (ИНТЕРАКТИВНАЯ, С LIGHTBOX) ----------
    // Укажите здесь пути к своим изображениям (можно добавить сколько угодно)
    const galleryImages = [
        { src: "images/gallery/photo1.png"},
        { src: "images/gallery/photo2.jpg"},
        { src: "images/gallery/photo3.png"},
        { src: "images/gallery/photo4.jpg"},
        { src: "images/gallery/photo5.png"}
        // ДОБАВЬТЕ НОВЫЕ ФОТОГРАФИИ СЮДА
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');

    function buildGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        galleryImages.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            const image = document.createElement('img');
            image.src = img.src;
            image.alt = img.alt;
            image.className = 'gallery-img';
            // Обработчик открытия lightbox
            image.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
            });
            item.appendChild(image);
            galleryGrid.appendChild(item);
        });
    }

    buildGallery();

    // Закрыть lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }
});