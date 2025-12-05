// Page loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle effect in #about section
    initParticlesEffect();
    
    // Initialize particle effect in #final section
    initParticlesEffectFinal();
    
    // Initialize typewriter effect
    initTypewriterEffect();
    
    // Remove loading screen and show page
    setTimeout(function() {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
    }, 1000);

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
    // Save language first
    localStorage.setItem('language', lang);
    
    // Update all elements with data-es and data-en attributes
    const elements = document.querySelectorAll('[data-es][data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Skip the typewriter element - it will be handled separately
            if (element.id === 'typewriter') {
                return;
            }
            // For grow-title, update the inner span to preserve animation structure
            if (element.classList.contains('grow-title')) {
                const innerSpan = element.querySelector('.inner');
                if (innerSpan) {
                    innerSpan.innerHTML = text;
                }
            } else {
                element.innerHTML = text;
            }
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
    
    // Restart typewriter effect with new language
    if (typeof window.restartTypewriter === 'function') {
        window.restartTypewriter();
    }
}

// ============================================= */
// PARTICLE EFFECT FUNCTION */
// ============================================= */

function initParticlesEffect() {
    const particlesContainer = document.getElementById('particles-container');
    
    if (!particlesContainer) return;
    
    const particleCount = 80;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size (small)
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Initial position
        resetParticle(particle);
        
        particlesContainer.appendChild(particle);
        
        // Animate
        animateParticle(particle);
    }
    
    function resetParticle(particle) {
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';
        
        return {
            x: posX,
            y: posY
        };
    }
    
    function animateParticle(particle) {
        // Initial position
        const pos = resetParticle(particle);
        
        // Random animation properties
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Animate with timing
        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            // Move in a slight direction
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30; // Move upwards
            
            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;
            
            // Reset after animation completes
            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);
        }, delay * 1000);
    }
    
    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
        // Create particles at mouse position
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        // Create temporary particle
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Small size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at mouse
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';
        
        particlesContainer.appendChild(particle);
        
        // Animate outward
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, 10);
        
        // Subtle movement of gradient spheres
        const spheres = document.querySelectorAll('.gradient-sphere');
        const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
        
        spheres.forEach(sphere => {
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Initialize particle effect in #final section
function initParticlesEffectFinal() {
    const particlesContainer = document.getElementById('particles-container-final');
    
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size (small)
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Initial position
        resetParticle(particle);
        
        particlesContainer.appendChild(particle);
        
        // Animate
        animateParticle(particle);
    }
    
    function resetParticle(particle) {
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';
        
        return {
            x: posX,
            y: posY
        };
    }
    
    function animateParticle(particle) {
        // Initial position
        const pos = resetParticle(particle);
        
        // Random animation properties
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Animate with timing
        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            // Move in a slight direction
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30; // Move upwards
            
            
            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;
            
            // Reset after animation completes
            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);
        }, delay * 1000);
    }
}

// ========================================
// Typewriter Effect for #typewriter element
// ========================================

function initTypewriterEffect() {
    const out = document.getElementById('typewriter');
    if (!out) return;
    
    // Get current language
    const currentLang = localStorage.getItem('language') || 'es';
    const twText = out.getAttribute(`data-${currentLang}`);
    
    if (!twText) return;
    
    let idx = 0;
    const initialDelay = 1400; // wait for title animation (900ms + 400ms delay + buffer)
    const charDelay = 10; // ms per character
    
    const cursorSpan = '<span id="cursor" style="display:inline-block; width:10px; height:1em; background:white; margin-left:6px; vertical-align:bottom; animation: blink 0.7s steps(1) infinite;"></span>';
    
    let started = false;
    let acc = 0;
    let lastTs = 0;
    
    function loop(ts) {
        if (!lastTs) lastTs = ts;
        const delta = ts - lastTs;
        lastTs = ts;
        
        if (!started) {
            acc += delta;
            if (acc >= initialDelay) {
                started = true;
                acc = 0;
                // show initial cursor immediately
                out.innerHTML = '' + cursorSpan;
            } else {
                typewriterAnimationId = requestAnimationFrame(loop);
                return;
            }
        }
        
        acc += delta;
        let updated = false;
        while (acc >= charDelay && idx < twText.length) {
            idx++;
            acc -= charDelay;
            updated = true;
        }
        if (updated) {
            out.innerHTML = twText.slice(0, idx) + cursorSpan;
        }
        
        if (idx < twText.length) {
            typewriterAnimationId = requestAnimationFrame(loop);
        } else {
            typewriterAnimationId = null;
        }
    }
    
    typewriterAnimationId = requestAnimationFrame(loop);
}

// Store the typewriter effect initialization globally to restart on language change
let typewriterAnimationId = null;

window.restartTypewriter = function() {
    const out = document.getElementById('typewriter');
    if (!out) return;
    
    // Cancel any ongoing animation
    if (typewriterAnimationId) {
        cancelAnimationFrame(typewriterAnimationId);
        typewriterAnimationId = null;
    }
    
    // Clear current content
    out.innerHTML = '';
    
    // Small delay to ensure clean restart
    setTimeout(() => {
        initTypewriterEffect();
    }, 50);
};


