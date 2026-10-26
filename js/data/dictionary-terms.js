// ДАННЫЕ СЛОВАРЯ — здесь добавляются и правятся термины.
// x/y — позиция узла на карте в процентах (0–100); links — id связанных терминов.
const termsData = [
    { id: 'resonance', name: 'Резонанс', x: 50, y: 45, desc: 'Магическое поле, пронизывающее мир. Источник всей магии.', links: ['cacophony', 'silence', 'anchors', 'node'] },
    { id: 'cacophony', name: 'Какофония', x: 25, y: 20, desc: 'Резонанс, обретший сознание. Заперта в ядре мира.', links: ['resonance', 'fog', 'phantom_bell'] },
    { id: 'silence', name: 'Тишина', x: 75, y: 20, desc: 'Состояние мира без магии. Фактически — тюрьма для Какофонии.', links: ['resonance', 'silent_church', 'great_hushing'] },
    { id: 'great_hushing', name: 'Великое Умолкание', x: 80, y: 75, desc: 'Событие 100-летней давности: отключение Резонанса ради заточения Какофонии.', links: ['silence', 'anchors', 'morven'] },
    { id: 'node', name: 'Узел', x: 50, y: 85, desc: 'Точка пересечения трёх Разломов, эпицентр ритуала.', links: ['resonance', 'anchors'] },
    { id: 'anchors', name: 'Якоря', x: 20, y: 75, desc: 'Три героя, ставшие живыми замками клетки: Элиас, Двалин, Лиара.', links: ['resonance', 'node', 'great_hushing'] },
    { id: 'morven', name: 'Морвен', x: 10, y: 45, desc: 'Четвёртая участница ритуала, Хранительница. Та самая Травница.', links: ['great_hushing', 'collectors'] },
    { id: 'fog', name: 'Туман', x: 30, y: 5, desc: 'Проявление Какофонии, пытающейся вырваться.', links: ['cacophony'] },
    { id: 'phantom_bell', name: 'Призрачный Звон', x: 15, y: 35, desc: 'Безумие, поражающее бывших магов и эльфов.', links: ['cacophony'] },
    { id: 'silent_church', name: 'Немая Церковь', x: 90, y: 45, desc: 'Религия, поклоняющаяся Тишине. Подавляет любые аномалии.', links: ['silence', 'collectors'] },
    { id: 'collectors', name: 'Собиратели Прошлого', x: 65, y: 35, desc: 'Подпольная сеть учёных, ищущих знания Эпохи Резонанса.', links: ['morven', 'silent_church'] }
];
