// Page loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen and show page
    setTimeout(function() {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
    }, 2000);

    // Language switcher functionality
    // Get saved language or default to 'es'
    const savedLanguage = localStorage.getItem('language') || 'es';
    
    // Set initial language
    setLanguage(savedLanguage);
    
    // Add event listeners to language buttons
    document.getElementById('lang-es').addEventListener('click', function() {
        setLanguage('es');
        localStorage.setItem('language', 'es');
    });
    
    document.getElementById('lang-en').addEventListener('click', function() {
        setLanguage('en');
        localStorage.setItem('language', 'en');
    });

    // Add mousemove event to all buttons for light follow effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const beforeElement = button.querySelector('::before');
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        });

        button.addEventListener('mouseleave', function() {
            button.style.setProperty('--mouse-x', '50%');
            button.style.setProperty('--mouse-y', '50%');
        });
    });
});

function setLanguage(lang) {
    // Update all elements with data-es and data-en attributes
    const elements = document.querySelectorAll('[data-es][data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.innerHTML = text;
        }
    });
    
    // Update active button
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

