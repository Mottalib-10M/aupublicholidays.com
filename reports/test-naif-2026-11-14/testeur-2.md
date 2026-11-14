# Test naïf du 2026-11-14, testeur 2 : aupublicholidays.com
**Persona :** Australien(ne) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Arrivé(e) depuis le résultat Google « Public holidays 2027 by state: dates and long weekends » (« … each date with its weekday, the additional days for Christmas and Anzac Day, and 6 NSW long weekends »), sur téléphone.

## 1. Concept

**Après 5 s :** « OK, c'est la liste des jours fériés 2027, état par état. » Le titre « Public holidays 2027 in every Australian state and territory » correspond exactement au résultat Google. Le chapeau donne tout de suite deux infos concrètes : « between 11 and 15 days off depending on your state » et « Christmas Day falls on a Saturday, so most states add Monday 27 and Tuesday 28 December ». Le sélecteur « State or territory » et les boutons 2026 / 2027 / 2028 se comprennent sans réfléchir. Dès le premier défilement, j'ai le tableau NSW complet (date, jour de la semaine, « Full day / Additional day / Banks only »). Ma question est réglée en moins de 10 s.

**Après 2 min :** c'est plus qu'une liste : un compte à rebours jusqu'au prochain férié, « Is today a public holiday in NSW? », un calculateur de congés (« Make your annual leave go further »), des pages par état et par fête (Anzac, Christmas, Australia Day), les ponts et les vacances scolaires. Concept clair : **un site pratique pour planifier ses jours off en 2027 selon son état.** Public : salarié(e) en semaine qui veut caser ses congés, parents (vacances scolaires), travailleurs du week-end (jour « additional » ou « moved »).

**Bénéfice concret :** savoir quel jour je ne travaille pas dans MON état, et où poser 1 à 5 jours de congé pour avoir le plus long break. Le premier point est parfaitement servi. Le second m'attire beaucoup, mais il me perd (voir difficulté n° 1).

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour la partie « dates », à moitié pour la partie « congés ».**
- La liste des fériés, le choix de l'état, le compte à rebours : tout le monde comprend.
- Ça décroche sur :
  - le résultat du calculateur de congés : « days off in a row : 14 days » alors que le détail montre en fait **deux** breaks (4 jours + 10 jours) ;
  - le bandeau jaune « Example with typical figures — change any figure to see your own result » collé sur une simple liste de dates (quels « figures » ? je n'ai rien à saisir à part l'état) ;
  - le vocabulaire « Additional day », « Observed on this day », « (observed) », « moved day », expliqué une seule fois, en bas de l'accueil ;
  - des passages qui sentent la coulisse technique : « refused automated reading », « dynamic programming », « republication R11 ».

## 3. Parcours écran par écran

