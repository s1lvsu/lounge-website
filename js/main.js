// Age Verification Check
(function checkAgeVerification() {
    const isAgeVerified = localStorage.getItem('ageVerified');
    const cookieMatch = document.cookie.match(/ageVerified=true/);

    // If not verified, redirect to age gate
    if (!isAgeVerified && !cookieMatch) {
        window.location.href = 'index.html';
    }
})();

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-toggle-icon');
const themeText = document.querySelector('.theme-toggle-text');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Тёмная';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Тёмная';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Светлая';
        localStorage.setItem('theme', 'dark');
    }
});

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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
        <div class="menu-item">
            <h3>${item.name}</h3>
            <p class="menu-price">${item.price}</p>
            <p class="menu-description">${item.description}</p>
        </div>
    `).join('');
}

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
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
