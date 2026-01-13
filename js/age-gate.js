// Age Gate Logic

document.addEventListener('DOMContentLoaded', function() {
    const confirmBtn = document.getElementById('confirmAge');
    const rejectBtn = document.getElementById('rejectAge');
    const ageGateContent = document.querySelector('.age-gate-content');

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
            rejectionMsg.className = 'rejection-message show';
            rejectionMsg.innerHTML = `
                <h3>Доступ ограничен</h3>
                <p>К сожалению, доступ к данному ресурсу разрешен только совершеннолетним пользователям (18+).</p>
                <p>Согласно законодательству РФ, табачная продукция не может быть продана лицам младше 18 лет.</p>
            `;
            ageGateContent.appendChild(rejectionMsg);
        } else {
            rejectionMsg.classList.add('show');
        }

        // Disable buttons
        confirmBtn.disabled = true;
        rejectBtn.disabled = true;
        confirmBtn.style.opacity = '0.5';
        rejectBtn.style.opacity = '0.5';
        confirmBtn.style.cursor = 'not-allowed';
        rejectBtn.style.cursor = 'not-allowed';

        // Optionally redirect away after 5 seconds
        setTimeout(function() {
            window.location.href = 'https://www.ya.ru';
        }, 5000);
    });
});
