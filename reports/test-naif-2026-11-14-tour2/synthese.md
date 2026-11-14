# Synthèse du test naïf du 2026-11-14 (tour 2) : aupublicholidays.com

Notes : testeur 1 = 8/7/9, testeur 2 = 8/7/8, testeur 3 = 7/7/8 (moyennes 7,7 / 7 / 8,3). Version testée : 2bba62e.
Tour 3 : l'éditeur a validé **une** correction (Pâques). Les autres difficultés sont notées pour son arbitrage.

## Cause trouvée dans le code

- Le mini-planificateur `leave` (src/lib/mini-specs.ts) appelait `plan(état, 2027, jours)` sans rien savoir de la
  fête de la page : il rendait la meilleure pause **de l'année**. Sur Pâques (NSW, 4 jours), c'était Noël
  (sam. 25 déc. – dim. 2 janv. 2028). Le texte, écrit à la main, proposait la semaine d'après Pâques
  (mar. 30 mars – ven. 2 avr.), et le planificateur la semaine d'avant (lun. 22 – jeu. 25 mars) : trois réponses.
- Même défaut ailleurs : page Victoria « around Cup Day and Easter » (4 jours → Australia Day + Noël, ni Cup ni
  Pâques) ; page Melbourne Cup, mini « Add more leave around Cup Day » **et** grand outil (1 jour → Australia Day,
  à égalité avec Cup Day, la première gagnait). Australia Day tombait juste par hasard.
- Correction : `plan()` (src/lib/engine/leave.ts) prend une fête `near` et ne garde que les congés à moins de
  14 jours d'elle ; le mini reçoit `near` par un champ caché, le grand outil par `toolArg.near`. Si la fête
  n'existe pas dans l'État choisi (Cup Day hors Victoria), l'outil le dit au lieu de proposer autre chose.
- Le texte de Pâques lit maintenant le même calcul que l'outil (lun. 22 – jeu. 25 mars, 10 jours, du sam. 20 mars
  au lundi de Pâques, comme le planificateur), et cite la semaine d'après comme alternative de même durée ;
  garde-fou au build si le calcul change. La page Long weekends dit « la semaine d'avant ou celle d'après ».
- Tests ajoutés (tests/engine.test.ts) : tout mini `leave` dont le titre nomme une fête doit avoir `near` ; la
  pause affichée contient la fête ; Pâques NSW = 22–25 mars, 10 jours, identique au planificateur ; l'outil Cup.

## Difficultés

| # | Difficulté | Qui | Décision |
|---|---|---|---|
| 1 | Pâques : « Stretch Easter with annual leave » répond par Noël ; texte et planificateur donnent deux autres dates | T1 T2 T3 | **corrigé** (validé par l'éditeur) : cause dans le code, voir plus haut ; même défaut corrigé sur Victoria, Melbourne Cup (mini et grand outil), Australia Day verrouillé |
| 2 | Page Pâques : année « 2,027 », « Paschal full moon (Gauss) », « Days from 21 March to Easter » en tête de l'outil | T1 T2 T3 | **non retenu ce tour** : hors correction validée ; à proposer à l'éditeur (« 2,027 » est un défaut objectif de formatage) |
| 3 | Tableau de Pâques coupé à droite (« Mond… ») | T1 T2 T3 | **non retenu ce tour** : hors correction validée ; à proposer (en-têtes courts Fri / Sat / Sun / Mon) |
| 4 | « days » pour trois choses (14 public holidays / 14 days off in total / 9 days in a row) | T1 T2 | **non retenu ce tour** : hors correction validée |
| 5 | Mini : « Breaks 2 » sans dire où est la deuxième pause ; « 5 of 5 » pour 4 jours montrés | T1 T2 | **non retenu ce tour** : hors correction validée |
| 6 | Noël : 9 jours en NSW, 10 en ACT, explication seulement sur la page Noël | T1 | **non retenu ce tour** : hors correction validée |
| 7 | Anzac : le lundi (la vraie réponse) en petit sous « Sunday 25 April » | T1 | **non retenu ce tour** : hors correction validée |
| 8 | Deux outils par page fête, État différent de l'un à l'autre ; État non mémorisé | T1 T2 | **non retenu ce tour** : hors correction validée ; mémoriser l'État = composant de trame |
| 9 | « Public holiday dates for it 2 », colonne « Name » répétée 8 fois | T1 T2 | **non retenu ce tour** : hors correction validée |
| 10 | « Additional day » / « Moved » expliqués seulement en bas de l'accueil | T2 T3 | **non retenu ce tour** : hors correction validée |
| 11 | Sigles d'État sans légende au bon endroit, menu en sigles | T3 | **non retenu ce tour** : hors correction validée |
| 12 | Accueil : mélange 2026 / 2027 (compte à rebours de Noël 2026) | T1 T3 | **non retenu ce tour** : hors correction validée |
| 13 | Planificateur : « Days off per leave day 2.8 », « bridges », lien vers lui-même | T1 T3 | **non retenu ce tour** : hors correction validée |
| 14 | Accueil long, mêmes infos sous trois formes ; liste des long weekends ACT en ligne | T1 T2 | **non retenu** : déjà arbitré au tour 1 (texte utile au référencement, replié) |
| 15 | Éditeur basé à Clermont-Ferrand | T1 T3 | **non retenu** : identité légale obligatoire (Radif Partners), déjà arbitré au tour 1 |
