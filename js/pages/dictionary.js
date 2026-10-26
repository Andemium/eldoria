// Интерактивная «паутина знаний». Данные терминов — в js/data/dictionary-terms.js (подключается раньше).

let isDragging = false;
let startX, startY, initialLeft, initialTop;
const mapContainer = document.getElementById('constellationMap');
const svgLayer = document.getElementById('connectionsSvg');

document.addEventListener('DOMContentLoaded', () => {
    renderConstellation();
    initTouchControls();
});

function renderConstellation() {
    // Очистка
    svgLayer.innerHTML = '';
    const oldNodes = mapContainer.querySelectorAll('.constellation-node');
    oldNodes.forEach(n => n.remove());

    // Рисуем линии
    termsData.forEach(term => {
        term.links.forEach(targetId => {
            const target = termsData.find(t => t.id === targetId);
            if (target) drawLine(term, target);
        });
    });

    // Создаем узлы
    termsData.forEach(term => {
        const node = document.createElement('div');
        node.className = 'constellation-node';
        node.style.left = `${term.x}%`;
        node.style.top = `${term.y}%`;
        node.dataset.id = term.id;
        
        node.innerHTML = `
            <div class="node-core"></div>
            <div class="node-glow"></div>
            <span class="node-label">${term.name}</span>
        `;

        node.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы клик по узлу не триггерил драг карты
            openTermInfo(term);
        });
        
        // Подсветка при наведении (только для ПК)
        if (!('ontouchstart' in window)) {
            node.addEventListener('mouseenter', () => highlightConnections(term.id, true));
            node.addEventListener('mouseleave', () => highlightConnections(term.id, false));
        }

        mapContainer.appendChild(node);
    });
}

function drawLine(term1, term2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${term1.x}%`);
    line.setAttribute('y1', `${term1.y}%`);
    line.setAttribute('x2', `${term2.x}%`);
    line.setAttribute('y2', `${term2.y}%`);
    line.classList.add('connection-line');
    line.dataset.from = term1.id;
    line.dataset.to = term2.id;
    svgLayer.appendChild(line);
}

function highlightConnections(termId, isActive) {
    const lines = document.querySelectorAll('.connection-line');
    lines.forEach(line => {
        const isConnected = line.dataset.from === termId || line.dataset.to === termId;
        line.classList.toggle('active', isActive && isConnected);
        line.classList.toggle('dimmed', isActive && !isConnected);
    });
    
    document.querySelectorAll('.constellation-node').forEach(node => {
        if (isActive && node.dataset.id !== termId) {
            const isConnected = Array.from(lines).some(l => 
                (l.dataset.from === termId && l.dataset.to === node.dataset.id) ||
                (l.dataset.to === termId && l.dataset.from === node.dataset.id)
            );
            node.classList.toggle('dimmed', !isConnected);
        } else {
            node.classList.remove('dimmed');
        }
    });
}

// --- Логика перемещения карты (Pan) ---
function initTouchControls() {
    // Мышь
    mapContainer.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);

    // Тачскрин
    mapContainer.addEventListener('touchstart', (e) => startDrag(e.touches[0]), {passive: false});
    window.addEventListener('touchmove', (e) => drag(e.touches[0]), {passive: false});
    window.addEventListener('touchend', endDrag);
}

function startDrag(e) {
    // Не начинаем драг, если кликнули по узлу или панели
    if (e.target.closest('.constellation-node') || e.target.closest('.term-info-panel')) return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    
    const style = window.getComputedStyle(mapContainer);
    const matrix = new WebKitCSSMatrix(style.transform);
    initialLeft = matrix.m41;
    initialTop = matrix.m42;
    
    mapContainer.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault(); // Блокируем скролл страницы при свайпе карты
    
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    mapContainer.style.transform = `translate(${initialLeft + dx}px, ${initialTop + dy}px)`;
}

function endDrag() {
    isDragging = false;
    mapContainer.style.cursor = 'default';
}

// --- Панель информации ---
function openTermInfo(term) {
    const panel = document.getElementById('termInfoPanel');
    document.getElementById('panelTitle').textContent = term.name;
    document.getElementById('panelDesc').textContent = term.desc;
    
    const tagsContainer = document.getElementById('connectionTags');
    tagsContainer.innerHTML = '';
    
    term.links.forEach(linkId => {
        const linkedTerm = termsData.find(t => t.id === linkId);
        if (linkedTerm) {
            const tag = document.createElement('span');
            tag.className = 'conn-tag';
            tag.textContent = linkedTerm.name;
            tag.onclick = () => {
                const nodeEl = document.querySelector(`.constellation-node[data-id="${linkId}"]`);
                if(nodeEl) {
                    // Центрируем карту на выбранном узле (опционально)
                    // Но пока просто откроем инфо
                    nodeEl.click();
                }
            };
            tagsContainer.appendChild(tag);
        }
    });

    panel.classList.add('active');
}

function closeTermInfo() {
    document.getElementById('termInfoPanel').classList.remove('active');
    highlightConnections(null, false);
}

// Кнопка закрытия панели (раньше был inline onclick в HTML)
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-panel-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeTermInfo);
});
