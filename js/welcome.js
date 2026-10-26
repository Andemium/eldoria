// Приветственная заставка главной страницы (index.html): клик убирает заставку, плавают частицы.
const welcomeBanner = document.getElementById('welcome-banner');
const mainContent = document.getElementById('main-content');

if (welcomeBanner && mainContent) {
    welcomeBanner.addEventListener('click', () => {
        welcomeBanner.classList.add('dismissed');
        setTimeout(() => {
            welcomeBanner.style.display = 'none';
            mainContent.classList.add('visible');
        }, 1000);
    });
}

// ===== Частицы =====
const PARTICLE_COUNT = 20;

function createParticle() {
    if (!welcomeBanner) return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    welcomeBanner.appendChild(particle);
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
}
