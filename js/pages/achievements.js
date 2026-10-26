// Выбор персонажа на странице достижений.
// В HTML у кнопки задан data-char="имя" (заблокированные кнопки disabled и не реагируют).
function showAchievements(button) {
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.char-btn').forEach(btn => btn.classList.remove('active'));
    // Добавляем активный класс нажатой кнопке
    button.classList.add('active');

    // Здесь можно добавить логику переключения таблиц достижений разных персонажей
    // (button.dataset.char — id персонажа). Пока что таблица одна, но структура готова для расширения
}

document.querySelectorAll('.char-btn[data-char]').forEach(btn => {
    btn.addEventListener('click', () => showAchievements(btn));
});
