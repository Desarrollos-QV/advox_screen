tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            colors: {
                advox: {
                    dark: '#0a1930',   /* Azul marino profundo del logo */
                    primary: '#0066cc', /* Azul medio */
                    cyan: '#00a3ff',    /* Cyan brillante del logo */
                    light: '#e6f4ff'    /* Fondo suave */
                }
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 163, 255, 0.3)',
            }
        }
    }
}

// Inicializar iconos
lucide.createIcons();

// Efecto Navbar al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const navInner = document.getElementById('navbar-inner');
    
    if (window.scrollY > 20) {
        // Estilo Flotante tipo cristal
        nav.classList.remove('top-0', 'w-full', 'bg-white/90', 'border-b', 'border-gray-100', 'rounded-none');
        nav.classList.add('top-4', 'w-[95%]', 'max-w-7xl', 'bg-white/50', 'border', 'border-white/30', 'shadow-2xl', 'rounded-3xl');
        navInner.classList.remove('h-20');
        navInner.classList.add('h-16');
    } else {
        // Estado inicial full-width
        nav.classList.add('top-0', 'w-full', 'bg-white/90', 'border-b', 'border-gray-100', 'rounded-none');
        nav.classList.remove('top-4', 'w-[95%]', 'max-w-7xl', 'bg-white/50', 'border', 'border-white/30', 'shadow-2xl', 'rounded-3xl');
        navInner.classList.add('h-20');
        navInner.classList.remove('h-16');
    }
});

// ══ LÓGICA DEL MENÚ MÓVIL ══
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
    mobileMenu.classList.remove('invisible');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    setTimeout(() => {
        mobileMenuBackdrop.classList.add('opacity-100');
        mobileMenuPanel.classList.remove('translate-x-full');
        
        // Efecto escalonado para los links (Staggered Animation)
        mobileLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(30px)';
            link.style.transition = `all 0.5s ease-out ${0.1 * (index + 1)}s`;
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 50);
        });
    }, 10);
}

function closeMobileMenu() {
    mobileMenuBackdrop.classList.remove('opacity-100');
    mobileMenuPanel.classList.add('translate-x-full');
    
    // Resetear estados de los links
    mobileLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(30px)';
    });

    document.body.style.overflow = ''; // Restaurar scroll
    setTimeout(() => {
        mobileMenu.classList.add('invisible');
    }, 500);
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

// Cerrar al hacer click en un link
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});