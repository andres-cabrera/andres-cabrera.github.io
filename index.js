// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
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
