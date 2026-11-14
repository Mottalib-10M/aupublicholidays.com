# Synthèse du test naïf du 2026-11-14 : aupublicholidays.com

Notes : testeur 1 = 7/8/8, testeur 2 = 7/7/8, testeur 3 = 6/7/8. Une ligne par difficulté, avec qui l'a relevée (T1, T2, T3).

## Cause trouvée dans le code du planificateur

- `plan()` (src/lib/engine/leave.ts) maximise la **somme** des jours de repos de toutes les pauses ; les écrans
  appelaient cette somme « days off in a row » et montraient la **première** pause (`blocks[0]`), pas la plus longue.
  D'où « 14 days off in a row » pour 4 + 10 jours.
- `blocks()` coupait le calendrier au 31 décembre quand l'année suivante n'était pas publiée (NSW et VIC n'ont pas
  publié 2028) : le bloc de travail du 29 au 31 décembre 2027 était le dernier, donc jamais choisi. D'où « 3 jours
  de congé = 6 jours » en NSW contre 10 en QLD. Correction : décembre de l'année d'avant et janvier de l'année d'après
  sont toujours découpés, avec les seuls samedis et dimanches quand leurs fériés sont inconnus. NSW 3 jours = 9 jours
  d'affilée (sam. 25 déc. – dim. 2 janv. 2028), ce que la FAQ de la page Noël disait déjà.
- « Leave days used 4 » pour 5 en ACT : vrai résultat (le 5e jour ne rejoint aucun férié), mais jamais expliqué.

## Difficultés

