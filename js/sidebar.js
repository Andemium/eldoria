// Боковое меню — ЕДИНСТВЕННОЕ место, где оно описано.
// Чтобы добавить/переименовать раздел, правится только список NAV_ITEMS ниже.
// Скрипт подключается сразу после <nav class="sidebar"></nav> на каждой странице.
(function () {
    const NAV_ITEMS = [
        { href: 'index.html',                icon: 'fa-home',          text: 'Главная' },
        { href: 'sections/maps.html',        icon: 'fa-map-marked-alt', text: 'Карты' },
        { href: 'sections/settlements.html', icon: 'fa-house-chimney', text: 'Поселения', alsoActiveFor: 'sections/settlements/' },
        { href: 'sections/dictionary.html',  icon: 'fa-book-open',     text: 'Словарь' },
        { href: 'sections/lore.html',        icon: 'fa-scroll',        text: 'Лор Эльдории' },
        { href: 'sections/timeline.html',    icon: 'fa-history',       text: 'Летопись' },
        { href: 'sections/character.html',   icon: 'fa-user-shield',   text: 'Создание персонажа' },
        { href: 'sections/achievements.html', icon: 'fa-trophy',       text: 'Достижения' }
    ];

    // Корень сайта вычисляется от расположения этого скрипта (js/sidebar.js),
    // поэтому меню работает на любой глубине страниц и на GitHub Pages, и локально.
    const root = new URL('../', document.currentScript.src).href;
    let current = location.href.split('#')[0].split('?')[0];
    current = current.startsWith(root) ? current.slice(root.length) : '';
    if (current === '' || current.endsWith('/')) current += 'index.html';

    const isActive = item =>
        current === item.href || (item.alsoActiveFor && current.startsWith(item.alsoActiveFor));

    const nav = document.querySelector('nav.sidebar');
    if (!nav) return;

    nav.innerHTML =
        '<div class="sidebar-header">' +
            '<div class="sidebar-icon"><i class="fas fa-dragon"></i></div>' +
            '<div class="sidebar-title">Эльдория</div>' +
            '<button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span></button>' +
        '</div>' +
        NAV_ITEMS.map(item =>
            '<a href="' + root + item.href + '" class="nav-item' + (isActive(item) ? ' active' : '') + '">' +
                '<div class="nav-icon"><i class="fas ' + item.icon + '"></i></div>' +
                '<span class="nav-text">' + item.text + '</span>' +
            '</a>'
        ).join('');

    // ===== Бургер-меню (работает только на телефонах, на десктопе кнопка скрыта стилями) =====
    const toggle = nav.querySelector('.menu-toggle');

    function setMenu(open) {
        nav.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    }

    toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));

    // Закрываем: клик вне меню, клавиша Esc, переход на широкий экран
    document.addEventListener('click', e => {
        if (!nav.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setMenu(false);
    });
    window.matchMedia('(min-width: 769px)').addEventListener('change', e => {
        if (e.matches) setMenu(false);
    });
})();
