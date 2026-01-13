// Age Verification Check
(function checkAgeVerification() {
    const isAgeVerified = localStorage.getItem('ageVerified');
    const cookieMatch = document.cookie.match(/ageVerified=true/);

    // If not verified, redirect to age gate
    if (!isAgeVerified && !cookieMatch) {
        window.location.href = 'index.html';
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    const themeText = document.querySelector('.theme-toggle-text');
    const themeIconMobile = document.querySelector('.theme-toggle-icon-mobile');
    const themeTextMobile = document.querySelector('.theme-toggle-text-mobile');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        html.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Тёмная';
        if (themeIconMobile) themeIconMobile.textContent = '🌙';
        if (themeTextMobile) themeTextMobile.textContent = 'Тёмная';
    } else {
        html.classList.add('dark');
    }

    function toggleTheme() {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Светлая';
            if (themeIconMobile) themeIconMobile.textContent = '☀️';
            if (themeTextMobile) themeTextMobile.textContent = 'Светлая';
            localStorage.setItem('theme', 'dark');
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Тёмная';
            if (themeIconMobile) themeIconMobile.textContent = '🌙';
            if (themeTextMobile) themeTextMobile.textContent = 'Тёмная';
            localStorage.setItem('theme', 'light');
        }
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // Hamburger Menu Functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');

        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (!navMenu.classList.contains('hidden')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.add('hidden');

            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Apple-Style Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu Tabs Functionality
    const menuData = {
        hookah: [
            { name: 'Классический кальян', price: '1500₽', description: 'Premium табак, крепость на выбор' },
            { name: 'Фруктовый микс', price: '1800₽', description: 'Экзотические фруктовые вкусы' },
            { name: 'VIP кальян', price: '2500₽', description: 'Премиум табак и эксклюзивная чаша' }
        ],
        drinks: [
            { name: 'Лимонад домашний', price: '350₽', description: 'Свежевыжатый' },
            { name: 'Чай ассорти', price: '300₽', description: 'Зеленый, черный, травяной' },
            { name: 'Кофе латте', price: '250₽', description: 'На миндальном/кокосовом молоке' }
        ],
        snacks: [
            { name: 'Фруктовая тарелка', price: '800₽', description: 'Сезонные фрукты' },
            { name: 'Сырная тарелка', price: '900₽', description: 'Ассорти из 5 видов сыра' },
            { name: 'Снэки микс', price: '600₽', description: 'Орехи, чипсы, крекеры' }
        ]
    };

    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContent = document.querySelector('.menu-content');

    function renderMenu(category) {
        const items = menuData[category];
        menuContent.innerHTML = items.map(item => `
            <div class="p-6 sm:p-8 bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">${item.name}</h3>
                <p class="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">${item.price}</p>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">${item.description}</p>
            </div>
        `).join('');

        // Apply grid layout to container
        menuContent.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8';
    }

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active styles from all tabs
            menuTabs.forEach(t => {
                t.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
                t.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });

            // Add active styles to clicked tab
            tab.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            tab.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');

            renderMenu(tab.dataset.tab);
        });
    });

    // Initialize with hookah menu
    renderMenu('hookah');

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Update urgency counter (demo)
    function updateAvailableSeats() {
        const seats = Math.floor(Math.random() * 5) + 1;
        const urgencySection = document.querySelector('.urgency h2');
        if (urgencySection) {
            urgencySection.innerHTML = `🔥 Осталось ${seats} столика на сегодня!`;
        }
    }

    // Update every 5 minutes
    setInterval(updateAvailableSeats, 300000);

    // Yandex Map Initialization
    function initMap() {
        ymaps.ready(function () {
            // Координаты площади Гагарина в Петрозаводске
            const gagarinSquare = [61.784476, 34.346867];

            const map = new ymaps.Map('map', {
                center: gagarinSquare,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Добавляем метку на карту
            const placemark = new ymaps.Placemark(gagarinSquare, {
                balloonContent: '<strong>Кальянная [НАЗВАНИЕ]</strong><br>пл. Гагарина, Петрозаводск<br><a href="https://t.me/lounge_ptz_bot">Забронировать</a>'
            }, {
                preset: 'islands#redDotIcon'
            });

            map.geoObjects.add(placemark);
        });
    }

    // Запускаем инициализацию карты
    initMap();
});
