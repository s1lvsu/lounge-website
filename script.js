// Скрипты для сайта кальянной

/**
 * 1. ДИНАМИЧЕСКИЙ СТАТУС РАБОТЫ
 * Проверяет, открыто ли заведение в данный момент
 * Расписание: Пн-Чт 14:00-02:00, Пт-Вс 14:00-04:00
 */
function checkOpenStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // Время в минутах от начала дня

    // Определяем время закрытия для текущего дня
    let openingTime = 14 * 60; // 14:00 в минутах
    let closingTime;

    // Пятница (5), Суббота (6), Воскресенье (0) - работаем до 04:00
    if (day === 5 || day === 6 || day === 0) {
        closingTime = 4 * 60; // 04:00
    } else {
        // Понедельник-Четверг - работаем до 02:00
        closingTime = 2 * 60; // 02:00
    }

    const statusElement = document.getElementById('status');

    // Проверяем, открыто ли сейчас
    // Если текущее время >= 14:00 (после открытия)
    if (currentTime >= openingTime) {
        // Открыто
        const closeHour = closingTime / 60;
        const closeFormatted = closeHour === 4 ? '04:00' : '02:00';
        statusElement.innerHTML = `🟢 Открыто до ${closeFormatted}`;
        statusElement.style.color = '#10b981';
    }
    // Если текущее время < closingTime (ночные часы, еще открыто)
    else if (currentTime < closingTime) {
        const closeHour = closingTime / 60;
        const closeFormatted = closeHour === 4 ? '04:00' : '02:00';
        statusElement.innerHTML = `🟢 Открыто до ${closeFormatted}`;
        statusElement.style.color = '#10b981';
    }
    // Закрыто
    else {
        statusElement.innerHTML = '🔴 Закрыто, откроемся в 14:00';
        statusElement.style.color = '#ef4444';
    }
}

/**
 * 2. SMOOTH SCROLL ДЛЯ НАВИГАЦИИ
 * Плавная прокрутка к секциям при клике на ссылки навигации
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 3. LAZY LOADING ДЛЯ ЗАГЛУШЕК ГАЛЕРЕИ
 * Использует IntersectionObserver для загрузки изображений при появлении в viewport
 */
function initLazyLoading() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Создаем observer для отслеживания появления элементов в viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент появился в viewport
                entry.target.classList.add('loaded');
                // Прекращаем наблюдение за этим элементом
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Срабатывает когда 10% элемента видно
        rootMargin: '50px' // Начинаем загрузку за 50px до появления
    });

    // Наблюдаем за всеми элементами галереи
    galleryItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * 4. LIGHTBOX ДЛЯ ГАЛЕРЕИ
 * Простой lightbox для просмотра изображений в увеличенном виде
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Создаем modal элемент
    const modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-image"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const lightboxImage = modal.querySelector('.lightbox-image');
    const closeButton = modal.querySelector('.lightbox-close');
    const overlay = modal.querySelector('.lightbox-overlay');

    // Открытие lightbox при клике на элемент галереи
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const placeholderText = this.querySelector('.gallery-placeholder').textContent;
            // Пока показываем текст заглушки увеличенным
            lightboxImage.innerHTML = `<div class="lightbox-placeholder">${placeholderText}</div>`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        });
    });

    // Закрытие по клику на крестик
    closeButton.addEventListener('click', closeLightbox);

    // Закрытие по клику на overlay (вне изображения)
    overlay.addEventListener('click', closeLightbox);

    // Закрытие по нажатию ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
}

/**
 * 5. ФОРМАТИРОВАНИЕ ТЕЛЕФОНА
 * Преобразует номер телефона в красивый читаемый формат
 * Пример: +78142XXXXXX → +7 (814) 2XX-XX-XX
 */
function formatPhone(phone) {
    // Убираем все символы кроме цифр и плюса
    const cleaned = phone.replace(/[^\d+]/g, '');

    // Проверяем российский формат +7
    if (cleaned.startsWith('+7') && cleaned.length === 12) {
        const countryCode = cleaned.substring(0, 2); // +7
        const areaCode = cleaned.substring(2, 5); // 814
        const firstPart = cleaned.substring(5, 6); // 2
        const secondPart = cleaned.substring(6, 8); // XX
        const thirdPart = cleaned.substring(8, 10); // XX
        const fourthPart = cleaned.substring(10, 12); // XX

        return `${countryCode} (${areaCode}) ${firstPart}${secondPart}-${thirdPart}-${fourthPart}`;
    }

    // Если формат не соответствует, возвращаем как есть
    return phone;
}

/**
 * Инициализация всех функций при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Запускаем проверку статуса работы
    checkOpenStatus();
    // Обновляем статус каждые 60 секунд
    setInterval(checkOpenStatus, 60000);

    // 2. Инициализируем smooth scroll
    initSmoothScroll();

    // 3. Инициализируем lazy loading для галереи
    initLazyLoading();

    // 4. Инициализируем lightbox
    initLightbox();

    // 5. Форматируем номера телефонов на странице (опционально)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        const phone = link.textContent;
        link.textContent = formatPhone(phone);
    });
});
