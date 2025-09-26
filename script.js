// Animación del título con dos escenas repetitivas
function startTitleAnimation() {
    const brandName = document.getElementById('animated-name');
    const brandSlogan = document.getElementById('animated-slogan');
    
    let isFirstScene = true;
    
    // Función para cambiar entre escenas
    function changeScene() {
        if (isFirstScene) {
            // Primera escena: "@mararulz"
            brandName.textContent = '@mararulz';
            brandName.classList.add('animated-title');
            
            setTimeout(() => {
                brandName.classList.remove('animated-title');
            }, 500);
        } else {
            // Segunda escena: "Mara Ruiz"
            brandName.textContent = 'Mara Ruiz';
            brandName.classList.add('animated-title');
            
            setTimeout(() => {
                brandName.classList.remove('animated-title');
            }, 500);
        }
        
        isFirstScene = !isFirstScene;
    }
    
    // Iniciar la animación inmediatamente
    changeScene();
    
    // Configurar intervalo para cambiar cada 5 segundos
    setInterval(changeScene, 5000);
}

// Ocultar header al hacer scroll hacia abajo
function initScrollHideHeader() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll hacia abajo
            header.classList.add('hidden');
        } else {
            // Scroll hacia arriba
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
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
        
        // Iniciar animación del título después de la carga
        setTimeout(() => {
            startTitleAnimation();
        }, 1000);
    }, 100);
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initPageLoad();
    initScrollHideHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    
    // Prevenir animación en navegación hacia atrás
    if (performance.navigation.type === 2) {
        document.body.style.opacity = '1';
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
