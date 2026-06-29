document.addEventListener('DOMContentLoaded', () => {

    /* ---- Typewriter ---- */
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Étudiant BTS SIO — Option SLAM',
        'Développeur Web Junior',
        'Passionné par le code',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let paused = false;

    function typewrite() {
        if (paused) return;
        const current = phrases[phraseIndex];
        if (deleting) {
            typewriterEl.textContent = current.slice(0, charIndex--);
            if (charIndex < 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                paused = true;
                setTimeout(() => { paused = false; typewrite(); }, 400);
                return;
            }
            setTimeout(typewrite, 45);
        } else {
            typewriterEl.textContent = current.slice(0, charIndex++);
            if (charIndex > current.length) {
                paused = true;
                setTimeout(() => { deleting = true; paused = false; typewrite(); }, 2200);
                return;
            }
            setTimeout(typewrite, 70);
        }
    }
    typewrite();

    /* ---- Scroll reveal ---- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    /* ---- Active nav link ---- */
    const navLinks = document.querySelectorAll('#nav-menu ul li a');
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    document.querySelectorAll('section[id], footer[id]').forEach(s => navObserver.observe(s));

    /* ---- Hide / show navbar on scroll ---- */
    const navbar = document.getElementById('navbar');
    let lastY = window.scrollY;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.style.top = (y > lastY && y > navbar.offsetHeight) ? `-${navbar.offsetHeight}px` : '0';
        lastY = y;
    });

    /* ---- Hamburger ---- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.getElementById('nav-menu');

    hamburger?.addEventListener('click', () => navMenu.classList.toggle('active'));
    navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

    /* ---- Copy email ---- */
    const copyBtn = document.querySelector('.copy-email-btn');
    copyBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText('yakhyatimurkaev2006@gmail.com').then(() => {
            const icon = copyBtn.querySelector('i');
            icon.classList.replace('fa-copy', 'fa-check');

            const tip = document.createElement('span');
            tip.textContent = 'Copié !';
            Object.assign(tip.style, {
                position: 'absolute', bottom: '130%', left: '50%',
                transform: 'translateX(-50%)', background: 'var(--primary-deep)',
                color: '#fff', padding: '0.25rem 0.6rem', borderRadius: '6px',
                fontSize: '0.8rem', whiteSpace: 'nowrap', pointerEvents: 'none',
            });
            copyBtn.style.position = 'relative';
            copyBtn.appendChild(tip);

            setTimeout(() => {
                icon.classList.replace('fa-check', 'fa-copy');
                tip.remove();
            }, 2000);
        });
    });

    /* ---- Back to top ---- */
    const backBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => backBtn?.classList.toggle('visible', window.scrollY > 300));
    backBtn?.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

});
