// Sélecteur corrigé : .barre au lieu de .navbar
const navbar = document.querySelector('.barre');
// Sélecteur corrigé : #start au lieu de .start
const startButton = document.querySelector('#start');
let lastY = window.scrollY;
const hideAfter = 100;
const upShowDelta = 5;
let ticking = false;

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
    const sections = document.querySelectorAll('section[id]');

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

    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Scroll down
            navbar.style.top = '-80px';
        } else {
            // Scroll up
            navbar.style.top = '0';
        }
        lastScrollY = window.scrollY;
    });
});
