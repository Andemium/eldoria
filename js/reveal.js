// Плавное появление карточек при прокрутке.
// Чтобы анимация работала для нового блока — добавьте его CSS-класс в список селекторов.
const REVEAL_SELECTOR = '.map-card, .resident-card, .class-detail';

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});
