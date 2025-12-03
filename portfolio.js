document.addEventListener('DOMContentLoaded', () => {
    // Animation de révélation au défilement
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

    // Mise en évidence du lien de navigation actif
    const navLinks = document.querySelectorAll('.navbar nav ul li a');
    const sections = document.querySelectorAll('section[id]');

    const navObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Active when section is in the middle of the viewport
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Masquer/afficher la barre de navigation au défilement
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > navbar.offsetHeight) {
            // Défilement vers le bas
            navbar.style.top = `-${navbar.offsetHeight}px`;
        } else {
            // Défilement vers le haut
            navbar.style.top = '0';
        }
        lastScrollY = window.scrollY;
    });

    // Menu hamburger pour mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Fonctionnalité de copie de l'email
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'yakhyatimurkaev2006@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const icon = copyEmailBtn.querySelector('i');
                const originalAriaLabel = copyEmailBtn.getAttribute('aria-label');
                if (icon) {
                    icon.classList.remove('fa-copy');
                    icon.classList.add('fa-check');
                    copyEmailBtn.setAttribute('aria-label', 'Email copié !');

                    // Créer une petite pop-up de confirmation
                    const confirmation = document.createElement('span');
                    confirmation.innerText = 'Copié !';
                    confirmation.style.position = 'absolute';
                    confirmation.style.bottom = '125%';
                    confirmation.style.left = '50%';
                    confirmation.style.transform = 'translateX(-50%)';
                    confirmation.style.background = 'var(--primary-color)';
                    confirmation.style.color = '#fff';
                    confirmation.style.padding = '0.3rem 0.6rem';
                    confirmation.style.borderRadius = '5px';
                    confirmation.style.fontSize = '0.9rem';
                    confirmation.style.whiteSpace = 'nowrap';
                    copyEmailBtn.appendChild(confirmation);

                    setTimeout(() => {
                        icon.classList.remove('fa-check');
                        icon.classList.add('fa-copy');
                        copyEmailBtn.setAttribute('aria-label', originalAriaLabel);
                        if (copyEmailBtn.contains(confirmation)) {
                            copyEmailBtn.removeChild(confirmation);
                        }
                    }, 2000);
                }
            }).catch(err => {
                console.error("Impossible de copier l'email : ", err);
                alert("Impossible de copier l'email. Vous pouvez le copier manuellement : yakhyatimurkaev2006@gmail.com");
            });
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
