/* Editorial — interactions */
document.addEventListener('DOMContentLoaded', () => {

    /* Menu mobile */
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    toggle?.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
    });
    links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
    }));

    /* Reveal au scroll (avec apparition en cascade des éléments frères) */
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => {
        const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
        const i = sibs.indexOf(el);
        if (i > 0) el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
        io.observe(el);
    });

    /* Lien de nav actif selon la page courante */
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const target = a.getAttribute('href').split('/').pop();
        const isActive = target === here || (here === '' && target === 'index.html');
        a.classList.toggle('active', isActive);
        if (isActive) a.setAttribute('aria-current', 'page');
    });

    /* Copier email */
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.dataset.copy || '').then(() => {
            const tip = document.createElement('span');
            tip.className = 'copy-tip'; tip.textContent = 'Copié';
            copyBtn.appendChild(tip);
            const icon = copyBtn.querySelector('i');
            icon?.classList.replace('fa-copy', 'fa-check');
            setTimeout(() => { tip.remove(); icon?.classList.replace('fa-check', 'fa-copy'); }, 1700);
        });
    });

    /* Difficultés : bascule version courte / détaillée */
    const pbToggle = document.querySelector('.pb-toggle');
    const pbList   = document.getElementById('problems-list');
    pbToggle?.addEventListener('click', () => {
        const expanded = pbList.classList.toggle('expanded');
        pbToggle.setAttribute('aria-expanded', String(expanded));
        const label = pbToggle.querySelector('.pb-toggle-label');
        if (label) label.textContent = expanded ? 'Masquer le détail' : 'Voir le détail';
    });

    /* Retour haut */
    const top = document.querySelector('.to-top');
    if (top) {
        window.addEventListener('scroll', () => top.classList.toggle('visible', window.scrollY > 500), { passive: true });
        top.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
});