| # | Difficulté | Qui | Décision |
|---|---|---|---|
| 1 | « 14 days off in a row » alors que le détail montre 2 pauses (4 + 10), « First break » = 4 jours | T1 T2 T3 | **corrigé** : cause dans le code (somme appelée « in a row », première pause au lieu de la plus longue). Outil, mini, chapeaux et textes disent « 14 days off in total, across 2 breaks (the longest: 10 days, …) » ; « in a row » seulement quand il n'y a qu'une pause (helper `PLAN_TXT`) ; la ligne « Longest break » remplace « First break » |
| 2 | Noël : « 3 jours de congé en NSW = 6 jours » contre 10 en QLD | T1 T2 T3 | **corrigé** : cause dans le code (calendrier coupé au 31 décembre sans 2028 publié). NSW donne maintenant 9 jours d'affilée ; la page Noël le dit et précise pourquoi le compte s'arrête au dimanche 2 janvier ; garde-fou au build si ce n'est plus vrai |
| 3 | ACT : « Leave days used 4 » pour 5 saisis | T1 T2 T3 | **corrigé** : « 4 of 5 » et une note « Only 4 of your 5 days are needed here; a day left over on any Friday or Monday still gives a three-day weekend » |
| 4 | Bandeau « Example with typical figures — change any figure… » sur des listes officielles | T1 T2 T3 | **corrigé** : les outils de dates disent « Showing New South Wales, 2027 — pick another state or year to see yours » (st, hd, lw, sc, loc, ea et minis lw/day/term) ; « Example » reste sur le planificateur de congés |
| 5 | « most states » / « almost every state » (accueil) contre « all eight » (page Noël) | T1 T2 T3 | **corrigé** : vérifié dans les données, les huit donnent lundi 27 et mardi 28 ; l'accueil dit « every state and territory » partout, avec un garde-fou au build |
| 6 | Bloc de chiffres de l'accueil en texte brut empilé | T1 T2 T3 | **corrigé** : quatre tuiles (libellé petit, valeur en gras), noms d'États en clair |
| 7 | Triangles ▶ seuls sur leur ligne au-dessus des titres (« The 2027 calendar, topic by topic ») | T1 T2 T3 | **corrigé** : même carte et même chevron que la FAQ, titre et chevron sur une ligne, aide « Tap a topic to read more. » |
| 8 | Jargon : « refused automated reading », « dynamic programming », « republication R11 », « Schedule 2 » | T1 T2 T3 | **corrigé** : « could not be checked directly », « tries every way of placing your leave », sigles de loi retirés des phrases et des noms de sources |
| 9 | « As of 2027, holiday lists and term dates checked on 13 November 2026 » | T1 T2 T3 | **corrigé** : « Dates for 2027, last checked on 13 November 2026 » (i18n/ui.ts) |
| 10 | Outil Anzac en Victoria : « Sun 25 Apr » sans dire qu'il n'y a pas de lundi | T1 T2 T3 | **corrigé** : ligne d'alerte « No weekday off in Victoria: Anzac Day stays on the Sunday » (mini) et « No weekday off in Victoria: it stays on the Sunday » (outil) |
| 11 | Additional day / Observed on this day / (observed) / moved day : quatre mots pour deux idées | T1 T2 T3 | **corrigé** : un seul couple, « Additional day » et « Moved to this day » / « (moved) », comme l'encadré « Additional day or moved day? » |
| 12 | Compte à rebours de Noël 2026 sans l'année, sur une page 2027 | T1 T2 T3 | **corrigé** : « Time left until Christmas Day 2026 », année ajoutée aux prochains fériés ; le doublon « (in 40 days) » retiré |
| 13 | Tableau « Shared public holidays » : 4 écrans de lignes identiques | T1 T2 T3 | **corrigé** : les fériés au même jour partout tiennent en une phrase, le tableau ne garde que ceux qui diffèrent (Anzac, Boxing Day) |
| 14 | État présélectionné différent d'un bloc à l'autre (NSW, VIC, QLD, TAS) | T1 T3 | **corrigé en partie** : le « Quick check » du planificateur passe de Queensland à NSW (il servait à contourner le défaut n° 2) ; Victoria (Anzac) et Tasmanie (Noël) restent, car ils montrent le cas qui diffère, et le bandeau dit maintenant « Showing … » |
| 15 | Page Noël : le tableau ne montre pas le mardi 28 | T1 T2 | **corrigé** : sur Noël, le tableau de l'outil a une colonne Christmas Day et une colonne Boxing Day |
| 16 | « South Australia does the same for Proclamation Day » incompris | T1 T2 T3 | **corrigé** : « does the same, under another name: there, 26 December is called Proclamation Day » |
| 17 | Australia Day : « all eight columns » alors que ce sont des lignes | T1 T3 | **corrigé** : « the table under the tool shows the same date for all eight states and territories » |
| 18 | ACT : « 8 long weekends, more than any state » ambigu (15 fériés = égalité avec VIC) | T2 | **corrigé** (chiffre ambigu) : « 15 public holidays, the most of any state (tied with Victoria), and 8 long weekends, more than anywhere else », vérifié au build |
| 19 | « 14 public holidays » mais 15 lignes (Bank Holiday) | T2 | **corrigé** (chiffre incohérent d'un écran à l'autre) : ligne « Not counted above: Bank Holiday (banks only) » |
| 20 | Outil Australia Day : ne dit pas quel jour poser | T3 | **corrigé** : la mini affiche « Take leave on Mon 25 Jan 2027 » quand il y a une seule pause |
| 21 | « Days off for this holiday 2 » compte le dimanche | T2 | **corrigé** : libellé « Public holiday dates for it » |
| 22 | Sigles d'États (NT, ACT, SA) | T3 | **corrigé en partie** : légende des huit sigles sous le tableau de l'accueil, noms complets dans les tuiles et le résumé ; les en-têtes de colonnes gardent les sigles (8 colonnes) |
| 23 | Adresse de l'éditeur à Clermont-Ferrand | T1 T2 T3 | **non retenu** : identité légale obligatoire de l'éditeur (Radif Partners) ; les testeurs disent que les sources officielles compensent |
| 24 | Accueil long (19 écrans), paragraphe ACT qui répète le tableau | T1 T2 T3 | **non retenu** : texte replié ou sous la réponse, utile au référencement ; l'accueil raccourcit déjà de 3 écrans avec le n° 13 |
| 25 | Liste des long weekends noyée dans une phrase (ACT) | T1 | **non retenu** : la liste complète est dans l'outil de la page Long weekends |
| 26 | Menu : « Local » flou, « Holidays » fermé, contenu visible sous le menu | T1 T2 T3 (un point chacun) | **non retenu** : trois remarques différentes, aucune bloquante ; composant de la trame |
| 27 | Pied de page replié, bloc « Prepared by » deux fois | T1 T2 | **non retenu** : comportement de la trame sur téléphone (pied replié < 768 px) |
| 28 | ACT : pas de dates scolaires | T1 T2 | **non retenu** : la page n'a pas pu être vérifiée ; rien n'est inventé, la phrase le dit simplement |
