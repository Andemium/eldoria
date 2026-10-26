#!/usr/bin/env python3
"""Прописывает адрес сайта в мета-тегах всех страниц (og:url, og:image, twitter:card).

Нужно для красивых превью ссылок в Discord / Telegram: они требуют АБСОЛЮТНЫЙ адрес картинки,
а какой он будет — зависит от вашего GitHub Pages. Запускайте из корня проекта:

    python tools/set-site-url.py https://ВАШ-НИК.github.io/ИМЯ-РЕПОЗИТОРИЯ/

Скрипт можно запускать повторно (старые строки заменяются) и после добавления новых страниц.
"""
import re, sys, pathlib

if len(sys.argv) != 2 or not sys.argv[1].startswith('http'):
    sys.exit('Использование: python tools/set-site-url.py https://ВАШ-НИК.github.io/ИМЯ-РЕПОЗИТОРИЯ/')

base = sys.argv[1].rstrip('/') + '/'
root = pathlib.Path(__file__).resolve().parent.parent
MARK = re.compile(r'[ \t]*<meta (?:property="og:(?:url|image)"|name="twitter:card")[^>]*>\n')

for page in sorted(root.rglob('*.html')):
    text = MARK.sub('', page.read_text(encoding='utf8'))
    url = base + page.relative_to(root).as_posix()
    if url.endswith('/index.html'):
        url = url[:-len('index.html')]
    tags = (f'    <meta property="og:url" content="{url}">\n'
            f'    <meta property="og:image" content="{base}assets/og-image.jpg">\n'
            f'    <meta name="twitter:card" content="summary_large_image">\n')
    text, n = re.subn(r'(    <meta property="og:description"[^>]*>\n)', lambda m: m.group(1) + tags, text, count=1)
    if n:
        page.write_text(text, encoding='utf8', newline='\n')
        print('ok  ', page.relative_to(root))
    else:
        print('пропущена (нет og:description):', page.relative_to(root))
