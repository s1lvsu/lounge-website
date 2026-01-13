// Age Gate Logic

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggleAge');
    const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        html.classList.remove('dark');
        themeIcon.textContent = '🌙';
    } else {
        html.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const confirmBtn = document.getElementById('confirmAge');
    const rejectBtn = document.getElementById('rejectAge');

    // Confirm Age (18+)
    confirmBtn.addEventListener('click', function() {
        // Set cookie/localStorage to remember user's age confirmation
        // Cookie expires in 30 days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        localStorage.setItem('ageVerified', 'true');
        localStorage.setItem('ageVerifiedDate', new Date().toISOString());

        // Also set cookie for additional reliability
        document.cookie = `ageVerified=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;

        // Redirect to main page
        window.location.href = 'main.html';
    });

    // Reject Age (Under 18)
    rejectBtn.addEventListener('click', function() {
        // Show rejection message
        let rejectionMsg = document.querySelector('.rejection-message');

        if (!rejectionMsg) {
            rejectionMsg = document.createElement('div');
            rejectionMsg.className = 'mt-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-600 rounded-xl text-center opacity-0 transition-opacity duration-300';
            rejectionMsg.innerHTML = `
                <h3 class="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Доступ ограничен</h3>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">К сожалению, доступ к данному ресурсу разрешен только совершеннолетним пользователям (18+).</p>
                <p class="text-sm sm:text-base text-gray-700 dark:text-gray-300">Согласно законодательству РФ, табачная продукция не может быть продана лицам младше 18 лет.</p>
            `;
            document.querySelector('.max-w-2xl').appendChild(rejectionMsg);
            setTimeout(() => rejectionMsg.style.opacity = '1', 100);
        }

        // Disable buttons
        confirmBtn.disabled = true;
        rejectBtn.disabled = true;
        confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
        rejectBtn.classList.add('opacity-50', 'cursor-not-allowed');

        // Optionally redirect away after 5 seconds
        setTimeout(function() {
            window.location.href = 'https://www.ya.ru';
        }, 5000);
    });
});
