#!/usr/bin/env python3
"""Show holidays 2027 du Queensland → src/data/qld-show-2027.json.
Source : https://www.qld.gov.au/recreation/travel/holidays/show (CC BY 4.0), texte extrait le 2026-11-13
dans qld-show-holidays-2026-11-13.txt. Rejouable : python3 data-raw/parse-qld-show.py"""
import json, os, re, datetime
here = os.path.dirname(os.path.abspath(__file__))
lines = [l.strip() for l in open(os.path.join(here, 'qld-show-holidays-2026-11-13.txt'), encoding='utf-8') if l.strip()]
start = next(i for i, l in enumerate(lines) if l.startswith('Date in 2027'))
end = next(i for i, l in enumerate(lines) if i > start and l.startswith('2026 show holiday dates'))
M = {m: i + 1 for i, m in enumerate(['January','February','March','April','May','June','July','August','September','October','November','December'])}
out, i = [], start + 1
while i < end:
    m = re.fullmatch(r'(\d{1,2}) (\w+) 2027', lines[i])
    if not m: i += 1; continue
    district = lines[i + 1].lstrip('| ').strip(); event = lines[i + 2].lstrip('| ').strip()
    d = datetime.date(2027, M[m.group(2)], int(m.group(1)))
    out.append({'date': d.isoformat(), 'district': district, 'event': event})
    i += 3
json.dump(out, open(os.path.join(here, '..', 'src', 'data', 'qld-show-2027.json'), 'w'), ensure_ascii=False, indent=1)
print(len(out), 'entrées,', len({o['date'] for o in out}), 'dates')
