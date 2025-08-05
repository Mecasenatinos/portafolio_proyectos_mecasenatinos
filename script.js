// JavaScript adicional para el portafolio Mecasenatinos

// Configuración de partículas de fondo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Contador animado para estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 100) {
                counter.textContent = Math.ceil(current) + '%';
            } else {
                counter.textContent = Math.ceil(current) + '+';
            }
        }, 20);
    });
}

// Efecto de escritura para el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Carousel de proyectos (opcional)
class ProjectCarousel {
    constructor(container) {
        this.container = container;
        this.cards = container.querySelectorAll('.project-card');
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        this.createControls();
        this.autoPlay();
    }
    
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        controls.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        
        this.container.appendChild(controls);
        
        controls.querySelector('.prev-btn').addEventListener('click', () => this.prev());
        controls.querySelector('.next-btn').addEventListener('click', () => this.next());
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = this.currentIndex === 0 ? this.cards.length - 1 : this.currentIndex - 1;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.cards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - this.currentIndex) * 100}%)`;
        });
    }
    
    autoPlay() {
        setInterval(() => this.next(), 5000);
    }
}

// Tema oscuro/claro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Efecto de cursor personalizado
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transition: transform 0.1s;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas de fondo
    createParticles();
    
    // Cargar tema guardado
    loadTheme();
    
    // Crear cursor personalizado
    createCustomCursor();
    
    // Efecto de escritura en el título (con delay)
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            typeWriter(heroTitle, 'MECASENATINOS', 150);
        }
    }, 1000);
    
    // Animar contadores cuando sean visibles
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(statsSection);
    }
    
    // Añadir botón de tema
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s;
        backdrop-filter: blur(10px);
    `;
    
    themeToggle.addEventListener('click', () => {
        toggleTheme();
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
    
    document.body.appendChild(themeToggle);
});

// Lazy loading para imágenes (si se añaden después)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Exportar funciones para uso global
window.MecasenatinosUtils = {
    showNotification,
    toggleTheme,
    createParticles,
    animateCounters,
    typeWriter
};
