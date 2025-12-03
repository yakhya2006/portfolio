// --- Bloc 1: Gestion de la Navbar et du bouton "start" ---
const navbar = document.querySelector('.navbar');
const startButton = document.querySelector('.start');
let lastY = window.scrollY;
const hideAfter = 100;
const upShowDelta = 5;
let ticking = false;

window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y > hideAfter && delta > 0) {
            navbar.classList.add('hidden');
            navbar.classList.remove('compact');
        } else if (lastY - y > upShowDelta) {
            navbar.classList.remove('hidden');
            navbar.classList.add('compact');
        } else if (y <= 10) {
            navbar.classList.remove('hidden', 'compact');
        }
        if (y > hideAfter) {
            startButton.classList.add('scrolled');
        } else {
            startButton.classList.remove('scrolled');
        }
        lastY = y;
        ticking = false;
    });
}, {passive: true});


document.addEventListener('DOMContentLoaded', () => {

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });

    const navLinks = document.querySelectorAll('.navbar ul li a[href^="#"]');
    const sections = document.querySelectorAll('section[id], footer[id]');

    const navObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const navObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);
    sections.forEach(section => {
        navObserver.observe(section);
    });
});