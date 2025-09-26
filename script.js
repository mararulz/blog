// Animación sofisticada del nombre (solo una vez)
function startNameAnimation() {
    const brandName = document.getElementById('animated-name');
    const brandSlogan = document.getElementById('animated-slogan');
    
    // Inicialmente vacío
    brandSlogan.textContent = '';
    
    // Secuencia de animación
    setTimeout(() => {
        // Paso 1: Mostrar "Mara Rulz"
        brandName.textContent = 'Mara Rulz';
        brandName.style.opacity = '1';
        
        setTimeout(() => {
            // Paso 2: Transformar la "l" en "i" con efecto
            const nameText = brandName.textContent;
            const lastLetter = nameText[nameText.length - 1];
            
            if (lastLetter === 'z') {
                // Crear efecto de transformación letra por letra
                transformLtoI();
            }
        }, 1500);
        
    }, 500);
}

function transformLtoI() {
    const brandName = document.getElementById('animated-name');
    const brandSlogan = document.getElementById('animated-slogan');
    
    // Efecto de desvanecimiento de la "l"
    brandName.style.opacity = '0.5';
    
    setTimeout(() => {
        // Reemplazar "Rulz" por "Ruiz"
        brandName.textContent = 'Mara Ruiz';
        brandName.style.opacity = '1';
        
        // Mostrar primer slogan
        setTimeout(() => {
            brandSlogan.textContent = 'Its Ruiz not Rulz';
            brandSlogan.style.opacity = '1';
            brandSlogan.style.color = '#f7337c';
            brandSlogan.style.fontWeight = '600';
            
            // Mostrar slogan final después de un tiempo
            setTimeout(() => {
                brandSlogan.style.opacity = '0';
                setTimeout(() => {
                    brandSlogan.textContent = 'Psicología con sentido';
                    brandSlogan.style.opacity = '1';
                    brandSlogan.style.color = '';
                    brandSlogan.style.fontWeight = '400';
                }, 500);
            }, 2000);
        }, 800);
    }, 600);
}

// Menu mobile toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Cerrar menu al hacer click en un link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling para navegación
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animación de aparición de elementos al hacer scroll
function initScrollAnimations() {
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

    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.blog-card, .service-card, .about-content, .contact-form, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Formulario de contacto
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío exitoso
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado! Mara se pondrá en contacto contigo pronto.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// Efecto de carga inicial mejorado
function initPageLoad() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
        
        // Iniciar animación del nombre después de la carga
        setTimeout(() => {
            startNameAnimation();
        }, 1000);
    }, 100);
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initPageLoad();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    
    // Prevenir animación en navegación hacia atrás
    if (performance.navigation.type === 2) {
        document.body.style.opacity = '1';
        const brandName = document.getElementById('animated-name');
        const brandSlogan = document.getElementById('animated-slogan');
        brandName.textContent = 'Mara Ruiz';
        brandSlogan.textContent = 'Psicología con sentido';
    }
});

// Manejar resize de ventana
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
