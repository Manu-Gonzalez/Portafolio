// Navegación suave
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

// Efecto parallax para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#inicio');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.project-card, .skill-tag').forEach(el => {
    observer.observe(el);
});

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

// Menú móvil
const mobileMenuBtn = document.querySelector('button');
const nav = document.querySelector('nav div div:last-child');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        nav.classList.toggle('flex-col');
        nav.classList.toggle('absolute');
        nav.classList.toggle('top-full');
        nav.classList.toggle('left-0');
        nav.classList.toggle('w-full');
        nav.classList.toggle('bg-gray-900');
        nav.classList.toggle('p-4');
    });
}

// Formulario de contacto mejorado
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showStatus('Por favor, completa todos los campos correctamente.', 'error');
            return;
        }
        
        const btn = contactForm.querySelector('.submit-btn');
        const originalHTML = btn.innerHTML;
        
        // Estado de carga
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
        btn.disabled = true;
        showStatus('Enviando mensaje...', 'loading');
        
        try {
            // Simular envío (aquí integrarías con un servicio real)
            await simulateFormSubmission();
            
            // Éxito
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>¡Enviado!';
            showStatus('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                contactForm.reset();
                hideStatus();
            }, 3000);
            
        } catch (error) {
            // Error
            btn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error';
            showStatus('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 2000);
        }
    });
}

// Funciones auxiliares del formulario
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover clases de error previas
    field.classList.remove('border-red-500/50');
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('border-red-500/50');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        field.classList.add('border-red-500/50');
        return false;
    }
    
    field.classList.add('border-green-500/50');
    return true;
}

function clearErrors(e) {
    const field = e.target;
    field.classList.remove('border-red-500/50');
}

function validateForm() {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.classList.remove('hidden');
}

function hideStatus() {
    formStatus.classList.add('hidden');
}

async function simulateFormSubmission() {
    // Simular delay de red
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simular 90% de éxito
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Error de red'));
            }
        }, 2000);
    });
}

// Efectos de hover para inputs
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Efecto de partículas en el fondo
function createParticles() {
    const hero = document.querySelector('#inicio');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// CSS para partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Inicializar partículas
createParticles();

// Contador de habilidades (animación)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Activar navegación activa
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-400');
        }
    });
});