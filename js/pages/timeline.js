// Переключение глав летописи.
// В HTML у каждого .chapter-item задан data-chapter="имя", а у блока главы — id="chapter-имя".
// Новая глава = новый .chapter-item + новый .chapter-content, JS менять не нужно.
function showChapter(id) {
    document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.chapter-content').forEach(el => el.classList.remove('active'));

    const item = document.querySelector('.chapter-item[data-chapter="' + id + '"]');
    const content = document.getElementById('chapter-' + id);
    if (item) item.classList.add('active');
    if (content) content.classList.add('active');
}

document.querySelectorAll('.chapter-item[data-chapter]').forEach(item => {
    item.addEventListener('click', () => showChapter(item.dataset.chapter));
});