- **01-accueil-1.png** : compris. Titre = ma requête Google, chiffres clés, sélecteur d'état, années. Je bute sur le bandeau jaune « Example with typical figures — change any figure… » : ce sont des dates officielles, pas un « exemple ». Ça me fait douter : est-ce que ce sont de vraies dates ?
- **01-accueil-suite1.png** : compris. « Long weekends (3 days or more) 6 », « Working days 252 », puis le tableau « Every NSW public holiday in 2027 ». Petite hésitation : en haut « 14 public holidays », mais je compte 15 lignes dans le tableau. Je finis par comprendre que « Bank Holiday – Banks only » ne compte pas, mais ce n'est écrit nulle part.
- **01-accueil-suite2.png** : compris. Le tableau est lisible même si chaque date tient sur 2 à 3 lignes. « Christmas Day – Monday 27 December – Additional day » est clair une fois vu.
- **01-accueil-suite3.png** : compris et apprécié. « Time left until Christmas Day 39 days 22 hrs 59 min 49 sec », « Is today a public holiday in NSW? **No** », « Next public holiday Fri 25 Dec (in 40 days) », la fin du term 4. Petite confusion : je viens de lire tout 2027 et d'un coup on me parle de Noël **2026** (« Fri 25 Dec », « Sat 26 Dec ») sans que l'année soit écrite. Il faut deux secondes pour comprendre que c'est « maintenant ».
- **01-accueil-suite4.png** : coince sur la mise en page. Le bloc « Most public holidays (2027) / 15, VIC, ACT / Easter 2027 / Fri 26 Mar – Mon 29 Mar / Christmas extra days / … / NSW long weekends / 6 » est du texte brut empilé, sans mise en forme : on dirait une page cassée. Ensuite, la liste « Tools to plan your days off » est claire.
- **01-accueil-suite5.png** : compris. Cartes outils (Long weekends, Annual leave planner, Next public holiday, 2028, School terms). Les liens « How the dates are found and checked · Who runs this site » rassurent.
- **01-accueil-suite6 à suite9.png** : compris mais long. Le tableau « Shared public holidays 2027 » répète 8 fois la même date pour New Year's Day, Australia Day, Good Friday et Easter Monday. Sur téléphone, ça fait 4 écrans de défilement pour apprendre que « c'est pareil partout ». Les seules lignes utiles sont Anzac Day et Boxing Day (TAS « Tue 28 Dec » seul). Le paragraphe « Anzac Day is the one that splits the country » est la meilleure explication du site.
- **01-accueil-suite10 / suite11.png** : coince. « Make your annual leave go further » : NSW, 5 jours → « days off in a row **14 days** », « Leave days used 5 », « Days off per leave day 2.8 », « First break Sat 23 Jan – Tue 26 Jan 2027 ». Ce « first break » ne fait que 4 jours. Où sont les 14 jours d'affilée ? Je ne comprends pas et je ne fais pas confiance au chiffre.
- **01-accueil-suite11 / suite12.png** : compris. Liste des 8 états avec le nombre de jours, puis « Additional day or moved day? » (bonne explication, mais trop bas). La phrase sur les sources rassure.
- **01-accueil-suite13 / suite14 / suite15.png** : compris. Plan du site avec une phrase d'accroche par lien (« Labour Day in March, Grand Final eve, Melbourne Cup on a Tuesday »). Très bien fait, je repère tout de suite mon état.
- **01-accueil-suite15 / suite16.png** : coince sur l'affichage. Dans « The 2027 calendar, topic by topic », les triangles « ▶ » sont sur une ligne seule, **au-dessus** de chaque titre, et non à côté. Ça ressemble à un bug, et je ne sais pas si je dois toucher le triangle ou le titre.
- **01-accueil-suite16 / suite17.png** : compris. FAQ en accordéon (« Do I get paid if I work on a public holiday? » m'intéresse).
- **01-accueil-suite17 / suite18.png** : compris. Sources officielles (NSW Government, Queensland Government…, Fair Work Ombudsman), « Prepared by Radif Partners », « Updated on 13 November 2026 ». Rassurant. La ligne « As of 2027, holiday lists and term dates checked on 13 November 2026 » est bancale : « as of 2027 » alors qu'on est en 2026.
- **02-menu-1.png / 02-menu-suite1.png** : compris. « By state » (8 états) et « Plan » sont ouverts, « Holidays » et « Local » sont fermés. Clair et rapide. On ne voit pas tout de suite qu'il faut ouvrir « Holidays » pour Anzac / Christmas.
- **03-en-about-1 à suite3.png** : compris. « We are not a government agency… your award or agreement does » est honnête et utile. « Nobody in Perth needs the Melbourne Cup » me fait sourire et explique le concept mieux que l'accueil. Surprise : l'adresse « 49 rue du Ressort, 63000 Clermont-Ferrand, France ». Une boîte française qui fait un site sur les fériés australiens, ça me fait tiquer une seconde, mais les sources officielles compensent.
- **04-en-act-public-holidays-2027-1 à suite2.png** : compris. « 15 public holidays in 2027 and 8 long weekends, more than any state. » Mais l'accueil disait « VIC, ACT have the most full-day public holidays (15 dates) » : l'ACT est à égalité avec VIC, pas devant. La formule n'est vraie que pour les long weekends, donc c'est ambigu. Le tableau est clair. Nouveau libellé « Observed on this day » pour Anzac (ailleurs c'est « Additional day » ou « (observed) »).
- **04-…-suite3.png** : compris, mais le paragraphe (« Applying the ACT Holidays Act 1958 to 2027 gives… ») répète le tableau en une longue phrase.
- **04-…-suite4 / suite5.png** : coince. « Plan Canberra leave for 2027 » : je saisis « 5 days », le résultat dit « Leave days used **4** », « 14 days », « 3.5 », « First break Sat 23 Jan – Tue 26 Jan 2027 ». Pourquoi 4 et pas 5 ? Et toujours ces 14 jours introuvables.
- **04-…-suite6.png** : compris pour la liste des long weekends (dates et durée, très utile). Mais « The ACT Government holidays page refused automated reading » et « the education directorate page refused reading too » : pour moi, ça veut dire « on n'a pas pu vérifier ». Ça m'inquiète plus que ça ne me rassure, et j'apprends au passage qu'il n'y a pas de vacances scolaires pour l'ACT.
- **04-…-suite7 à suite9.png** : compris. FAQ, « Keep planning », sources.
- **05-en-annual-leave-planner-2027-1 / suite1.png** : coince. « in NSW, 5 days of leave give 14 days off in a row ». Le détail « Where to take the leave » montre **deux** lignes : Mon 25 Jan (1 jour → 4 jours off) et Mon 22 – Thu 25 Mar (4 jours → 10 jours off), avec « Breaks 2 ». Ce sont donc 14 jours au total, pas 14 jours d'affilée. Le titre « 14 days off » et la phrase « Most days off in a row for the leave given » me mentent. C'est là que je perds confiance.
- **05-…-suite2 à suite4.png** : compris. Tableau 5 / 10 / 15 jours de congé → jours off par état, utile pour comparer. L'explication du « bridge » est claire.
- **05-…-suite4 / suite5.png** : compris, et cette fois cohérent. « Quick check » Queensland 3 jours → « 10 days », « First break Sat 25 Dec – Mon 3 Jan 2028 » : ici les 10 jours sont bien d'un seul tenant. C'est le seul exemple qui fait ce qu'il annonce.
- **05-…-suite6.png** : coince sur les mots. « The planner tries all combinations of runs of up to ten working days by dynamic programming » : du jargon de développeur, inutile pour moi.
- **05-…-suite7 à suite9.png** : compris. FAQ, liens, sources.
- **06-en-anzac-day-2027-1 / suite1 / suite2.png** : très bien compris. Titre « Anzac Day 2027: Sunday 25 April, and the Monday », « yes in 5 states and territories, no in 3 », tableau par état. C'est exactement ce que je cherchais. Seul point : « Example with typical figures » à nouveau, et « Days off for this holiday 2 » (le dimanche compte-t-il comme un jour off ? Pour un salarié en semaine, non).
- **06-…-suite3 / suite4.png** : compris, mais la version Victoria affiche juste « Sun 25 Apr » sans dire noir sur blanc « **No Monday off in Victoria** ». Un Victorien pressé risque de ne pas comprendre qu'il travaille le lundi.
- **06-…-suite5 à suite8.png** : compris. Paragraphe 2026 / 2028 utile, FAQ « Why does Victoria not give Monday 26 April 2027 off? », sources.
- **07-en-australia-day-2027-1 à suite2.png** : compris. « Tuesday 26 January 2027 in every state… no automatic long weekend. » Tableau de 8 lignes identiques : correct mais redondant.
- **07-…-suite3 / suite4.png** : compris. « One leave day around Australia Day » : 1 jour → 4 jours, « Sat 23 Jan – Tue 26 Jan 2027 ». Clair et cohérent, ici le « first break » correspond bien au total.
- **07-…-suite5 à suite7.png** : compris. FAQ (« Is Monday 25 January 2027 a public holiday? » est pile la question qu'on se pose), liens, sources.
- **08-en-christmas-2027-1 / suite1 / suite2.png** : compris, avec une incohérence. Ici « all eight states and territories give Monday 27 December 2027 and Tuesday 28 December 2027 » et « every state and territory gives two weekdays ». L'accueil disait « **most** states add Monday 27 and Tuesday 28 » et « **almost** every state gives a weekday for both ». Alors, tous ou presque tous ? En plus, le tableau de cette page ne montre que « Sat 25 Dec + Mon 27 Dec » : le 28 n'apparaît pas, puisque c'est l'outil « Christmas Day » et pas « Boxing Day ».
- **08-…-suite3 / suite4.png** : coince à moitié. « South Australia does the same for Proclamation Day » : je ne sais pas ce qu'est Proclamation Day et je ne comprends pas ce que ça vient faire ici. L'outil Tasmanie donne « Sat 25 Dec » + « Additional day Monday 27 December 2027 » : clair.
- **08-…-suite4 / suite5.png** : compris. Explication des soirées du 24 et du 31 (« not days off »), utile.
- **08-…-suite5.png** : coince. « Three days of leave there join Christmas to the New Year weekend. Across the whole year, the best use of three leave days in NSW gives **6 days off**. » Or la page du planificateur montrait Queensland, 3 jours → **10 days** (Sat 25 Dec – Mon 3 Jan 2028), et la phrase juste avant décrit le même pont de Noël. En NSW, c'est le même calendrier de fin d'année : pourquoi 6 ? Je ne sais plus quel chiffre croire.
- **08-…-suite6 à suite8.png** : compris. FAQ (« Do weekend workers get both the Saturday and the Monday… ? »), liens, sources.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Liste des fériés par état + année (accueil, pages état) | Oui, immédiatement | Oui | Très | 5/5 |
| Compte à rebours + « Is today a public holiday? » | Oui (3e écran) | Oui (petite confusion 2026 / 2027) | Oui, ludique | 4/5 |
| Tableau « Shared public holidays » par fête | Oui | Oui | Moyen (très répétitif) | 3/5 |
| Mini-calculateur « Make your annual leave go further » | Oui | Non : « 14 days in a row » contre un « First break » de 4 jours | Potentiellement très | 2/5 |
| Annual leave planner (page dédiée) | Oui (menu + cartes) | À moitié : le tableau du détail est clair, le titre est faux | Très | 3/5 |
| Outil par fête (Anzac / Christmas / Australia Day) | Oui | Oui | Oui, surtout Anzac | 4/5 |
| Liste des long weekends (texte page ACT) | Oui | Oui | Très | 4/5 |
| Copy share link / Print | Oui | Oui | Moyen | 4/5 |
| FAQ en accordéon | Oui | Oui | Oui | 4/5 |
| « The 2027 calendar, topic by topic » (triangles) | Oui | Pas sûr de quoi toucher | ? | 2/5 |
| Menu ☰ | Oui | Oui | Oui | 4/5 |
| Sources / About | Oui | Oui | Rassurant | 4/5 |

## 5. Enchaînement et navigation

- Bon enchaînement : chaque page a un fil d'Ariane (« Home / One holiday across Australia / Anzac Day 2027 »), un outil en haut, « Keep planning » et les sources en bas. On ne se perd jamais.
- Le menu est court et logique (By state / Holidays / Plan / Local). Mais « Holidays » est fermé par défaut, donc Anzac et Christmas sont moins visibles que les états.
- Les pages sont **longues** sur téléphone : l'accueil fait 19 écrans, dont 4 de tableau « Shared » quasi identique. Ma question est réglée dès l'écran 2, la suite est du bonus que je ne lirai pas.
- Le même bloc « Prepared by Radif Partners… Updated on 13 November 2026 » revient deux fois par page (sous le tableau puis en bas). Ça ne gêne pas, mais ça rallonge.
- Les chiffres changent d'un écran à l'autre sur le même sujet (14 en un bloc contre 4 + 10, 6 jours contre 10 jours, « most » contre « all eight »). C'est la principale faiblesse du parcours.

## 6. Difficultés classées

1. **Écrans 05-annual-leave-planner-1 / suite1, 01-accueil-suite10 / suite11, 04-…-suite5.** Vécu : « 14 days off in a row » avec 5 jours de congé, mais le détail montre 2 breaks (4 + 10 jours) et « First break Sat 23 Jan – Tue 26 Jan » ne fait que 4 jours. Je me sens trompé(e) et je doute de tout le calculateur. Recommandation : distinguer le total du plus long break, et montrer le plus long break à la place du « first break ». Texte : « **14 days off in total** (2 breaks) · longest break: **10 days**, Sat 20 Mar – Mon 29 Mar 2027 ». Remplacer « Most days off in a row for the leave given » par « Most days off in total for the leave given, in as few breaks as possible ».
2. **Écran 08-christmas-suite5 face à 05-…-suite5.** Vécu : « three leave days in NSW gives 6 days off » alors que Queensland, 3 jours → 10 jours sur le même pont de Noël. Contradiction flagrante. Recommandation : recalculer ou reformuler, par exemple : « Three days of leave (29–31 December) give 10 days off in a row, Sat 25 Dec 2027 to Mon 3 Jan 2028. »
3. **Tous les outils (01-accueil-1, 06-anzac-suite1, 07-australia-day-suite1, 08-christmas-suite1…).** Vécu : « Example with typical figures — change any figure to see your own result » sur des dates officielles. Je crois que les dates sont des exemples. Recommandation : sur les outils de dates, remplacer par « Showing **New South Wales** — pick your state above ». Garder la formule « Example » seulement pour le nombre de jours de congé.
4. **01-accueil-1 face à 08-christmas-1 / suite2.** Vécu : « most states add Monday 27 and Tuesday 28 » et « almost every state gives a weekday for both », contre « all eight states and territories give… ». Recommandation : une seule formule partout, par exemple « all eight states and territories give Monday 27 and Tuesday 28 December (Tasmania moves Boxing Day to the Tuesday) ».
5. **01-accueil-suite4.** Vécu : le bloc « Most public holidays (2027) 15, VIC, ACT / Easter 2027 … / NSW long weekends 6 » s'affiche en texte brut empilé, comme une page cassée. Recommandation : le mettre en 4 tuiles (libellé en petit, valeur en gras), ou le supprimer puisque l'info est déjà au-dessus.
6. **01-accueil-suite15 / suite16.** Vécu : les « ▶ » de « The 2027 calendar, topic by topic » sont seuls sur leur ligne, au-dessus des titres. On dirait un bug. Recommandation : mettre le triangle (ou un chevron comme dans la FAQ) sur la même ligne que le titre, à droite, et rendre toute la ligne cliquable.
7. **04-act-suite6, 05-planner-suite6.** Vécu : « refused automated reading », « refused reading too », « dynamic programming », « republication R11 » : jargon de coulisse qui inquiète. Recommandation : « The ACT Government page could not be checked automatically, so these dates come from the Holidays Act 1958 » / « ACT school terms are not shown yet ». Et : « The planner tests every possible placement of your leave and keeps the best one. »
8. **01-accueil-suite1, 04-act-suite1 / suite2, 06-anzac-suite3.** Vécu : « 14 public holidays » mais 15 lignes dans le tableau (Bank Holiday), et pour Victoria juste « Sun 25 Apr » sans dire qu'il n'y a pas de lundi. Recommandation : ajouter sous le chiffre « (the Bank Holiday on 2 August is for banks only and is not counted) ». Pour VIC / SA / TAS dans l'outil Anzac, afficher en clair « **No Monday off** — Anzac Day stays on Sunday 25 April ».

## 7. À garder

- Le titre et le chapeau de l'accueil, calqués sur la recherche Google, avec des chiffres concrets dès la première phrase.
- Le sélecteur d'état + années 2026 / 2027 / 2028, et le tableau complet juste dessous.
- « Is today a public holiday in NSW? **No** » et le compte à rebours : ludique, immédiat.
- La page Anzac Day : titre-réponse (« Sunday 25 April, and the Monday »), « yes in 5 states and territories, no in 3 », tableau par état. Modèle à suivre.
- La liste des long weekends en clair (« Fri 1 Jan (3 days), Sat 6 Mar (3 days)… »).
- Le plan du site avec une accroche par état (« Labour Day in May, King's Birthday in October, the Ekka and show days »).
- Les sources officielles nommées et la phrase « we do not decide whether you get a day off: your award or agreement does ».
- La phrase « Nobody in Perth needs the Melbourne Cup » : elle donne une personnalité au site.

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 8/10
